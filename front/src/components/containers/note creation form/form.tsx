import { useState, useEffect } from "react";
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Textarea } from "../../ui/textarea";
import DateAndTimePicker from "../date and time picker/dateAndTimePicker";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotes } from "../../../store/slices/notesSlice";
import { resetDeadline } from "../../../store/slices/deadlineSlice";
import { useToast } from "../../../hooks/use-toast";
import { FilePenLine } from "lucide-react";
import {
  startEditing,
  stopEditing,
  resetViewing,
  updateSelectedNote,
} from "../../../store/slices/selectedNoteSlice";




export function Form() {


  const dispatch = useDispatch();
  // Here we can have Access to the deadline state
  const { date: deadlineDate, time: deadlineTime } = useSelector(
    (state) => state.deadline
  );
  const { selectedNote, isEditing, isViewing } = useSelector(
    (state) => state.selectedNote
  ); // Here we can have Access to the editting and viewing state
  const [content, setContent] = useState("");
  const { toast } = useToast(); // Use custom toast hook
  console.log(isViewing);
  useEffect(() => {
    if (selectedNote) {
      setContent(selectedNote.content); // Populate the content when a note is selected
    } else {
      setContent(""); // Clear content when no note is selected
    }
  }, [selectedNote]);


  // handling updating the selected note
  const handleUpdate = async () => {
    const today = new Date();

    const noteData = {
      content,
      deadlineDate: deadlineDate
        ? deadlineDate.toISOString().split("T")[0]
        : today.toISOString().split("T")[0], 
      deadlineTime: deadlineTime || null, 
    };

    try {
      const response = await fetch(
        `http://localhost:3000/api/notes/${selectedNote.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(noteData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update note");
      }

      const updatedNote = await response.json();
      dispatch(updateSelectedNote(updatedNote)); // Update the selected note in Redux
      toast({ title: "حله!", description: "یادداشت با موفقیت ایجاد شد" });
    } catch (error) {
      console.error("Error updating note:", error);
      toast({
        title: "مشکلی پیش آمده :(",
        description: "به دلیل بروز خطا یادداشت ایجاد نشد",
      });
    }
  };




  // handling note creation request
  const handleCreate = async () => {
    const today = new Date();

    const noteData = {
      content,
      deadlineDate: deadlineDate
        ? deadlineDate.toISOString().split("T")[0]
        : today.toISOString().split("T")[0], 
      deadlineTime: deadlineTime || null, 
    };

    try {
      const response = await fetch("http://localhost:3000/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(noteData),
      });

      if (!response.ok) {
        throw new Error("Failed to create note");
      }

      const newNote = await response.json();
      dispatch(fetchNotes()); // Fetch updated notes after adding a new one
      toast({ title: "حله! :)", description: "یادداشت با موفقیت ایجاد شد!" });
    } catch (error) {
      console.error("Error creating note:", error);
      toast({
        title: "خطا!",
        description: "مشکلی در ایجاد یادداشت به وجود آمده",
      });
    }
  };





  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if the content is empty
    if (content.trim() === "") {
      toast({
        title: "خطا!",
        description: "یادداشت نباید خالی باشد",
      });
      return;
    }

    if (isEditing) {
      await handleUpdate(); 
    } else {
      await handleCreate(); 
    }

   
    setContent("");
    dispatch(stopEditing()); 
    dispatch(resetDeadline());
    dispatch(resetViewing()); 
    dispatch(updateSelectedNote(null)); 
    dispatch(fetchNotes());
  };

  return (
    <Card className="w-full flex border-none h-full space-y-5 bg-indigo-50 flex-col justify-between pt-12 rounded-3xl">
      <div>
        <CardHeader className="p-0 pb-14">
          <CardTitle className="text-center text-xl w-full">
            {isEditing && "ویرایش یادداشت"}
            {isViewing && "نمایش یادداشت"}
            {!isEditing && !isViewing && "ایجاد یادداشت"}
          </CardTitle>
        </CardHeader>

        {isViewing && !isEditing && (
          <div className="w-full flex justify-end px-6 py-2">
            <Button onClick={() => dispatch(startEditing())}>
              <FilePenLine size={16} />
            </Button>
          </div>
        )}

        <CardContent>
          <form
            className={`${isViewing ? "h-full" : "max-h-2/3"}`}
            onSubmit={handleSubmit}
          >
            <Textarea
              placeholder="یادداشت ...."
              className="max-h-full resize-none h-96"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              readOnly={isViewing} // Make textarea read-only if not editing
            />
            {/* Show DateAndTimePicker when creating or editing a note */}
            {isEditing || !isViewing ? <DateAndTimePicker /> : null}
            {!isViewing && (
              <Button type="submit" className="w-full self-end my-4">
                {isEditing && "ذخیره"}
              </Button>
            )}
            {isViewing && (
              <Button
                type="button" // Change to button type
                className="w-full self-end my-4"
                onClick={() => dispatch(resetViewing())} // Dispatch resetViewing on click
              >
                بازگشت
              </Button>
            )}
          </form>
        </CardContent>
      </div>
    </Card>
  );
}
