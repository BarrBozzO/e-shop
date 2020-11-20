import React from "react";
import Head from "next/head";
import Layout from "components/Layout";
import Preloader from "components/Preloader";
import Button from "components/Button";
import List from "features/favorites/List";
import useSWR from "swr";
import { useCart } from "features/cart";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function Cart() {
  const { getIds } = useCart();

  const params = new URLSearchParams(
    getIds().reduce((params, curr) => {
      params.push(["id", curr]);
      return params;
    }, [])
  );

  const { data, error } = useSWR(`/api/products?${params.toString()}`, fetcher);
  const isLoading = !data && !error;

  const renderProducts = () => {
    if (error) return null;

    if (!data.length) return "No Products";

    return <List products={data} />;
  };

  return (
    <Layout>
      <Head>
        <title>Cart</title>
      </Head>

      <h1>Cart</h1>
      <div
        css={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <div>
          ATTN: ALL ORDERS WILL TAKE 12-15 BUSINESS DAYS TO BE DELIVERED
        </div>
        <div>Free Shipping Over $40</div>
      </div>
      <div
        css={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <div css={{ flex: "1 0 auto" }}>
          {isLoading ? <Preloader /> : renderProducts()}
        </div>
        <div
          css={{
            flex: "0 0 auto",
            maxWidth: "250px",
            backgroundColor: "#fff",
            padding: "1rem",
          }}
        >
          <div>
            <Button>Continue to checkout</Button>
          </div>
          Shipping Update: All orders will take 12-15 business days to be
          delivered. Please take this into consideration before placing your
          order. We appreciate your patience and understanding during this time.
          Shipping & Returns Please ensure you have entered the correct shipping
          address, as this cannot be changed after you have placed an order.
          Please note, an order cannot be cancelled or modified once it has been
          placed. SHIPPING OPTIONS: FREE STANDARD SHIPPING OVER $40 $3.99 below
          $40 (12-15 business days) RETURNS Free in-store returns Return with
          USPS ($5.99) H&M HOME items purchased online must be returned by mail
          H&M MEMBERS Plus Members receive free shipping on every order.
          (including Ship to Store and UPS Access Point™) All Members receive
          free online returns.
        </div>
      </div>
    </Layout>
  );
}

export default Cart;
