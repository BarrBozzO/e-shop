import React from "react";
import Head from "next/head";
import Layout from "components/Layout";
import Breadcrumbs from "components/Breadcrumbs";
import Preloader from "components/Preloader";
import Order from "features/cart/Order";
import List from "features/cart/List";
import { css } from "@emotion/core";
import useSWR from "swr";
import { useCart } from "features/cart";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function Cart() {
  const { getIds, getCartItem, deleteFromCart } = useCart();
  const params = new URLSearchParams(
    getIds().reduce((params, curr) => {
      params.push(["id", curr]);
      return params;
    }, [])
  );
  const { data, error } = useSWR(`/api/products?${params.toString()}`, fetcher);
  const isLoading = !data && !error;

  const getCartProducts = () => {
    if (error) return [];

    return data ? data.filter((product) => !!getCartItem(product.id)) : []; // skip removed products
  };

  const renderProducts = () => {
    if (error) return null;

    if (!data.length) return "No Products";

    return <List onDelete={deleteFromCart} products={getCartProducts()} />;
  };

  return (
    <Layout>
      <Head>
        <title>Cart</title>
      </Head>
      <Breadcrumbs
        path={[
          {
            url: "/",
            text: "Home",
          },
          {
            text: "Shopping Cart",
          },
        ]}
      />
      <h1>Shopping Cart</h1>
      <div
        css={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          maxWidth: "1180px",
          margin: "0 auto",
          padding: "0 2rem",
        }}
      >
        <section css={{ flex: "1 0 auto", paddingRight: "1rem" }}>
          {isLoading ? <Preloader /> : renderProducts()}
        </section>
        <Order products={getCartProducts()} />
      </div>
    </Layout>
  );
}

export default Cart;
