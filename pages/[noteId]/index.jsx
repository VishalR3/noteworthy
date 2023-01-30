import { Button, Grid } from "@mui/material";
import { useLiveQuery } from "dexie-react-hooks";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../db/db";
import AppLayout from "../../src/layouts/AppLayout";
import { PAGESTATE } from "../../src/utils";
import { sagaActions } from "../../store/sagaActions";

const RenderDynamicNote = dynamic(() => import("../../src/notes/RenderNote"), {
  ssr: false,
});

const NotePage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { noteId } = router.query;

  useEffect(() => {
    dispatch({ type: sagaActions.FETCH_NOTE, payload: noteId });
  }, [noteId]);

  return (
    <div>
      {/* <Head>
        <title> NoteWorthy</title>
      </Head> */}

      {!isNaN(noteId) && <RenderDynamicNote />}
    </div>
  );
};

NotePage.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default NotePage;
