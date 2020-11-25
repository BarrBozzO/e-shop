import React, { useCallback } from "react";
import Head from "next/head";
import Image from "next/image";
import { css } from "@emotion/core";
import Layout from "components/Layout";
import BreadCrumbs from "components/Breadcrumbs";
import Button from "components/Button";
import FavoriteButton from "components/FavoriteButton";
import { fetchProduct, fetchProducts } from "features/products";
import Cart from "features/cart/Cart";

function Product({ data }) {
  if (!data) {
    // display loading skeleton
    return null;
  }

  const ImagesContainer = useCallback(() => {
    const { images, description } = data;

    if (!images.length) return null;

    const [coverImage, extraImage, ...otherImgs] = images;

    const rowCSS = css`
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      width: 100%;
      position: relative;
    `;

    const rowItemCSS = css`
      flex: 1 0 calc(50% - 4px);
      max-width: 600px;
      position: relative;
      margin: 0 2px;

      @media (max-width: 1024px) {
        flex: 1 0 100%;
        margin: 2px 0;
      }
    `;

    const imgWrapperCSS = css`
      width: 100%;
      height: 0;
      padding-bottom: 150%;
    `;

    const descCSS = css`
      padding: 2rem;
      margin: 2rem 0;
      font-size: 1.2rem;
      background-color: #ffffff;
    `;

    return (
      <div
        css={{
          width: "70vw",
        }}
      >
        <div css={rowCSS}>
          <div css={rowItemCSS}>
            <div css={imgWrapperCSS}>
              <Image layout="fill" alt="product image" src={coverImage.url} />
            </div>
          </div>
          {extraImage && (
            <div css={rowItemCSS}>
              <div css={imgWrapperCSS}>
                <Image layout="fill" alt="product image" src={extraImage.url} />
              </div>
            </div>
          )}
        </div>
        <div css={descCSS}>{description}</div>
        {Boolean(otherImgs.length) && (
          <div css={rowCSS}>
            {otherImgs.map((img) => (
              <div css={rowItemCSS}>
                <div css={imgWrapperCSS}>
                  <Image layout="fill" alt="product image" src={img.url} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }, [data.images]);

  const { name, age, sex, id } = data;

  const isKid = age === "kid";
  const isMale = sex === "male";
  const isFemale = !isMale;
  const inCart = Cart.get(id);

  return (
    <Layout>
      <Head>
        <title>{name}</title>
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
            url: `/products/${isKid ? "kids" : isFemale ? "women" : "men"}`,
            text: isFemale ? "women" : "men",
          },
          {
            url: `/products/${
              age === "kid" ? "kids" : sex === "female" ? "women" : "men"
            }/all`,
            text: "All",
          },
          {
            text: name,
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
          padding: "0 2rem",
        }}
      >
        <ImagesContainer />
        <div css={sidebarCSS}>
          <div
            css={{
              position: "relative",
              paddingRight: "2rem",
            }}
          >
            <h1 css={{ margin: "0 0 1rem", fontSize: "1.4rem", padding: "0", textAlign: "left" }}>
              {data.name}
            </h1>
            <FavoriteButton
              id={id}
              styles={{
                padding: 0,
              }}
            />
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
            <Button onClick={() => (!inCart ? Cart.add(id) : Cart.remove(id))}>
              {!inCart ? "Add" : "Remove"}
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

const sidebarCSS = css`
  position: sticky;
  top: 0;
  width: 30vw;
  height: auto;
  padding: 1rem 2rem;
`;

export const getStaticProps = async (cxt) => {
  const product = await fetchProduct(cxt.params.id);

  return {
    props: {
      data: product,
    },
  };
};

export const getStaticPaths = async () => {
  // TODO render most popular - for otherImgs fallback
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
