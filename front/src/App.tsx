import NoteWall from "./components/containers/note wall/noteWall";
import { Sidebar } from "./components/containers/sidebar/sidebar";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-full flex justify-between ">
        <Sidebar />
        <NoteWall />
        <Toaster />
      </div>
    </DndProvider>
  );
}

export default App;
