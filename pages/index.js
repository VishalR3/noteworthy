import Head from "next/head";
import Image from "next/image";
import AppLayout from "../src/layouts/AppLayout";

export default function Home() {
  return (
    <>
      <Head>
        <title>NoteWorthy</title>
      </Head>
    </>
  );
}

Home.getLayout = (page) => <AppLayout>{page}</AppLayout>;
