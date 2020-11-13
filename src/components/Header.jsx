import React, { Fragment } from "react";
import { css } from "@emotion/core";
import Link from "next/link";
import Logo from "components/Logo";
import { useUser } from "features/user";

function Header({}) {
  const { user, signInWithGoogle, logout } = useUser();

  const handleLogin = () => {
    signInWithGoogle();
  };

  return (
    <header
      css={{
        width: "100%",
        "z-index": 1000,
        padding: "16px",
      }}
    >
      <div
        css={{
          display: "flex",
          justifyContent: "flex-end",
          position: "relative",
        }}
      >
        {/* <div></div> */}
        <Link href={"/"}>
          <a>
            <Logo
              css={{
                position: "absolute",
                right: "50%",
                top: "0",
                transform: "translateX(50%)",
              }}
            />
          </a>
        </Link>
        <div>
          {user ? (
            <Fragment>
              "logged in" <button onClick={logout}>logout</button>
            </Fragment>
          ) : (
            <button onClick={handleLogin}>Sign in</button>
          )}
          <button>Favorites</button>
          <button>Shopping Bag</button>
        </div>
      </div>
      <nav
        css={{
          display: "flex",
          justifyContent: "center",
          marginTop: "2rem",
        }}
      >
        <Link href="/products/women">
          <a css={linkStyles}>Women</a>
        </Link>
        <Link href="/products/men">
          <a css={linkStyles}>Men</a>
        </Link>
        <Link href="/products/kids">
          <a css={linkStyles}>Kids</a>
        </Link>
        <Link href="/sale">
          <a css={linkStyles}>Sale</a>
        </Link>
      </nav>
    </header>
  );
}

const linkStyles = css`
  margin: 0 0.6rem;
  font-size: 1rem;
  font-weight: 700;
  padding-bottom: 2px;

  &:hover {
    cursor: pointer;
    border-bottom: 2px solid rgb(34, 34, 34);
    padding-bottom: 0;
  }
`;

export default Header;
