import React from 'react';
import { css } from '@emotion/core';
import { mobileDevice } from 'styles/utils';

const SHIPPING_PRICE = 3.99;

function Order({ products }) {
    const productsPrice = products.reduce((total, currentProduct) => {
        let value =
            Number.parseFloat(currentProduct?.data?.price?.value) *
            currentProduct.__total;
        if (isNaN(value)) {
            throw new Error('Appliaction failed');
        }
        return total + value;
    }, 0);

    const getTotal = () => {
        return (SHIPPING_PRICE + productsPrice).toFixed(2);
    };

    return (
        <section css={sectionCSS}>
            <div
                css={{
                    backgroundColor: '#fff',
                    padding: '1rem'
                }}
            >
                <h2 css={titleCSS}>Your order</h2>
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
            </div>
        </section>
    );
}

const titleCSS = css`
    text-transform: uppercase;

    ${mobileDevice(css`
        margin-bottom: 1rem;
    `)}
`;

const sectionCSS = css`
    flex: 0 0 auto;
    min-width: 360px;
    margin-left: 2rem;

    ${mobileDevice(css`
        flex: 1 0 100%;
        min-width: auto;
        margin-left: 0;
    `)}
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

const totalCSS = css`
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 2px solid #222222;
    margin-top: 1.4rem;
    padding: 1.4rem 0;
    font-weight: 700;
    font-size: 1.2rem;

    ${mobileDevice(css`
        padding: 1rem 0 0;
    `)}
`;

export default Order;
