import React from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "components/Layout";
import Breadcrumbs from "components/Breadcrumbs";
import Preloader from "components/Preloader";
import Button from "components/Button";
import List from "features/cart/List";
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

  const renderProducts = () => {
    if (error) return null;

    if (!data.length) return "No Products";

    return (
      <List
        onDelete={deleteFromCart}
        products={data.filter((product) => !!getCartItem(product.id))}
      />
    );
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
        <section
          css={{
            flex: "0 0 auto",
            maxWidth: "360px",
          }}
        >
          <div
            css={{
              backgroundColor: "#fff",
              padding: "1rem",
            }}
          >
            <div>
              <div
                css={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1rem",
                  fontWeight: "100",
                  paddingBottom: "0.4rem",
                }}
              >
                <div
                  css={{
                    flex: "1 0 50%",
                  }}
                >
                  Order
                </div>
                <div
                  css={{
                    flex: "1 0 50%",
                    textAlign: "right",
                  }}
                >
                  $34.23
                </div>
              </div>
              <div
                css={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1rem",
                  fontWeight: "100",
                  whiteSpace: "nowrap",
                }}
              >
                <div
                  css={{
                    flex: "1 0 50%",
                  }}
                >
                  Shipping Value
                </div>
                <div
                  css={{
                    flex: "1 0 50%",
                    textAlign: "right",
                  }}
                >
                  $10
                </div>
              </div>
              <div
                css={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderTop: "2px solid #222222",
                  marginTop: "0.6rem",
                  paddingTop: "0.6rem",
                  paddingBottom: "0.6rem",
                  fontWeight: "700",
                }}
              >
                <div
                  css={{
                    flex: "1 0 50%",
                  }}
                >
                  Total
                </div>
                <div
                  css={{
                    flex: "1 0 50%",
                    textAlign: "right",
                  }}
                >
                  $120
                </div>
              </div>
            </div>
            <Button>Continue to checkout</Button>
            <p
              css={{
                fontSize: "0.8rem",
                textAlign: "center",
                fontWeight: "700",
                padding: "0 2rem",
                color: "rgb(214, 0 ,28)",
              }}
            >
              Become a member to get early access to Black Friday + a 10% off
              welcome offer!
            </p>
            <p
              css={{
                fontSize: "0.8rem",
                fontWeight: "700",
                color: "#777",
              }}
            >
              The estimated tax will be confirmed once you added your shipping
              address in checkout. 30-day returns. Read more about our{" "}
              <Link href="/return">
                <a>return and refund policy</a>
              </Link>
              .
            </p>
          </div>
          <div
            css={{
              backgroundColor: "#fff",
              padding: "1rem",
            }}
          >
            Shipping Update: All orders will take 12-15 business days to be
            delivered. Please take this into consideration before placing your
            order. We appreciate your patience and understanding during this
            time.
            <h3>Shipping & Returns</h3>
            Please ensure you have entered the correct shipping address, as this
            cannot be changed after you have placed an order. Please note, an
            order cannot be cancelled or modified once it has been placed.
            <h3>SHIPPING OPTIONS:</h3>
            FREE STANDARD SHIPPING OVER $40 $3.99 below $40 (12-15 business
            days)
            <h3>RETURNS</h3>
            Free in-store returns Return with USPS ($5.99) H&M HOME items
            purchased online must be returned by mail
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default Cart;
