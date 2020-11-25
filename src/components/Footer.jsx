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
        marginTop: "2rem",
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
          <div css={linksColumn}>
            <h4>shop</h4>
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
          <div css={linksColumn}>
            <h4>help</h4>
            <Link href="/terun">
              <a css={linkCSS}>Return and refund policy</a>
            </Link>
            <Link href="/terms">
              <a css={linkCSS}>Terms and conditions</a>
            </Link>
            <Link href="/privacy">
              <a css={linkCSS}>Privacy Notice</a>
            </Link>
          </div>
          <div css={linksColumn}>
            <h4>Become a member</h4>
            <p>Join now and get 10% off your next purchase!</p>
            <Link href="/member">
              <a css={[linkCSS, readMoreCSS]}>Read more →</a>
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
      <div
        css={{
          textTransform: "uppercase",
          textAlign: "center",
          color: "#9a9a9a",
        }}
      >
        DEMO project for presentation only purposes
      </div>
    </footer>
  );
}

const linkCSS = css`
  display: block;
  margin-bottom: 1rem;
`;

const readMoreCSS = css`
  text-transform: uppercase;
  font-weight: 700;

  &:hover {
    color: #e50010;
  }
`;

const linksColumn = css`
  h4 {
    text-transform: uppercase;
  }

  & + & {
    margin-left: 2rem;
  }
`;

export default Footer;
