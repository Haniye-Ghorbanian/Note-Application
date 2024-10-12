import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Note } from "../../types/note";
import { NoteModel } from "../../models/noteModel";

interface NotesState {
  notes: Note[];
  loading: boolean;
  error: string | null;
}

const initialState: NotesState = {
  notes: [],
  loading: false,
  error: null,
};

export const fetchNotes = createAsyncThunk("notes/fetchNotes", async () => {
  const response = await fetch("http://localhost:3000/api/notes");
  if (!response.ok) {
    throw new Error("Failed to fetch notes");
  }
  const data: Note[] = await response.json();
  return data.map((note) => new NoteModel(note)); 
});

export const deleteNote = createAsyncThunk(
  "notes/deleteNote",
  async (id: number) => {
    const response = await fetch(`http://localhost:3000/api/notes/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete note");
    }
    return id;
  }
);

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    restoreNote: (state, action) => {
      state.notes.push(action.payload); 
    },
    
    updateNotesOrder: (state, action) => {
      state.notes = action.payload; 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload; 
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch notes";
      })
      .addCase(deleteNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = state.notes.filter((note) => note.id !== action.payload); 
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete note";
      });
  },
});


export const { restoreNote, updateNotesOrder } = notesSlice.actions;

export default notesSlice.reducer;
