import React, { useState, useCallback } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { css } from '@emotion/core';
import { mobileDevice } from 'styles/utils';
import { observer } from 'mobx-react';
import {
    Layout,
    Breadcrumbs,
    Button,
    DropDown,
    FavoriteButton,
    Icon
} from 'components';
import { fetchProduct, fetchProducts } from 'features/products';
import { Cart, AddProductPopup } from 'features/cart';

function Product({ data }) {
    const [size, setSize] = useState();
    const [display, setDisplay] = useState(false);

    const ImagesContainer = useCallback(() => {
        if (!data) return null;

        const { images, description } = data;

        if (!images.length) return null;

        const [coverImage, extraImage, ...otherImgs] = images;

        const rowCSS = css`
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            width: 100%;
            position: relative;
        `;

        const rowItemCSS = css`
            flex: 1 0 calc(50% - 4px);
            max-width: 600px;
            position: relative;
            margin: 0 2px;

            @media (max-width: 1024px) {
                flex: 1 0 100%;
                margin: 2px 0;
            }
        `;

        const imgWrapperCSS = css`
            width: 100%;
            height: 0;
            padding-bottom: 150%;
        `;

        const descCSS = css`
            padding: 2rem;
            margin: 2rem 0;
            font-size: 1.2rem;
            background-color: #ffffff;
        `;

        return (
            <div css={imagesContainerCSS}>
                <div css={rowCSS}>
                    <div css={rowItemCSS}>
                        <div css={imgWrapperCSS}>
                            <Image
                                layout="fill"
                                alt="product image"
                                src={coverImage.url}
                            />
                        </div>
                    </div>
                    {extraImage && (
                        <div css={rowItemCSS}>
                            <div css={imgWrapperCSS}>
                                <Image
                                    layout="fill"
                                    alt="product image"
                                    src={extraImage.url}
                                />
                            </div>
                        </div>
                    )}
                </div>
                <div css={descCSS}>{description}</div>
                {Boolean(otherImgs.length) && (
                    <div css={rowCSS}>
                        {otherImgs.map((img) => (
                            <div css={rowItemCSS}>
                                <div css={imgWrapperCSS}>
                                    <Image
                                        layout="fill"
                                        alt="product image"
                                        src={img.url}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }, [data]);

    const handleAddToCart = useCallback(() => {
        setDisplay(true);
        Cart.add(data.id, size.value);
    }, [data, size]);

    if (!data) {
        // display loading skeleton
        return null;
    }

    const { name, age, sex, id, isSale, isNew, salePercent, price } = data;

    const isKid = age === 'kid';
    const isMale = sex === 'male';
    const isFemale = !isMale;

    return (
        <Layout>
            <Head>
                <title>{name}</title>
            </Head>
            <Breadcrumbs
                path={[
                    {
                        url: '/',
                        text: 'Home'
                    },
                    {
                        url: '/products',
                        text: 'Products'
                    },
                    {
                        url: `/products/${
                            isKid ? 'kids' : isFemale ? 'women' : 'men'
                        }`,
                        text: isFemale ? 'women' : 'men'
                    },
                    {
                        url: `/products/${
                            age === 'kid'
                                ? 'kids'
                                : sex === 'female'
                                ? 'women'
                                : 'men'
                        }/all`,
                        text: 'All'
                    },
                    {
                        text: name
                    }
                ]}
            />
            <div css={containerCSS}>
                <ImagesContainer />
                <div css={sidebarCSS}>
                    <div
                        css={{
                            position: 'relative',
                            paddingRight: '2rem'
                        }}
                    >
                        <h1 css={titleCSS}>{data.name}</h1>
                        <FavoriteButton id={id} styles={favCSS} />
                    </div>
                    {isNew && <div css={newCSS}>new arrival</div>}
                    <div css={productPriceCSS}>
                        {isSale && (
                            <>
                                <span
                                    css={{
                                        color: '#e50010',
                                        marginRight: '0.4rem',
                                        fontSize: '1.4rem'
                                    }}
                                >
                                    ${data.price.value}
                                </span>
                                <span
                                    css={{
                                        position: 'absolute',
                                        right: 0,
                                        backgroundColor: '#f0ddd7',
                                        color: '#c9002e',
                                        padding: '0.4rem 1rem',
                                        fontSize: '0.9rem',
                                        lineHeight: '1',
                                        fontWeight: 700
                                    }}
                                >
                                    -{salePercent}%
                                </span>
                            </>
                        )}
                        <span
                            css={{
                                textDecoration: isSale ? 'line-through' : '',
                                fontSize: isSale ? '1rem' : ''
                            }}
                        >
                            $
                            {Number.parseFloat(
                                price.value * (isSale ? salePercent : 1)
                            ).toFixed(2)}
                        </span>
                    </div>
                    <div css={productSizeCSS}>
                        <DropDown
                            label="select size"
                            defaultValue={size}
                            options={SIZE_OPTIONS[data.type]}
                            onChange={setSize}
                            hasArrow={false}
                        />
                    </div>
                    <div css={addContainerCSS}>
                        <Button css={addCSS} onClick={handleAddToCart}>
                            <Icon
                                name="cart"
                                size={14}
                                css={{
                                    display: 'inline-block',
                                    fill: '#ffffff',
                                    marginRight: '0.2rem',
                                    verticalAlign: 'top'
                                }}
                            />{' '}
                            Add
                        </Button>
                    </div>
                </div>
            </div>

            <AddProductPopup
                isOpen={display}
                data={{
                    ...data,
                    __size: size && size.value
                }}
                onClose={() => setDisplay(false)}
            />
        </Layout>
    );
}

const SIZE_OPTIONS = {
    clothes: [
        {
            value: 's',
            label: 'S - small'
        },
        {
            value: 'm',
            label: 'M - medium'
        },
        {
            value: 'l',
            label: 'L - large'
        },
        {
            value: 'xl',
            label: 'XL - extra large'
        },
        {
            value: 'xxl',
            label: 'XXL - extra-extra large'
        }
    ],
    underwear: [
        {
            value: 's',
            label: 'S - small'
        },
        {
            value: 'm',
            label: 'M - medium'
        },
        {
            value: 'l',
            label: 'L - large'
        },
        {
            value: 'xl',
            label: 'XL - extra large'
        },
        {
            value: 'xxl',
            label: 'XXL - extra-extra large'
        }
    ],
    'shoes&accessories': [
        {
            value: 's',
            label: 'S - small'
        },
        {
            value: 'm',
            label: 'M - medium'
        },
        {
            value: 'l',
            label: 'L - large'
        },
        {
            value: 'xl',
            label: 'XL - extra large'
        },
        {
            value: 'xxl',
            label: 'XXL - extra-extra large'
        }
    ]
};

const imagesContainerCSS = css`
    width: 70vw;

    ${mobileDevice(css`
        width: 100%;
    `)}
`;

const favCSS = css`
    width: 20px;
    height: 20px;
    padding: 0;
`;

const containerCSS = css`
    display: flex;
    align-items: flex-start;
    max-width: 1600px;
    margin: 2rem auto;
    position: relative;
    padding: 0 2rem;

    ${mobileDevice(css`
        flex-direction: column;
        padding: 0;
    `)}
`;

const sidebarCSS = css`
    position: sticky;
    top: 0;
    width: 30vw;
    height: auto;
    padding: 1rem 2rem;

    ${mobileDevice(css`
        width: 100%;
        position: fixed;
        bottom: 0;
        top: auto;
        left: 0;
        background: #fff;
        box-shadow: 0 -2px 10px 0 rgba(0, 0, 0, 0.1);
        padding: 1rem 2rem 0.8rem;
    `)}
`;

const newCSS = css`
    color: #e50010;
    text-transform: uppercase;
    font-size: 0.9rem;
    margin-bottom: 1rem;

    ${mobileDevice(css`
        display: none;
    `)}
`;

const productPriceCSS = css`
    position: relative;
    font-weight: 500;
    font-size: 1.2rem;
    margin-bottom: 1rem;

    ${mobileDevice(css`
        vertical-alig: middle;
    `)}
`;

const productSizeCSS = css`
    margin-bottom: 2rem;

    ${mobileDevice(css`
        display: inline-block;
        vertical-align: top;
        width: 48%;
        margin-bottom: 1rem;
        margin-right: 2%;
    `)}
`;

const addContainerCSS = css`
    ${mobileDevice(css`
        display: inline-block;
        width: 48%;
        margin-left: 2%;
        vertical-align: top;
    `)}
`;

const addCSS = css`
    height: 40px;
`;

const titleCSS = css`
    margin: 0 0 1rem;
    font-size: 1.4rem;
    padding: 0;
    text-align: left;

    ${mobileDevice(css`
        font-size: 1.2rem;
    `)}
`;

export const getStaticProps = async (cxt) => {
    const product = await fetchProduct(cxt.params.id);

    return {
        props: {
            data: product
        }
    };
};

export const getStaticPaths = async () => {
    // TODO render most popular - for otherImgs fallback
    const products = await fetchProducts();

    return {
        paths: products.map((product) => ({
            params: {
                id: product.id
            }
        })),
        fallback: true
    };
};

export default observer(Product);
