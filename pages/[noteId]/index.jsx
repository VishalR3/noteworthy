import { useLiveQuery } from "dexie-react-hooks";
import { useRouter } from "next/router";
import { db } from "../../db/db";
import AppLayout from "../../src/layouts/AppLayout";

const NotePage = () => {
  const router = useRouter();
  const { noteId } = router.query;

  const note = useLiveQuery(
    async () => await db.notes.get({ id: Number(noteId ?? 0) }),
    [noteId]
  );
  console.log(note, noteId ?? 0);
  return (
    <div>
      <h1>{note?.title}</h1>
      <p>{note?.content}</p>
    </div>
  );
};

NotePage.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default NotePage;
