import React from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "components/Layout";
import BreadCrumbs from "components/Breadcrumbs";

function Product() {
  return (
    <Layout>
      <Head>
        <title>Product</title>
      </Head>

      <h1>Product</h1>
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

export default Product;
