import React from 'react';
import { css } from '@emotion/core';
import Link from 'next/link';
import Image from 'next/image';
import FavoriteButton from 'components/FavoriteButton';
import ActionButton from 'components/ActionButton';
import Cart from 'features/cart/Cart';
import { mobileDevice } from 'styles/utils';

function List({ products }) {
    if (!Array.isArray(products) || !products.length) return null;

    return (
        <div css={{}}>
            {products.map((product) => (
                <List.Item
                    key={product.id}
                    product={product}
                    onDelete={(reset) =>
                        Cart.remove(product.id, product.__size, reset)
                    }
                    onAdd={() => Cart.add(product.id, product.__size)}
                />
            ))}
        </div>
    );
}

List.CountControl = ({ count, onAdd, onDelete }) => {
    return (
        <div
            css={css`
                display: inline-flex;
                width: 80px;
                justify-content: center;
                vertical-align: middle;
                align-items: center;
                background-color: #ffffff;
                border: 1px solid #d0d0d0;
                ${count <= 1 ? 'padding-left: 30px' : ''}
            `}
        >
            {count > 1 && (
                <ActionButton
                    css={{
                        flex: '1 0 auto',
                        height: '2rem',
                        fontSize: '1.4rem',
                        lineHeight: '2rem',

                        '&:hover': {
                            color: '#e50010'
                        },

                        '& span': {
                            width: '100%',
                            height: '100%',
                            textAlign: 'center'
                        }
                    }}
                    label="-"
                    disabled={count <= 1}
                    onClick={onDelete}
                />
            )}

            <span
                css={{
                    flex: '0 0 20px',
                    textAlign: 'center',
                    fontWeight: '400',
                    fontSize: '1.2rem',
                    lineHeight: '2rem'
                }}
            >
                {count}
            </span>
            <ActionButton
                label="+"
                onClick={onAdd}
                css={{
                    flex: '1 0 auto',
                    height: '2rem',
                    fontSize: '1.4rem',
                    lineHeight: '2rem',

                    '&:hover': {
                        color: '#e50010'
                    },

                    '& span': {
                        width: '100%',
                        height: '100%',
                        textAlign: 'center'
                    }
                }}
            />
        </div>
    );
};

List.Item = ({ product: { id, data, __total, __size }, onDelete, onAdd }) => {
    const { images, price, name, isSale, salePercent } = data;
    const image = images[1] ? images[1] : images[0];

    return (
        <div css={productCSS}>
            <div css={productImageWrapperCSS}>
                <Link href={`/products/${id}`}>
                    <a css={imageContainerCSS}>
                        <Image
                            css={{ zIndex: 1 }}
                            layout="fill"
                            src={image.url}
                        />
                    </a>
                </Link>
            </div>
            <div css={productDetailsCSS}>
                <Link href={`/products/${id}`}>
                    <a css={productNameCSS}>{name}</a>
                </Link>
                <div
                    css={{
                        marginTop: '0.4rem'
                    }}
                >
                    {isSale && (
                        <span
                            css={{
                                display: 'inline-block',
                                fontSize: '1.2rem',
                                color: '#e50010',
                                marginRight: '0.5rem'
                            }}
                        >
                            ${price.value}
                        </span>
                    )}
                    <span
                        css={{
                            display: 'inline-block',
                            fontSize: isSale ? '1rem' : '1.2rem',
                            textDecoration: isSale ? 'line-through' : '',
                            color: isSale ? '#666' : '#222'
                        }}
                    >
                        ${price.value}
                    </span>
                </div>
                <span
                    css={{
                        display: 'inline-block',
                        width: '100%',
                        marginTop: '0.4rem',
                        fontSize: '1rem'
                    }}
                >
                    Size:{' '}
                    <span
                        css={{
                            textTransform: 'uppercase',
                            fontWeight: 700
                        }}
                    >
                        {__size}
                    </span>
                </span>
                <div
                    css={{
                        marginTop: 'auto'
                    }}
                >
                    <List.CountControl
                        count={__total}
                        onAdd={onAdd}
                        onDelete={() => onDelete()}
                    />
                    <FavoriteButton
                        id={id}
                        styles={{
                            padding: 0,
                            width: '40px',
                            height: '40px',
                            position: 'relative',
                            display: 'inline-flex',
                            verticalAlign: 'middle',
                            marginLeft: '1rem'
                        }}
                    />
                </div>
                <ActionButton
                    icon={{
                        name: 'cross',
                        css: closeBtnCSS
                    }}
                    onClick={() => onDelete(true)}
                />
            </div>
        </div>
    );
};

const productCSS = css`
    width: 100%;
    display: flex;
    align-items: stretch;
    justify-content: flex-start;
    background-color: #fff;

    & + & {
        margin: 1rem 0;
    }
`;

const productNameCSS = css`
    display: inline-block;
    font-size: 1.4rem;
    margin: 1rem 0;
    cursor: pointer;

    ${mobileDevice(css`
        font-size: 1.2rem;
    `)}
`;

const productDetailsCSS = css`
    flex: 1 0 auto;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    position: relative;

    ${mobileDevice(css`
        padding-right: 28px;
    `)}
`;

const closeBtnCSS = css`
    position: absolute;
    top: 1rem;
    right: 1rem;
    fill: #999;

    ${mobileDevice(css`
        right: 0.2rem;
    `)}
`;

const productImageWrapperCSS = css`
    width: 170px;
    position: relative;
    margin-right: 1rem;

    ${mobileDevice(css`
        width: 40%;
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
`;

export default List;
