import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Layout from 'components/Layout';
import { useOrders } from 'features/orders';
import { useUser } from 'features/user';
import { css } from '@emotion/core';
import { format } from 'date-fns';

const Purchases = () => {
    const { user, initializing: userInitializing } = useUser();
    const { data, error } = useOrders(user && user.token);

    const isLoading = !data && !error;

    if (!user && !userInitializing && typeof window !== 'undefined') {
        router.replace('/');
    }

    const renderPurchases = () => {
        const { orders, products } = data.data;

        return orders.map((order) => {
            return (
                <div key={order.id} css={orderCSS}>
                    <div>
                        {/* <span css={orderTitleCSS}>Order Details</span> */}
                        <span css={orderDateCSS}>
                            {format(new Date(order.datetime), 'MM/dd/yyyy')}
                        </span>
                        <div css={orderDetailsCSS}>
                            <div css={orderDetailItemCSS}>
                                <span css={orderDetailLabelCSS}>Email</span>{' '}
                                {order.email}
                            </div>
                            <div css={orderDetailItemCSS}>
                                <span css={orderDetailLabelCSS}>City</span>{' '}
                                {order.details.city}
                            </div>
                            <div css={orderDetailItemCSS}>
                                <span css={orderDetailLabelCSS}>State</span>{' '}
                                {order.details.state}
                            </div>

                            <div css={orderDetailItemCSS}>
                                <span css={orderDetailLabelCSS}>Address</span>{' '}
                                {order.details.address}
                            </div>
                            <div css={orderDetailItemCSS}>
                                <span css={orderDetailLabelCSS}>ZIP</span>{' '}
                                {order.details.zip}
                            </div>
                        </div>
                    </div>
                    <div>
                        <span css={orderTitleCSS}>Items</span>
                        <div css={productsListCSS}>
                            {order.products.map((product) => {
                                const data = products[product.id];

                                return (
                                    <div key={data.id} css={productCSS}>
                                        <div css={imageWrapperCSS}>
                                            <div css={imageCSS}>
                                                <Image
                                                    src={
                                                        data.images[
                                                            data.images.length >
                                                            1
                                                                ? 1
                                                                : 0
                                                        ].url
                                                    }
                                                    layout="fill"
                                                />
                                            </div>
                                        </div>
                                        <div css={productDetailsCSS}>
                                            <div css={productNameCSS}>
                                                {data.name}
                                            </div>
                                            <div>
                                                <span>SIZE:</span>{' '}
                                                <b>{product.size}</b>
                                            </div>
                                            <div>
                                                <span>COUNT:</span>{' '}
                                                <b>{product.count}</b>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            );
        });
    };

    return (
        <Layout>
            <Head>
                <title>Purchases | My Account</title>
            </Head>
            <div css={containerCSS}>
                <h1 css={headerCSS}>All Purchases</h1>
                <div>
                    <div>{isLoading ? null : renderPurchases()}</div>
                </div>
            </div>
        </Layout>
    );
};

const containerCSS = css`
    max-width: 960px;
    margin: 2rem auto;
`;

const headerCSS = css`
    text-align: center;
    margin-bottom: 2rem;
`;

const orderCSS = css`
    background-color: #fff;
    padding: 1rem 1rem 2rem;

    & + & {
        border-top: 1px solid #ddd;
    }
`;

const orderDateCSS = css`
    display: inline-block;
    text-align: right;
    width: 100%;
    color: #999;
    font-size: 1.1rem;
    margin-bottom: 1rem;
`;

const orderDetailsCSS = css`
    margin-bottom: 2rem;
`;

const orderDetailItemCSS = css`
    margin-bottom: 0.4rem;
`;

const orderTitleCSS = css`
    display: inline-block;
    font-size: 1.4rem;
    text-transform: uppercase;
    font-weight: 700;
    margin-bottom: 1rem;
`;

const orderDetailLabelCSS = css`
    display: inline-block;
    font-weight: 700;
    width: 80px;
`;

const productsListCSS = css`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
`;

const productCSS = css`
    display: flex;
    flex: 1 0 33%;
    align-items: flex-start;
    padding: 0 0.2rem;
`;

const productDetailsCSS = css`
    padding: 0.6rem 1rem;
`;

const productNameCSS = css`
    font-weight: 700;
    margin-bottom: 1rem;
`;

const imageWrapperCSS = css`
    width: 100px;
    position: relative;
`;

const imageCSS = css`
    position: relative;
    width: 100%;
    padding-bottom: 150%;
`;

export default Purchases;
