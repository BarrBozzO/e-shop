import React from "react";
import Head from "next/head";
import Layout from "components/Layout";
import BreadCrumbs from "components/Breadcrumbs";
import { List, fetchProducts, Filter } from "features/products";

function ViewAll({ products }) {
  return (
    <Layout>
      <Head>
        <title>View All - Shop Kid's Clothing online</title>
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
            url: "/products/kids",
            text: "Kids",
          },
          {
            text: "View All",
          },
        ]}
      />
      <h1>View All</h1>
      <div>
        <Filter />
        <List products={products} />
      </div>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const products = await fetchProducts({
    age: "kid",
  });

  return {
    props: {
      products,
    },
  };
};

export default ViewAll;