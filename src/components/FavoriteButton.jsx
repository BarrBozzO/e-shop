import React from "react";
import ActionButton from "components/ActionButton";
import { css } from "@emotion/core";
import { useFavorites } from "features/favorites";

const FavoriteButton = ({ id, styles }) => {
  const { toggleFavorite, isFavorite } = useFavorites();

  const inFavorites = isFavorite(id);
  const buttonCSS = css`
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
  `;

  const isFavoriteCSS = css`
    fill: red;
  `;

  return (
    <ActionButton
      css={[buttonCSS, !inFavorites || isFavoriteCSS, styles]}
      icon={{
        name: inFavorites ? "heart-filled" : "heart",
        size: 24,
        css: css`
          margin: 0;
        `,
      }}
      onClick={() => toggleFavorite(id)}
    />
  );
};

export default FavoriteButton;
