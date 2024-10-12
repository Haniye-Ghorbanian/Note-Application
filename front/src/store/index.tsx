import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./slices/notesSlice";
import deadlineReducer from "./slices/deadlineSlice";
import selectedNoteReducer from "./slices/selectedNoteSlice"; 

const store = configureStore({
  reducer: {
    notes: notesReducer,
    deadline: deadlineReducer,
    selectedNote: selectedNoteReducer, 
  },
});

export default store;
