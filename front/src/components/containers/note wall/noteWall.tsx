import Header from "../header/header";
import NotesContaienr from "./notes container/notesContainer";

const NoteWall = () => {
    return (
      <div className="absolute left-0 w-3/4 py-12 pl-12 pr-20 border-none flex flex-col">
            <Header />
            <NotesContaienr />
      </div>
    );
}

export default NoteWall