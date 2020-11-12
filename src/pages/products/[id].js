import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Layout from "components/Layout";
import BreadCrumbs from "components/Breadcrumbs";
import Button from "components/Button";
import { fetchProduct, fetchProducts } from "features/products";
import HeartIcon from "../../icons/heart.svg";

function Product({ data }) {
  if (!data) {
    // display loading skeleton
    return null;
  }

  const ImagesContainer = () => {
    return (
      <div
        css={{
          width: "70vw",
        }}
      >
        <div
          css={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            height: "80vh",
            position: "relative",
          }}
        >
          <div
            css={{
              height: "100%",
              width: "calc( 50% - 2px )",
              position: "relative",
            }}
          >
            <Image layout="fill" alt="product image" src={data.images[0].url} />
          </div>
          <div
            css={{
              height: "100%",
              width: "calc( 50% - 2px )",
              position: "relative",
            }}
          >
            <Image layout="fill" alt="product image" src={data.images[1].url} />
          </div>
        </div>
        <div
          css={{
            padding: "2rem",
            margin: "2rem 0",
            fontSize: "1.2rem",
            backgroundColor: "#ffffff",
          }}
        >
          {data.description}
        </div>
        <div
          css={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            height: "80vh",
            position: "relative",
          }}
        >
          <div
            css={{
              height: "100%",
              width: "calc( 50% - 2px )",
              position: "relative",
            }}
          >
            <Image layout="fill" alt="product image" src={data.images[2].url} />
          </div>
          <div
            css={{
              height: "100%",
              width: "calc( 50% - 2px )",
              position: "relative",
            }}
          >
            <Image layout="fill" alt="product image" src={data.images[3].url} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <Head>
        <title>{data.name}</title>
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
      <div
        css={{
          display: "flex",
          alignItems: "flex-start",
          maxWidth: "1600px",
          margin: "2rem auto 0",
          position: "relative",
        }}
      >
        <ImagesContainer />
        <div
          css={{
            position: "sticky",
            top: 0,
            width: "30vw",
            height: "auto",
            padding: "0 2rem",
          }}
        >
          <div
            css={{
              position: "relative",
              paddingRight: "2rem",
            }}
          >
            <h1 css={{ margin: "0 0 1rem", fontSize: "1.4rem" }}>
              {data.name}
            </h1>
            <div
              css={{
                position: "absolute",
                top: "0.4rem",
                right: "0.4rem",
                cursor: "pointer",
              }}
            >
              <HeartIcon css={{ display: "block", width: "1.4rem" }} />
            </div>
          </div>
          <div
            css={{
              fontWeight: "500",
              fontSize: "1.2rem",
              marginBottom: "1rem",
            }}
          >
            {data.price.currency} {data.price.value}
          </div>
          <div>
            <Button>Add</Button>
          </div>
        </div>
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
