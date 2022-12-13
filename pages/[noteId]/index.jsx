import { useLiveQuery } from "dexie-react-hooks";
import Head from "next/head";
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
  return (
    <div>
      <Head>
        <title>{note.title} - NoteWorthy</title>
      </Head>
      <h1>{note?.title}</h1>
      {Array.isArray(note?.content) ? (
        note?.content.map((c, index) => <p key={index}>{c}</p>)
      ) : (
        <p>{note?.content}</p>
      )}
    </div>
  );
};

NotePage.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default NotePage;
