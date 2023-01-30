import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notes: [],
  currentNote: null,
  updateNote: null,
  isNoteChanged: false,
};

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    getNotes: (state, action) => {
      state.notes = action.payload;
    },
    setCurrentNote: (state, action) => {
      state.currentNote = action.payload;
    },
    setUpdatedNote: (state, action) => {
      state.updateNote = action.payload;
    },
    setIsNoteChanged: (state, action) => {
      state.isNoteChanged = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getNotes, setCurrentNote, setUpdatedNote, setIsNoteChanged } =
  notesSlice.actions;

export default notesSlice.reducer;
