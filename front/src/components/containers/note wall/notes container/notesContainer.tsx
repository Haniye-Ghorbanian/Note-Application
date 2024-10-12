import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NoteCard from "../../note card/noteCard";
import {
  fetchNotes,
  updateNotesOrder,
} from "../../../../store/slices/notesSlice"; // Import updateNotesOrder
import { Note } from "../../../../types/note";
import NoteSkeleton from "../../note skeleton/noteSkeleton";

const NotesContainer = () => {
  const dispatch = useDispatch();
  const { notes, loading, error } = useSelector((state) => state.notes);

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

 const moveCard = async (dragIndex: number, hoverIndex: number) => {
   const draggedNote = notes[dragIndex];
   const newNotes = [...notes];
   newNotes.splice(dragIndex, 1); // Remove the dragged note
   newNotes.splice(hoverIndex, 0, draggedNote); // Insert it at the new position

   // Log the new order of IDs
   const orderedIds = newNotes.map((note) => note.id);
   console.log("New ordered IDs:", orderedIds); // Log the IDs to check for NaN

   // Dispatch the updated order to the Redux store
   dispatch(updateNotesOrder(newNotes));

   // Send the new order to the backend
   try {
     await fetch("http://localhost:3000/api/notes/order", {
       method: "PUT",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({ orderedIds }),
     });
   } catch (error) {
     console.error("Failed to update order on the backend:", error);
   }
 };

  if (loading) return <NoteSkeleton />;
  if (error) return <div className="w-full h-screen text-indigo-700 text-xl font-bold">مشکلی رخ داده است</div>;

  return (
    <div className="flex flex-wrap gap-8 py-12">
      {notes.map((note: Note, index: number) => (
        <NoteCard
          key={note.id}
          id={note.id}
          content={note.content}
          createdAt={note.createdAt}
          updatedAt={note.updatedAt}
          deadlineDate={note.deadlineDate}
          deadlineTime={note.deadlineTime}
          index={index} // Pass the index to NoteCard
          moveCard={moveCard} // Pass the moveCard function
        />
      ))}
    </div>
  );
};

export default NotesContainer;
