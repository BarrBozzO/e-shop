import React, { useMemo } from 'react';
import Head from 'next/head';
import Layout from 'components/Layout';
import Breadcrumbs from 'components/Breadcrumbs';
import Preloader from 'components/Preloader';
import Order from 'features/cart/Order';
import List from 'features/cart/List';
import useSWR from 'swr';
import Cart from 'features/cart/Cart';
import { stringify } from 'qs';
import { observer } from 'mobx-react';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const CartPage = observer(() => {
    const productsInCart = Cart.getBySizes();
    const hasProductsInCart = Boolean(Cart.getTotal());

    // fetch products data
    const { data, error } = useSWR(
        hasProductsInCart
            ? `/api/products?${stringify(Cart.getProductIds())}`
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

        if (!products.length) return 'No Products';

        return <List products={products} />;
    };

    return (
        <Layout>
            <Head>
                <title>Cart</title>
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
            <h1>Shopping Cart</h1>
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
