// src/components/note actions/NoteActions.tsx
import { Pencil } from "lucide-react";
import DeleteNoteAction from "./actions/deleteNoteAction";
import { Button } from "../components/ui/button";


interface NoteActionsProps {
  noteId: number;
}

const NoteActions: React.FC<NoteActionsProps> = ({ noteId }) => {
  return (
    <div className="flex rtl:space-x-reverse space-x-2">
      <Button className="rounded-full p-3 hidden group-hover:flex transition-all duration-100">
        <Pencil size={12} />
      </Button>

      <DeleteNoteAction noteId={noteId} />
    </div>
  );
};

export default NoteActions;
