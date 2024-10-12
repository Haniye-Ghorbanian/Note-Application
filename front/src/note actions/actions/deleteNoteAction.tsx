// src/components/note actions/DeleteNoteAction.tsx
import { Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { deleteNote, fetchNotes } from "../../store/slices/notesSlice";
import { useToast } from "../../hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { Button } from "../../components/ui/button";
import { stopEditing } from "../../store/slices/selectedNoteSlice";

interface NoteActionsProps {
  noteId: number;
}

const DeleteNoteAction: React.FC<NoteActionsProps> = ({ noteId }) => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  let timeoutId: NodeJS.Timeout; // Declare a timeout ID variable

  const handleDelete = () => {
    // Show the toast notification
    toast({
      title: "یادداشت پاک شد",
      description: "تا ۵ ثانیه دیگر یادداشت پاک خواهد شد",
      action: (
        <ToastAction
          altText="Undo deletion"
          onClick={() => {
            clearTimeout(timeoutId); // Clear the timeout if the user clicks Undo
          }}
        >
          Undo
        </ToastAction>
      ),
    });

    // Set a timeout for 5 seconds to delete the note
    timeoutId = setTimeout(() => {
      dispatch(deleteNote(noteId))
        .unwrap()
        .then(() => {
          dispatch(fetchNotes());
          dispatch(stopEditing());
        })
        .catch((error) => {
          console.error("Error deleting note:", error);
        });
    }, 5000); // 5000 milliseconds = 5 seconds
  };

  return (
    <Button
      className="rounded-full p-3 hidden group-hover:flex transition-all duration-100"
      onClick={handleDelete}
    >
      <Trash2 size={12} />
    </Button>
  );
};

export default DeleteNoteAction;
