import React, { Fragment } from 'react';
import { observer } from 'mobx-react';
import { css } from '@emotion/core';
import { useRouter } from 'next/router';
import { ActionButton } from 'components';
import Cart from 'features/cart/Cart';
import { useUser } from 'features/user';
import { mobileDevice } from 'styles/utils';

function Actions({ minimal, handleDisplayAuth }) {
    const { user } = useUser();
    const router = useRouter();

    const cartCount = Cart.getTotal();

    const handleCart = () => {
        router.push('/cart');
    };

    const handleFavorites = () => {
        router.push('/favorites');
    };

    const handleUserClick = () => {
        return user ? router.push('/account') : handleDisplayAuth();
    };

    return (
        <div>
            <ActionButton
                key="profile"
                css={btnCSS}
                icon={{
                    name: 'profile',
                    size: 20
                }}
                label={
                    <span css={btnLabelCSS}>
                        {user ? 'My Account' : 'Sign in'}
                    </span>
                }
                onClick={handleUserClick}
            />

            {!minimal && (
                <Fragment>
                    <ActionButton
                        key="heart"
                        css={btnCSS}
                        icon={{
                            name: 'heart',
                            size: 20
                        }}
                        label={<span css={btnLabelCSS}>Favorites</span>}
                        onClick={handleFavorites}
                    />
                    <ActionButton
                        key="cart"
                        css={btnCSS}
                        icon={{
                            name: 'cart',
                            size: 20
                        }}
                        label={
                            <>
                                <span css={btnLabelCSS}>Shopping Cart</span>
                                {Boolean(cartCount) && (
                                    <span css={cartCounterCSS}>
                                        {cartCount}
                                    </span>
                                )}
                            </>
                        }
                        onClick={handleCart}
                    />
                </Fragment>
            )}
        </div>
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

    ${mobileDevice(css`
        & + & {
            margin-left: 0.6rem;
        }
    `)}
`;

const btnLabelCSS = mobileDevice(
    css`
        display: none;
    `
);

const cartCounterCSS = css`
    display: inline-block;
    margin-left: 0.4rem;
    background-color: #e50010;
    border-radius: 50%;
    width: 1.4rem;
    height: 1.4rem;
    text-align: center;
    color: #ffffff;
    font-weight: 700;
    line-height: 170%;
    overflow: hidden;
    vertical-align: middle;
    font-size: 0.9rem;

    ${mobileDevice(
        css`
            width: 1.2rem;
            height: 1.2rem;
            margin-left: 0.2rem;
            font-size: 0.8rem;
        `
    )}
`;

export default observer(Actions);
