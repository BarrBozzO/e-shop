import { jsx } from "@emotion/core";
import Head from "next/head";
import Layout from "components/Layout";

function Home() {
  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Title</h1>
      </main>
    </Layout>
  );
}

export default Home;
