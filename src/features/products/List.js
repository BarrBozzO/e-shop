import React, { useEffect, useState } from "react";
import { css } from "@emotion/core";
import Link from "next/link";
import Image from "next/image";
import ActionButton from "components/ActionButton";

function List({ products: initProducts }) {
  const [products, setProducts] = useState(initProducts);

  useEffect(async () => {
    setProducts(products);
  }, []);

  if (!Array.isArray(products) || !products.length) return null;

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}
    >
      {products
        .filter((product) => product.data && product.data.images.length)
        .map((product) => (
          <List.Item key={product.id} product={product} />
        ))}
    </div>
  );
}

List.Item = ({ product: { id, data } }) => {
  const FavButton = () => {
    return (
      <ActionButton
        css={css`
          position: absolute;
          bottom: 0;
          right: 0;
          z-index: 10;
          padding: 10px;
          cursor: pointer;
          margin: 0;

          &:hover > svg {
            fill: red;
          }
        `}
        icon={{
          name: "heart",
          size: 24,
          css: css`
            margin: 0;
          `,
        }}
        onClick={() => undefined}
      />
    );
  };

  return (
    <div
      css={css`
        flex: 0 0 33%;
        margin-bottom: 2rem;
      `}
    >
      <div
        css={{
          position: "relative",
        }}
      >
        <Link href={`/products/${id}`}>
          <a css={imageContainerCSS}>
            <Image css={{ zIndex: 1 }} layout="fill" src={data.images[0].url} />
            <Image layout="fill" src={data.images[1].url} />
          </a>
        </Link>
        <FavButton />
      </div>
      <div>
        <Link href={`/products/${id}`}>
          <a
            css={{
              display: "inline-block",
              marginTop: "1rem",
              fontSize: "1.2rem",
              cursor: "pointer",
            }}
          >
            {data.name}
          </a>
        </Link>
        <span
          css={{
            display: "inline-block",
            width: "100%",
            marginTop: "0.4rem",
            fontSize: "1rem",
          }}
        >
          $ {data.price.value}
        </span>
      </div>
    </div>
  );
};

const imageContainerCSS = css`
  display: block;
  background-color: #fff;
  height: 0;
  padding-bottom: 150%;
  position: relative;
  cursor: pointer;
  overflow: hidden;

  &:hover {
    & > div:last-of-type {
      z-index: 2;
    }
  }
`;

export default List;
