import { Button, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { db } from "../../db/db";
import AppLayout from "../../src/layouts/AppLayout";

const Content = ({ content, setContent, index }) => {
  const [val, setVal] = useState(index == content.length ? "" : content[index]);
  return (
    <>
      <TextField
        variant="outlined"
        value={val}
        label="content"
        fullWidth
        sx={{ mt: 3 }}
        onChange={(e) => {
          setVal(e.target.value);
          if (index !== content.length) {
            const newContent = [...content];
            newContent[index] = e.target.value;
            setContent(newContent);
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (index == content.length) {
              const newContent = [...content];
              newContent[index] = e.target.value;
              setContent(newContent);
              setVal("");
            } else {
            }
          }
        }}
      />
    </>
  );
};

const Add = () => {
  const { register, handleSubmit } = useForm();
  const [content, setContent] = useState([]);
  const onSubmit = async (data) => {
    console.log(data, content);
    try {
      const id = await db.notes.add({
        title: data.title,
        content: content,
        parent: null,
        children: [],
        created_at: new Date(),
        updated_at: new Date(),
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

            {content?.map((c, index) => (
              <Content
                key={index}
                content={content}
                setContent={setContent}
                index={index}
              />
            ))}
            <Content
              content={content}
              setContent={setContent}
              index={content.length}
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
        <Grid></Grid>
      </Grid>
    </>
  );
};

Add.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default Add;
