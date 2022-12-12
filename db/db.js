import Dexie from "dexie";

export const db = new Dexie("notesDB");

db.version(1).stores({
  notes: "++id, title, content, parent, children, created_at, updated_at",
  lastOpened: "++id, noteId, created_at",
});
