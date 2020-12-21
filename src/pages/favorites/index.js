import React from 'react';
import Head from 'next/head';
import { css } from '@emotion/core';
import { mobileDevice } from 'styles/utils';
import { observer } from 'mobx-react';
import useSWR from 'swr';
import { stringify } from 'qs';
import { Layout, Preloader } from 'components';
import List from 'features/favorites/List';
import { FavoritesStore } from 'features/favorites';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Favorites = observer(() => {
    const favIds = FavoritesStore.get();

    const { data: { data } = {}, error } = useSWR(
        `/api/products?${stringify({ id: favIds }, { indices: false })}`,
        fetcher
    );
    const isLoading = !data && !error;

    const renderProducts = () => {
        if (error) return null;

        if (!data.length) return 'No Products';

        return <List products={data} />;
    };

    return (
        <Layout>
            <Head>
                <title>Favorites</title>
            </Head>

            <section
                css={{
                    maxWidth: '1188px',
                    margin: '0 auto'
                }}
            >
                <h1 css={titleCSS}>Favorites</h1>
                <div>
                    {isLoading ? (
                        <Preloader />
                    ) : (
                        <div>
                            <div css={totalCSS}>{data.length} items</div>
                            {renderProducts()}
                        </div>
                    )}
                </div>
            </section>
        </Layout>
    );
});

const titleCSS = css`
    font-size: 3rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 3rem;

    ${mobileDevice(css`
        margin: 2rem 0;
    `)}
`;

const totalCSS = css`
    font-size: 0.9rem;
    text-transform: uppercase;
    text-align: right;
    margin-bottom: 1rem;
`;

export default Favorites;
