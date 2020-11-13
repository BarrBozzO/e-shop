import React from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "components/Layout";

function Products() {
  return (
    <Layout>
      <Head>
        <title>Products</title>
      </Head>

      <h1>Products</h1>
      <div>
        <Link href="/products/women">
          <a>Women</a>
        </Link>
        <Link href="/products/men">
          <a>Men</a>
        </Link>
        <Link href="/products/kids">
          <a>Kids</a>
        </Link>
      </div>
    </Layout>
  );
}

export default Products;
