import {
  all,
  call,
  cancel,
  delay,
  put,
  select,
  take,
  takeLatest,
} from "redux-saga/effects";
import { db } from "../../db/db";
import {
  setCurrentNote,
  setIsNoteChanged,
  setUpdatedNote,
} from "../features/notesReducer";
import { sagaActions } from "../sagaActions";

function* changeNote(action) {
  const { data } = action.payload;
  console.log("changeNote");
  let note = yield select((state) => state.notes.currentNote);
  note = { ...note, updatedContent: data };
  yield put(setUpdatedNote(note));
  const currentNote = yield select((state) => state.notes.currentNote);

  yield db.notes
    .update(Number(currentNote.id), { content: note.updatedContent })
    .then((res) => {
      console.log("Updated", currentNote.id);
    });
  yield put(setIsNoteChanged(false));
}

export default function* changeNoteSaga() {
  console.log("changeNoteSaga");
  yield takeLatest(sagaActions.FETCH_NOTE, function* () {
    yield takeLatest(sagaActions.CHANGE_NOTE, changeNote);
  });
}
