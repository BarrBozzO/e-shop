import React from "react";
import Head from "next/head";
import Layout from "components/Layout";
import Breadcrumbs from "components/Breadcrumbs";
import Preloader from "components/Preloader";
import Order from "features/cart/Order";
import List from "features/cart/List";
import useSWR from "swr";
import Cart from "features/cart/Cart";
import { observer } from "mobx-react";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const CartPage = observer(() => {
  const cartProductIds = Cart.getIds();
  const hasProductsInCart = cartProductIds.length;

  // fetch products data
  const params = new URLSearchParams(
    cartProductIds.reduce((params, curr) => {
      params.push(["id", curr]);
      return params;
    }, [])
  );
  const { data: responsedProducts, error } = useSWR(
    hasProductsInCart ? `/api/products?${params.toString()}` : null,
    fetcher
  );
  const isLoading = !responsedProducts && hasProductsInCart && !error;

  const getCartProducts = () => {
    if (error) return [];

    return responsedProducts
      ? responsedProducts
          .filter((product) => !!Cart.get(product.id))
          .map((product) => ({
            ...product,
            __count: Cart.get(product.id),
          }))
      : []; // skip removed products
  };

  const renderProducts = () => {
    if (error) return null;
    const products = getCartProducts();

    if (!products.length) return "No Products";

    return <List products={products} />;
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
});

export default CartPage;
