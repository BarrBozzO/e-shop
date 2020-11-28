import React from 'react';
import Link from 'next/link';
import { css } from '@emotion/core';
import Button from 'components/Button';

const SHIPPING_PRICE = 100;

function Order({ products }) {
    const productsPrice = products.reduce((total, currentProduct) => {
        let value =
            Number.parseFloat(currentProduct?.data?.price?.value) *
            currentProduct.__count;
        if (isNaN(value)) {
            throw new Error('Appliaction failed');
        }
        return total + value;
    }, 0);

    const getTotal = () => {
        return (SHIPPING_PRICE + productsPrice).toFixed(2);
    };

    return (
        <section
            css={{
                flex: '0 0 auto',
                maxWidth: '360px'
            }}
        >
            <div
                css={{
                    backgroundColor: '#fff',
                    padding: '1rem'
                }}
            >
                <h2 css={titleCSS}>Make order</h2>
                <div>
                    <div css={orderCSS}>
                        <div
                            css={{
                                flex: '1 0 50%'
                            }}
                        >
                            Order
                        </div>
                        <div
                            css={{
                                flex: '1 0 50%',
                                textAlign: 'right'
                            }}
                        >
                            ${productsPrice.toFixed(2)}
                        </div>
                    </div>
                    <div css={shippingCSS}>
                        <div
                            css={{
                                flex: '1 0 50%'
                            }}
                        >
                            Shipping Value
                        </div>
                        <div
                            css={{
                                flex: '1 0 50%',
                                textAlign: 'right'
                            }}
                        >
                            ${SHIPPING_PRICE}
                        </div>
                    </div>
                    <div css={totalCSS}>
                        <div
                            css={{
                                flex: '1 0 50%'
                            }}
                        >
                            Total
                        </div>
                        <div
                            css={{
                                flex: '1 0 50%',
                                textAlign: 'right'
                            }}
                        >
                            ${getTotal()}
                        </div>
                    </div>
                </div>
                <Button>Continue to checkout</Button>
                <p css={discountCSS}>
                    Become a member to get early access to Black Friday + a 10%
                    off welcome offer!
                </p>
                <p css={taxCSS}>
                    The estimated tax will be confirmed once you added your
                    shipping address in checkout. 30-day returns. Read more
                    about our{' '}
                    <Link href="/returns-and-refund">
                        <a
                            css={{
                                textDecoration: 'underline'
                            }}
                        >
                            return and refund policy
                        </a>
                    </Link>
                    .
                </p>
            </div>
            <div css={shippingDescriptionCSS}>
                Shipping Update: All orders will take 12-15 business days to be
                delivered. Please take this into consideration before placing
                your order. We appreciate your patience and understanding during
                this time.
                <h3>Shipping & Returns</h3>
                Please ensure you have entered the correct shipping address, as
                this cannot be changed after you have placed an order. Please
                note, an order cannot be cancelled or modified once it has been
                placed.
                <h3>SHIPPING OPTIONS:</h3>
                FREE STANDARD SHIPPING OVER $40 $3.99 below $40 (12-15 business
                days)
                <h3>RETURNS</h3>
                Free in-store returns Return with USPS ($5.99) H&M HOME items
                purchased online must be returned by mail
            </div>
        </section>
    );
}

const titleCSS = css`
    text-transform: uppercase;
`;

const shippingCSS = css`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    font-weight: 100;
    white-space: nowrap;
`;

const orderCSS = css`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    font-weight: 100;
    padding-bottom: 0.4rem;
`;

const taxCSS = css`
    font-size: 0.8rem;
    font-weight: 700;
    color: #777;
    margin-bottom: 0;
`;

const discountCSS = css`
    font-size: 0.8rem;
    text-align: center;
    font-weight: 700;
    padding: 0 2rem;
    color: rgb(214, 0, 28);
`;

const totalCSS = css`
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 2px solid #222222;
    margin-top: 1.4rem;
    padding-top: 1.4rem;
    padding-bottom: 1.4rem;
    font-weight: 700;
    font-size: 1.2rem;
`;

const shippingDescriptionCSS = css`
    background-color: #fff;
    padding: 1rem;
    margin-top: 2rem;
`;

export default Order;
