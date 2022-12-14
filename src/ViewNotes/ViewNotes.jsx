import { useState } from "react";
import { Delete } from "@mui/icons-material";
import { Grid, Stack, styled, Typography } from "@mui/material";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../db/db";
import Link from "../Link";

const Item = styled("div")(({ theme }) => ({
  borderRadius: 5,
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
  },
}));
const Options = styled("div")(({ theme }) => ({
  display: "none",
  justifyContent: "space-between",
  alignItems: "center",
  "& > *": {
    marginLeft: theme.spacing(1),
  },
}));

const RenderNote = ({ note }) => {
  const [hovered, setHovered] = useState(false);
  const deleteNote = (noteId) => {
    db.notes.delete(noteId);
  };
  return (
    <Item
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Grid
        container
        px={1}
        justifyContent={"space-between"}
        alignItems="center"
      >
        <Grid item xs={hovered ? 10 : 12}>
          <Link href={`/${note.id}`} color={"inherit"}>
            <Typography
              variant="subtitle2"
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {note.title}
            </Typography>
          </Link>
        </Grid>
        <Grid item xs={2}>
          <Options sx={{ display: hovered ? `flex` : `none` }}>
            <Delete fontSize="small" onClick={() => deleteNote(note?.id)} />
          </Options>
        </Grid>
      </Grid>
    </Item>
  );
};

const ViewNotes = () => {
  const notes = useLiveQuery(async () => await db.notes.toArray());

  return (
    <>
      <Stack spacing={1}>
        {notes?.map((note) => (
          <RenderNote note={note} key={note.id} />
        ))}
      </Stack>
    </>
  );
};

export default ViewNotes;
