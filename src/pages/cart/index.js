import React, { useMemo } from 'react';
import Head from 'next/head';
import useSWR from 'swr';
import { stringify } from 'qs';
import { observer } from 'mobx-react';
import Layout from 'components/Layout';
import Breadcrumbs from 'components/Breadcrumbs';
import Preloader from 'components/Preloader';
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
            <h1
                css={{
                    textAlign: 'center',
                    margin: '2rem',
                    fontSize: '3rem'
                }}
            >
                Shopping Cart
            </h1>
            <div
                css={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    maxWidth: '1180px',
                    margin: '0 auto',
                    padding: '0 2rem'
                }}
            >
                <section css={{ flex: '1 0 auto', paddingRight: '1rem' }}>
                    {isLoading ? <Preloader /> : renderProducts()}
                </section>
                <Order products={products} />
            </div>
        </Layout>
    );
});

export default CartPage;
