import React, { useMemo } from 'react';
import Head from 'next/head';
import useSWR from 'swr';
import { stringify } from 'qs';
import { observer } from 'mobx-react';
import { css } from '@emotion/core';
import { mobileDevice } from 'styles/utils';
import { Layout, Breadcrumbs, Preloader } from 'components';
import Order from 'features/cart/Order';
import List from 'features/cart/List';
import Cart from 'features/cart/Cart';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const CartPage = observer(() => {
    const productsInCart = Cart.getBySizes();
    const hasProductsInCart = Boolean(Cart.getTotal());

    // fetch products data
    const { data, error } = useSWR(
        hasProductsInCart
            ? `/api/products?${stringify(
                  { id: Cart.getProductIds() },
                  { indices: false }
              )}`
            : null,
        fetcher
    );
    const isLoading = !data && hasProductsInCart && !error;

    const products = useMemo(() => {
        if (error || !data) return [];

        return productsInCart.map((product) => {
            return {
                ...data.data.find((d) => d.id === product.id),
                __size: product.size,
                __total: product.total
            };
        });
    }, [error, data, productsInCart]);

    const renderProducts = () => {
        if (error) return null;

        if (!products.length)
            return (
                <div
                    css={{
                        textTransform: 'uppercase',
                        fontSize: '2rem',
                        fontWeight: '700',
                        color: '#222',
                        padding: '2rem',
                        backgroundColor: '#ffffff'
                    }}
                >
                    Your Shopping Cart is empty!
                </div>
            );

        return <List products={products} />;
    };

    return (
        <Layout>
            <Head>
                <title>Shopping Cart</title>
            </Head>
            <Breadcrumbs
                path={[
                    {
                        url: '/',
                        text: 'Home'
                    },
                    {
                        text: 'Shopping Cart'
                    }
                ]}
            />
            <h1 css={titleCSS}>Shopping Cart</h1>
            <div css={containerCSS}>
                <section css={productsListCSS}>
                    {isLoading ? (
                        <Preloader cssParams={preloaderCSS} size={40} />
                    ) : (
                        renderProducts()
                    )}
                </section>
                <Order products={products} />
            </div>
        </Layout>
    );
});

const preloaderCSS = css`
    display: block;
    width: 40px;
    margin: 1rem auto;
    fill: #e50010;
`;

const titleCSS = css`
    text-align: center;
    margin: 2rem auto;
`;

const productsListCSS = css`
    flex: 1 0 auto;
    padding-right: 1rem;

    ${mobileDevice(css`
        padding: 0;
    `)}
`;

const containerCSS = css`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    max-width: 1180px;
    margin: 0 auto 2rem;
    padding: 0 2rem;

    ${mobileDevice(css`
        flex-direction: column;
        align-items: stretch;
        padding: 0;
    `)}
`;

export default CartPage;
