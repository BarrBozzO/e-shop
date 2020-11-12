import React from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "components/Layout";
import BreadCrumbs from "components/Breadcrumbs";
import { fetchProduct, fetchProducts } from "features/products";

function Product({ data }) {
  if (data) {
    // display loading skeleton
    return null;
  }

  return (
    <Layout>
      <Head>
        <title>Product</title>
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
        ]}
      />
      <h1>Product - {data.id}</h1>
      <div>
        {data.name}
        <p>{data.description}</p>
      </div>
    </Layout>
  );
}

export const getStaticProps = async (cxt) => {
  const product = await fetchProduct(cxt.params.id);

  return {
    props: {
      data: product,
    },
  };
};

export const getStaticPaths = async () => {
  // TODO render most popular - for others fallback
  const products = await fetchProducts();

  return {
    paths: products.map((product) => ({
      params: {
        id: product.id,
      },
    })),
    fallback: true,
  };
};

export default Product;
