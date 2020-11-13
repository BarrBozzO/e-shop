import React from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "components/Layout";
import BreadCrumbs from "components/Breadcrumbs";

function MenProducts() {
  return (
    <Layout>
      <Head>
        <title>Men's Clothing</title>
      </Head>

      <h1>Men's Clothing</h1>
      <BreadCrumbs
        path={[
          {
            url: "/",
            text: "Home",
          },
          {
            url: "/products",
            text: "Products",
          },
        ]}
      />
      <div></div>
    </Layout>
  );
}

export default MenProducts;
