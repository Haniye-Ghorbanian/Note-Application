import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Note } from "../../types/note";

interface SelectedNoteState {
  selectedNote: Note | null;
  isEditing: boolean;
  isViewing: boolean;
}

const initialState: SelectedNoteState = {
  selectedNote: null,
  isEditing: false,
  isViewing: false,
};

const selectedNoteSlice = createSlice({
  name: "selectedNote",
  initialState,
  reducers: {
    selectNote: (state, action: PayloadAction<Note>) => {
      state.selectedNote = action.payload;
      state.isEditing = false; 
      state.isViewing = true; 
    },
    startEditing: (state) => {
      state.isEditing = true;
      state.isViewing = false; 
    },
    stopEditing: (state) => {
      state.isEditing = false;
      state.isViewing = false; 
    },
    resetViewing: (state) => {
      state.isViewing = false; 
      state.selectedNote = null;
    },
    updateSelectedNote: (
      state,
      action: PayloadAction<Partial<Note> | null>
    ) => {
      if (state.selectedNote) {
        state.selectedNote = { ...state.selectedNote, ...action.payload };
      } else {
        state.selectedNote = action.payload; 
      }
    },
  },
});

export const {
  selectNote,
  startEditing,
  stopEditing,
  resetViewing,
  updateSelectedNote,
} = selectedNoteSlice.actions;

export default selectedNoteSlice.reducer;
