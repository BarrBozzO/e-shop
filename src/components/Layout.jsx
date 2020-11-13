import { jsx } from "@emotion/core";
import Link from "next/link";
import React, { Fragment } from "react";
import Logo from "components/Logo";
import { useUser } from "features/user";

function Layout({ children }) {
  const { user, signInWithGoogle, logout } = useUser();

  const handleLogin = () => {
    signInWithGoogle();
  };

  return (
    <div>
      <header
        css={{
          backgroundColor: "#ffffff",
          width: "100%",
          "z-index": 1000,
          borderBottom: "1px solid #dedede",
          padding: "16px",
        }}
      >
        <div
          css={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Logo />
          {user ? (
            <Fragment>
              "logged in" <button onClick={logout}>logout</button>
            </Fragment>
          ) : (
            <button onClick={handleLogin}>SIgn in</button>
          )}
          <button>Cart</button>
          <button>Favorites</button>
        </div>
        <nav
          css={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Link href="/products/women">
            <a>Women</a>
          </Link>
          <Link href="/products/men">
            <a>Men</a>
          </Link>
          <Link href="/products/kids">
            <a>Kids</a>
          </Link>
        </nav>
      </header>
      <main>{children}</main>
      <footer
        css={{
          height: "100px",
          backgroundColor: "#faf9f8",
        }}
      >
        Footer
      </footer>
    </div>
  );
}

export default Layout;
