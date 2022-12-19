import { Button, CircularProgress, Grid } from "@mui/material";
import { useLiveQuery } from "dexie-react-hooks";
import { useRef, useCallback, useEffect, useState } from "react";
import { createReactEditorJS } from "react-editor-js";
import { db } from "../../db/db";
import config from "../config";
import { EDITOR_JS_TOOLS } from "../tools";

const ReactEditorJS = createReactEditorJS();

const RenderNote = ({ noteId, note }) => {
  const [saving, setSaving] = useState(false);
  const editorCore = useRef(null);

  const handleInitialize = useCallback(
    (instance) => {
      editorCore.current = instance;
    },
    [noteId]
  );
  const handleReady = useCallback(async () => {
    editorCore.current.clear();
  }, [noteId]);

  const handleSave = useCallback(async () => {
    setSaving(true);
    const savedData = await editorCore.current.save();
    console.log(savedData);
    await db.notes
      .update(Number(noteId), { content: savedData })
      .then((res) => {
        console.log("Updated", res);
      });

    setSaving(false);
  }, [noteId]);

  const renderEditor = useCallback(async () => {
    if (editorCore.current) {
      editorCore.current.dangerouslyLowLevelInstance?.isReady.then(() => {
        editorCore.current.clear();
        if (note.title && note.content?.blocks?.length) {
          editorCore.current?.render(note?.content);
        }
        editorCore.current.dangerouslyLowLevelInstance?.on("blur", () => {
          console.log("blur");
        });
      });
    }
  }, [noteId, note]);

  const handleTitleChange = useCallback(
    (e) => {
      db.notes.update(Number(noteId), { title: e.target.innerText });
    },
    [noteId]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (editorCore.current)
          editorCore.current.dangerouslyLowLevelInstance?.isReady.then(() => {
            editorCore.current.dangerouslyLowLevelInstance?.caret.focus(true);
          });
      }
    },
    [noteId]
  );

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
            {saving ? (
              <>
                <CircularProgress />
                Saving
              </>
            ) : (
              "Save"
            )}
          </Button>
        </Grid>
      </Grid>
      <ReactEditorJS
        tools={EDITOR_JS_TOOLS}
        onInitialize={handleInitialize}
        onReady={handleReady}
      />
    </>
  );
};
export default RenderNote;
