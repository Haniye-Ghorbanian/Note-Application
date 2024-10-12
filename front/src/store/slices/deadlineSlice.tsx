import { createSlice } from "@reduxjs/toolkit";

interface DeadlineState {
  date: Date | null; 
  time: string | null; 
}

const initialState: DeadlineState = {
  date: null,
  time: null,
};

const deadlineSlice = createSlice({
  name: "deadline",
  initialState,
  reducers: {
    setDeadlineDate(state, action) {
      state.date = action.payload;
    },
    setDeadlineTime(state, action) {
      state.time = action.payload; 
    },
    resetDeadline(state) {
      state.date = null;
      state.time = null;
    },
  },
});

export const { setDeadlineDate, setDeadlineTime, resetDeadline } =
  deadlineSlice.actions;

export default deadlineSlice.reducer;
