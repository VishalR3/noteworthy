import { Button, Grid } from "@mui/material";
import { useLiveQuery } from "dexie-react-hooks";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "../../db/db";
import AppLayout from "../../src/layouts/AppLayout";
import { PAGESTATE } from "../../src/utils";

const RenderDynamicNote = dynamic(() => import("../../src/notes/RenderNote"), {
  ssr: false,
});

const NotePage = () => {
  const [pageState, setPageState] = useState(PAGESTATE.loading);
  const router = useRouter();
  const { noteId } = router.query;
  const [freezedNote, setFreezedNote] = useState(null);
  const note = useLiveQuery(
    async () =>
      await db.notes.get({ id: Number(noteId ?? 0) }).then((data) => {
        return data;
      }),
    [noteId]
  );

  useEffect(() => {
    if (!isNaN(noteId)) setPageState(PAGESTATE.loaded);
    else setPageState(PAGESTATE.loading);
  }, [noteId]);

  return (
    <div>
      {/* <Head>
        <title> NoteWorthy</title>
      </Head> */}

      {!isNaN(noteId) && <RenderDynamicNote noteId={noteId} note={note} />}
    </div>
  );
};

NotePage.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default NotePage;
