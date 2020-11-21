import React, { Fragment, useState } from "react";
import { useRouter } from "next/router";
import { css } from "@emotion/core";
import Link from "next/link";
import Logo from "components/Logo";
import ActionButton from "components/ActionButton";
import Icon from "components/Icon";
import { useUser, AuthDialog } from "features/user";
import { useCart } from "features/cart";

function Header({}) {
  const [displayAuth, setDisplayAuth] = useState(false);
  const { getCount } = useCart();
  const { user, logout } = useUser();
  const router = useRouter();

  const cartCount = getCount();
  console.log(cartCount);

  const handleCart = () => {
    router.push("/cart");
  };

  const handleFavorites = () => {
    router.push("/favorites");
  };

  const Actions = () => {
    return (
      <div>
        {user ? (
          <Fragment>
            "logged in" <button onClick={logout}>logout</button>
          </Fragment>
        ) : (
          <ActionButton
            key="profile"
            css={btnCSS}
            icon={{
              name: "profile",
              size: 20,
            }}
            label="Sign in"
            onClick={() => setDisplayAuth(true)}
          />
        )}
        <ActionButton
          key="heart"
          css={btnCSS}
          icon={{
            name: "heart",
            size: 20,
          }}
          label="Favorites"
          onClick={handleFavorites}
        />
        <ActionButton
          key="cart"
          css={btnCSS}
          icon={{
            name: "cart",
            size: 20,
          }}
          label={`Shopping Cart${cartCount ? ` (${cartCount})` : ""}`}
          onClick={handleCart}
        />
      </div>
    );
  };

  return (
    <Fragment>
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
              <Icon
                name="logo"
                css={{
                  width: "68px",
                  height: "44px",
                  position: "absolute",
                  right: "50%",
                  top: "0",
                  transform: "translateX(50%)",
                }}
              />
            </a>
          </Link>
          <Actions />
        </div>
        <nav
          css={{
            display: "flex",
            justifyContent: "center",
            marginTop: "3rem",
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
      <AuthDialog isOpen={displayAuth} onClose={() => setDisplayAuth(false)} />
    </Fragment>
  );
}

const btnCSS = css`
  display: inline-flex;

  &:hover {
    color: #e50010;
  }

  & + & {
    margin-left: 1rem;
  }
`;

const linkStyles = css`
  margin: 0 0.6rem;
  font-size: 1rem;
  font-weight: 700;
  padding-bottom: 2px;
  color: rgb(74, 74, 74);
  text-transform: uppercase;

  &:hover {
    cursor: pointer;
    border-bottom: 2px solid rgb(34, 34, 34);
    padding-bottom: 0;
  }
`;

export default Header;
