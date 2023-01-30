import { takeEvery, takeLatest, put } from "redux-saga/effects";
import { db } from "../../db/db";
import { setCurrentNote } from "../features/notesReducer";
import { sagaActions } from "../sagaActions";

function* fetchNote(action) {
  const noteId = action.payload;
  yield console.log("fetchNote", noteId);
  if (!isNaN(noteId)) {
    const note = yield db.notes.get(Number(noteId));
    console.log("note", note);
    delete note.created_at;
    delete note.updated_at;
    yield put(setCurrentNote(note));
  }
}

export default function* fetchNoteSaga() {
  console.log("fetchNoteSaga");
  yield takeEvery(sagaActions.FETCH_NOTE, fetchNote);
}
