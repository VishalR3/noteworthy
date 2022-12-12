import { Grid } from "@mui/material";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../db/db";
import AppLayout from "../../src/layouts/AppLayout";

const View = () => {
  const notes = useLiveQuery(async () => await db.notes.toArray());
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h2>View Notes</h2>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            {notes?.map((note) => (
              <Grid item xs={12} key={note.id}>
                <h3>{note.title}</h3>
                <p>{note.content}</p>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

View.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default View;
