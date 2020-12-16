import React, { useState, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react';
import { stringify } from 'qs';
import useSWR from 'swr';
import Layout from 'components/Layout';
import { Form, Order } from 'features/checkout';
import Cart from 'features/cart/Cart';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Checkout = observer(() => {
    const router = useRouter();
    const [purchased, setPurchased] = useState(false);
    const productsInCart = Cart.getBySizes();
    const hasProductsInCart = Boolean(Cart.getTotal());

    if (!hasProductsInCart && !purchased) {
        router.replace('/cart'); // redirect user to cart page if no products in cart
    }

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

    return (
        <Layout minimal back={{ url: '/cart', label: 'Back to Shopping Cart' }}>
            <Head>
                <title>Checkout</title>
            </Head>

            {!purchased ? (
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
                    <Form
                        onComplete={() => setPurchased(true)}
                        products={products}
                        loading={isLoading}
                    />
                    <Order products={products} loading={isLoading} />
                </div>
            ) : (
                <div
                    css={{
                        textAlign: 'center',
                        fontSize: '2rem'
                    }}
                >
                    <div
                        css={{
                            fontSize: '3rem',
                            marginBottom: '2rem',
                            fontWeight: '700'
                        }}
                    >
                        Congratulations!
                    </div>
                    <div>Wait for delivery</div>
                    <div>Thanks ❤️</div>
                    <Link href={'/'}>
                        <a
                            css={{
                                margin: '2rem 0',
                                fontSize: '1rem'
                            }}
                        >
                            Back to shopping →
                        </a>
                    </Link>
                </div>
            )}
        </Layout>
    );
});

export default Checkout;
