import React from 'react';
import Head from 'next/head';
import Layout from 'components/Layout';
import Preloader from 'components/Preloader';
import List from 'features/favorites/List';
import useSWR from 'swr';
import { stringify } from 'qs';
import { FavoritesStore } from 'features/favorites';
import { observer } from 'mobx-react';

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

            <h1>Favorites</h1>
            <div>{isLoading ? <Preloader /> : renderProducts()}</div>
        </Layout>
    );
});

export default Favorites;
