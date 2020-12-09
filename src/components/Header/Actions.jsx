import React, { Fragment } from 'react';
import { observer } from 'mobx-react';
import { css } from '@emotion/core';
import { useRouter } from 'next/router';
import { ActionButton } from 'components';
import Cart from 'features/cart/Cart';
import { useUser } from 'features/user';

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
        return user ? router.push('/account') : handleDisplayAuth;
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
                label={user ? 'My Account' : 'Sign in'}
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
                        label="Favorites"
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
                                Shopping Cart
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
`;

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
`;

export default observer(Actions);
