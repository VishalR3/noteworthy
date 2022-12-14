import { Button, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { db } from "../../db/db";
import AppLayout from "../../src/layouts/AppLayout";

const Content = ({
  content,
  setContent,
  index,
  register,
  setFocus,
  setValue,
}) => {
  useEffect(() => {
    setValue(`content.${index}`, index == content.length ? "" : content[index]);
  }, [content, content.length]);
  return (
    <>
      <TextField
        variant="outlined"
        // value={val}
        label="content"
        placeholder={content[index]}
        fullWidth
        sx={{ mt: 3 }}
        {...register(`content.${index}`)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            const newContent = [...content];
            // if (index == content.length) {
            //   newContent[index] = e.target.value;
            // } else {
            newContent.splice(index, 0, e.target.value);
            setValue(`content.${index}`, e.target.value);
            setValue(`content.${index + 1}`, "");
            newContent[index + 1] = "";
            setTimeout(() => {
              setFocus(`content.${index + 1}`);
            }, 0);
            // }
            setContent(newContent);
          }
        }}
      />
    </>
  );
};

const Add = () => {
  const { register, handleSubmit, setFocus, setValue } = useForm();
  const [content, setContent] = useState([""]);
  const onSubmit = async (data) => {
    console.log(data, content);
    // try {
    //   const id = await db.notes.add({
    //     title: data.title,
    //     content: data.content,
    //     parent: null,
    //     children: [],
    //     created_at: new Date(),
    //     updated_at: new Date(),
    //   });
    //   console.log("Added note with id: " + id);
    // } catch (e) {
    //   console.log(e);
    // }
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
                register={register}
                setFocus={setFocus}
                setValue={setValue}
              />
            ))}
            {/* <Content
              content={content}
              setContent={setContent}
              index={content.length}
              register={register}
              setFocus={setFocus}
              setValue={setValue}
            /> */}
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
