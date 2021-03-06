import React from 'react';
import { css } from '@emotion/core';
import { mobileDevice } from 'styles/utils';
import Link from 'next/link';
import Image from 'next/image';
import { Preloader, FavoriteButton, Button } from 'components';

function List({ products, total, handleLoadMore, loading }) {
    if (!Array.isArray(products) || !products.length) return null;

    const isLastPage = products.length >= total;

    return (
        <>
            <div
                css={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'flex-start'
                }}
            >
                {products
                    .filter(
                        (product) => product.data && product.data.images.length
                    )
                    .map((product) => (
                        <List.Item key={product.id} product={product} />
                    ))}
            </div>

            <div
                css={{
                    textAlign: 'center'
                }}
            >
                <div
                    css={{
                        margin: '1rem 0',
                        fontWeight: 700,
                        textTransform: 'uppercase'
                    }}
                >
                    Showing {products.length} of {total} Items
                </div>
                {!isLastPage && (
                    <Button
                        css={{
                            display: 'block',
                            width: '300px',
                            height: '47px',
                            margin: '0 auto'
                        }}
                        disabled={loading}
                        onClick={handleLoadMore}
                    >
                        {loading && (
                            <Preloader cssParams={{ marginRight: '10px' }} />
                        )}
                        Load More Products
                    </Button>
                )}
            </div>
        </>
    );
}

List.Item = ({ product: { id, data } }) => {
    return (
        <div css={itemCSS}>
            <div
                css={{
                    position: 'relative'
                }}
            >
                <Link href={`/products/${id}`}>
                    <a css={imageContainerCSS}>
                        <div
                            css={{
                                zIndex: '1',
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)'
                            }}
                        >
                            <Preloader
                                cssParams={{
                                    fill: '#e50010',
                                    width: '24px',
                                    height: '24px'
                                }}
                                size={24}
                            />
                        </div>
                        <Image
                            css={{ zIndex: 2 }}
                            layout="fill"
                            src={data.images[0].url}
                        />
                        <Image
                            css={{ zIndex: 1 }}
                            layout="fill"
                            src={data.images[1].url}
                        />
                    </a>
                </Link>
                <FavoriteButton id={id} />
            </div>
            <div
                css={{
                    position: 'relative'
                }}
            >
                <Link href={`/products/${id}`}>
                    <a
                        css={{
                            display: 'inline-block',
                            marginTop: '1rem',
                            fontSize: '1.2rem',
                            cursor: 'pointer'
                        }}
                    >
                        {data.name}
                    </a>
                </Link>
                <div>
                    {data.isSale && (
                        <span
                            css={{
                                display: 'inline-block',
                                marginTop: '0.4rem',
                                fontSize: '1.1rem',
                                color: '#e50010',
                                marginRight: '0.4rem',
                                verticalAlign: 'middle'
                            }}
                        >
                            ${data.price.value}
                        </span>
                    )}
                    <span
                        css={{
                            display: 'inline-block',
                            marginTop: '0.4rem',
                            fontSize: data.isSale ? '0.9rem' : '1.1rem',
                            textDecoration: data.isSale
                                ? 'line-through'
                                : 'none',
                            verticalAlign: 'middle'
                        }}
                    >
                        $
                        {parseFloat(
                            data.price.value *
                                (data.isSale ? data.salePercent : 1)
                        ).toFixed(2)}
                    </span>
                </div>

                {data.isNew && <span css={newCSS}>New Arrival</span>}
            </div>
        </div>
    );
};

const itemCSS = css`
    flex: 0 0 calc(33% - 1rem);
    margin-left: 0.5rem;
    margin-bottom: 2rem;
    margin-right: 0.5rem;

    ${mobileDevice(css`
        flex: 0 0 calc(50% - 1rem);
    `)}
`;

const newCSS = css`
    position: absolute;
    right: 0;
    color: #e50010;
    text-transform: uppercase;
    font-size: 0.8rem;
    bottom: 0;

    ${mobileDevice(css`
        position: relative;
    `)}
`;

const imageContainerCSS = css`
    display: block;
    background-color: #fff;
    height: 0;
    padding-bottom: 150%;
    position: relative;
    cursor: pointer;
    overflow: hidden;

    &:hover {
        & > div:last-of-type {
            z-index: 2;
        }
    }
`;

export default List;
