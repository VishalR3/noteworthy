import { Button, Grid, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { db } from "../../db/db";
import AppLayout from "../../src/layouts/AppLayout";

const Add = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const id = await db.notes.add({
        title: data.title,
        content: data.content,
      });
      console.log("Added note with id: " + id);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Grid container spacing={3} p={3}>
        <Grid item xs={12}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              variant="outlined"
              label="Title"
              fullWidth
              sx={{ mt: 3 }}
              {...register("title")}
            />
            <TextField
              variant="outlined"
              label="content"
              fullWidth
              rows={5}
              multiline
              sx={{ mt: 3 }}
              {...register("content")}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
            >
              Submit
            </Button>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

Add.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default Add;
