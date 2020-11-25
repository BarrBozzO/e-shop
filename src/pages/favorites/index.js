import React from "react";
import Head from "next/head";
import Layout from "components/Layout";
import Preloader from "components/Preloader";
import List from "features/favorites/List";
import useSWR from "swr";
import { useFavorites } from "features/favorites";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function Favorites() {
  const { getIds } = useFavorites();
  const favIds = getIds();
  const params = new URLSearchParams(
    favIds.reduce((params, curr) => {
      params.push(["id", curr]);
      return params;
    }, [])
  );

  const { data, error } = useSWR(
    `/api/products?${params.toString()}`,
    fetcher
  );
  const isLoading = !data && !error;

  const renderProducts = () => {
    if (error) return null;

    if (!data.length) return "No Products";

    return <List products={data} />;
  };

  return (
    <Layout>
      <Head>
        <title>Favorites</title>
      </Head>

      <h1>Favorites</h1>
      <div>{isLoading ? <Preloader /> : renderProducts()}</div>
    </Layout>
  );
}

export default Favorites;
