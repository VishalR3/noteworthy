import { Button, Grid } from "@mui/material";
import { useRouter } from "next/router";
import { useRef, useCallback, useEffect, useState } from "react";
import { createReactEditorJS } from "react-editor-js";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../db/db";
import { setIsNoteChanged } from "../../store/features/notesReducer";
import { sagaActions } from "../../store/sagaActions";
import { EDITOR_JS_TOOLS } from "../tools";

const ReactEditorJS = createReactEditorJS();

const RenderNote = () => {
  const note = useSelector((state) => state.notes.currentNote);
  const isNoteChanged = useSelector((state) => state.notes.isNoteChanged);
  const dispatch = useDispatch();
  const router = useRouter();
  const { noteId } = router.query;
  const editorCore = useRef(null);
  const changeTimeRef = useRef(null);

  const handleInitialize = useCallback((instance) => {
    editorCore.current = instance;
  }, []);
  const handleReady = useCallback(async () => {
    editorCore.current.clear();
    dispatch({ type: sagaActions.EDITOR_READY });
  }, []);

  const handleSave = useCallback(async () => {
    const savedData = await editorCore.current.save();
    console.log(savedData);
    await db.notes
      .update(Number(noteId), { content: savedData })
      .then((res) => {
        console.log("Updated", res);
      });
  }, [noteId]);

  const handleChange = () => {
    dispatch(setIsNoteChanged(true));
    clearTimeout(changeTimeRef.current);
    changeTimeRef.current = setTimeout(async () => {
      const savedData = await editorCore.current.save();
      dispatch({
        type: sagaActions.CHANGE_NOTE,
        payload: {
          data: savedData,
        },
      });
    }, 500);
  };

  const renderEditor = async () => {
    if (editorCore.current) {
      editorCore.current.dangerouslyLowLevelInstance?.isReady.then(() => {
        // editorCore.current.clear();
        if (note.title && note.content?.blocks?.length) {
          editorCore.current?.render(note?.content);
          dispatch({ type: sagaActions.NOTE_RENDERED });
        }
        if (note.title && note.content === "") {
          editorCore.current?.clear();
          dispatch({ type: sagaActions.NOTE_RENDERED });
        }
      });
    }
  };

  const handleTitleChange = useCallback(
    (e) => {
      db.notes.update(Number(noteId), { title: e.target.innerText });
    },
    [noteId]
  );

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (editorCore.current)
        editorCore.current.dangerouslyLowLevelInstance?.isReady.then(() => {
          editorCore.current.dangerouslyLowLevelInstance?.caret.focus(true);
        });
    }
  }, []);

  useEffect(() => {
    if (!note) return;
    if (noteId) {
      renderEditor();
    }
  }, [noteId, note]);

  return (
    <>
      <Grid container justifyContent={"space-between"} alignItems="center">
        <Grid item>
          <h1
            contentEditable={true}
            onBlur={handleTitleChange}
            style={{ outline: "none" }}
            onKeyDown={handleKeyDown}
          >
            {note?.title}
          </h1>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={() => handleSave()}>
            {isNoteChanged ? <>Saving</> : "Saved"}
          </Button>
        </Grid>
      </Grid>
      <ReactEditorJS
        tools={EDITOR_JS_TOOLS}
        onInitialize={handleInitialize}
        onReady={handleReady}
        onChange={() => handleChange()}
      />
    </>
  );
};
export default RenderNote;
