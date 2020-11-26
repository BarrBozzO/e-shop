import React from 'react';
import { css } from '@emotion/core';
import Link from 'next/link';
import Image from 'next/image';
import FavoriteButton from 'components/FavoriteButton';
import Preloader from 'components/Preloader';

function List({ products, loading }) {
    if (!Array.isArray(products) || !products.length) return null;

    if (loading) return <Preloader />;

    return (
        <div
            css={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'flex-start'
            }}
        >
            {products
                .filter((product) => product.data && product.data.images.length)
                .map((product) => (
                    <List.Item key={product.id} product={product} />
                ))}
        </div>
    );
}

List.Item = ({ product: { id, data } }) => {
    return (
        <div
            css={css`
                flex: 0 0 calc(33% - 1rem);
                margin-left: 0.5rem;
                margin-bottom: 2rem;
                margin-right: 0.5rem;
            `}
        >
            <div
                css={{
                    position: 'relative'
                }}
            >
                <Link href={`/products/${id}`}>
                    <a css={imageContainerCSS}>
                        <Image
                            css={{ zIndex: 1 }}
                            layout="fill"
                            src={data.images[0].url}
                        />
                        <Image layout="fill" src={data.images[1].url} />
                    </a>
                </Link>
                <FavoriteButton id={id} />
            </div>
            <div>
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
                <span
                    css={{
                        display: 'inline-block',
                        width: '100%',
                        marginTop: '0.4rem',
                        fontSize: '1rem'
                    }}
                >
                    $ {data.price.value}
                </span>
            </div>
        </div>
    );
};

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
