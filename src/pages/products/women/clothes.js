import React from "react";
import Head from "next/head";
import Layout from "components/Layout";
import BreadCrumbs from "components/Breadcrumbs";
import { List, fetchProducts, Filter } from "features/products";

function WomenProducts({ clothes }) {
  return (
    <Layout>
      <Head>
        <title>Women's Clothing List</title>
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
            url: "/products/women",
            text: "Women's clothing",
          },
        ]}
      />
      <div>
        <Filter />
        <List products={clothes} />
      </div>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const clothes = await fetchProducts();

  return {
    props: {
      clothes,
    },
  };
};

export default WomenProducts;
