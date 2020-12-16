import React from 'react';
import ActionButton from 'components/ActionButton';
import { css } from '@emotion/core';
import { FavoritesStore } from 'features/favorites';
import { observer } from 'mobx-react';

const FavoriteButton = observer(({ id, size = 24, styles }) => {
    const inFavorites = FavoritesStore.has(id);
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
                name: inFavorites ? 'heart-filled' : 'heart',
                size,
                css: css`
                    margin: 0;
                `
            }}
            onClick={() => FavoritesStore.toggle(id)}
        />
    );
});

export default FavoriteButton;
