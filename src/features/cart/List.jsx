import React, { useEffect, useState } from "react";
import { css } from "@emotion/core";
import Link from "next/link";
import Image from "next/image";
import FavoriteButton from "components/FavoriteButton";
import ActionButton from "components/ActionButton";

function List({ products: initProducts, onDelete }) {
  const [products, setProducts] = useState(initProducts);

  useEffect(async () => {
    setProducts(products);
  }, []);

  if (!Array.isArray(products) || !products.length) return null;

  return (
    <div css={{}}>
      {products.map((product) => (
        <List.Item
          key={product.id}
          product={product}
          onDelete={() => onDelete(product.id)}
        />
      ))}
    </div>
  );
}

List.Item = ({ product: { id, data }, onDelete }) => {
  const { images, price, name } = data;
  const image = images[1] ? images[1] : images[0];

  return (
    <div
      css={css`
        width: 100%;
        display: flex;
        align-items: stretch;
        justify-content: flex-start;
        margin: 1rem 0;
      `}
    >
      <div
        css={{
          width: "170px",
          position: "relative",
          marginRight: "1rem",
        }}
      >
        <Link href={`/products/${id}`}>
          <a css={imageContainerCSS}>
            <Image css={{ zIndex: 1 }} layout="fill" src={image.url} />
          </a>
        </Link>
      </div>
      <div
        css={{
          flex: "1 0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          position: "relative",
        }}
      >
        <Link href={`/products/${id}`}>
          <a
            css={{
              display: "inline-block",
              marginTop: "1rem",
              fontSize: "1.2rem",
              cursor: "pointer",
            }}
          >
            {name}
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
          $ {price.value}
        </span>
        <div
          css={{
            marginTop: "auto",
          }}
        >
          <FavoriteButton
            id={id}
            styles={{
              width: "40px",
              height: "40px",
              position: "relative",
              border: "1px solid #222",
            }}
          />
        </div>
        <ActionButton
          icon={{
            name: "cross",
            css: css`
              position: absolute;
              top: 1rem;
              right: 1rem;
            `,
          }}
          onClick={onDelete}
        />
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
`;

export default List;
