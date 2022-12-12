import { Grid, Typography } from "@mui/material";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../db/db";
import Link from "../Link";

const ViewNotes = () => {
  const notes = useLiveQuery(async () => await db.notes.toArray());
  return (
    <>
      <Grid container spacing={1}>
        {notes?.map((note) => (
          <Grid item xs={12} key={note.id}>
            <Link href={`/${note.id}`} color={"inherit"}>
              <Typography variant="subtitle2">{note.title}</Typography>
            </Link>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ViewNotes;
