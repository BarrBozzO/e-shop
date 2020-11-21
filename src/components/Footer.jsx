import React from "react";
import Link from "next/link";
import { css } from "@emotion/core";
import Icon from "components/Icon";

function Footer() {
  return (
    <footer
      css={{
        padding: "72px 0 54px",
        backgroundColor: "rgb(228, 228, 228)",
      }}
    >
      <div
        css={{
          maxWidth: "960px",
          margin: "0 auto",
        }}
      >
        <div
          css={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <div>
            <h4
              css={{
                textTransform: "uppercase",
              }}
            >
              SHOP
            </h4>
            <Link href="/products/women">
              <a css={linkCSS}>Women</a>
            </Link>
            <Link href="/products/men">
              <a css={linkCSS}>Men</a>
            </Link>
            <Link href="/products/kids">
              <a css={linkCSS}>Kids</a>
            </Link>
          </div>
          <div
            css={{
              marginLeft: "2rem",
            }}
          >
            <h4
              css={{
                textTransform: "uppercase",
              }}
            >
              Become a member
            </h4>
            <p>Join now and get 10% off your next purchase!</p>
            <Link href="/member">
              <a css={linkCSS}>Read more</a>
            </Link>
          </div>
        </div>
      </div>
      <div
        css={{
          width: "200px",
          margin: "2rem auto",
        }}
      >
        <Icon name="full-logo" css={{ width: "100%", height: "24px" }} />
      </div>
    </footer>
  );
}

const linkCSS = css`
  display: block;
  margin-bottom: 1rem;
`;

export default Footer;
