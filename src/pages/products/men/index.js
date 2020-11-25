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
          {
            text: "Men",
          },
        ]}
      />
      <h1>Men's Clothing</h1>
      <div>
        <Link href="/products/men/all">
          <a>Go Shopping</a>
        </Link>
      </div>
    </Layout>
  );
}

export default MenProducts;
