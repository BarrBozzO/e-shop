import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import { css } from '@emotion/core';
import { mobileDevice } from 'styles/utils';
import { Layout, Breadcrumbs, AdBanner } from 'components';
import {
    List,
    fetchProducts,
    Filter,
    useFetchProducts,
    Nav
} from 'features/products';
import { useUser } from 'features/user';

function Seo({ initialProducts, seoData }) {
    const [filters, setFilters] = useState(seoData.filters);
    const { user, initializing: userInit } = useUser();
    const {
        data,
        error,
        loading,
        size,
        setSize,
        revalidate
    } = useFetchProducts({
        initialData: [
            {
                data: initialProducts,
                cursor: initialProducts[initialProducts.length - 1].id
            }
        ],
        category: 'kids',
        filters
    });

    useEffect(() => {
        revalidate();
    }, [filters]);

    useEffect(() => {
        setFilters(seoData.filters);
    }, [seoData]);

    const handleLoadMore = useCallback(() => setSize(size + 1), [
        size,
        setSize
    ]);

    if (error) {
        console.error(error);
    }

    const totalProductsCount = data ? data[0].total : 0;
    const products = data
        ? data.reduce((allPages, page) => {
              return allPages.concat(page.data);
          }, [])
        : [];

    return (
        <Layout>
            <Head>
                <title>{seoData.title}</title>
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
                        url: '/products/Men',
                        text: 'Men'
                    },
                    {
                        text: seoData.h1
                    }
                ]}
            />
            {!user && !userInit && <AdBanner />}
            <div css={containerCSS}>
                <Nav links={seoLinks} />
                <div css={{ flex: '1 0 0' }}>
                    <h1 css={titleCSS}>{seoData.h1}</h1>
                    {seoData.description && <p>{seoData.description}</p>}
                    <Filter
                        filters={filters}
                        onChange={setFilters}
                        total={totalProductsCount}
                    />
                    <List
                        products={products}
                        total={totalProductsCount}
                        loading={loading}
                        handleLoadMore={handleLoadMore}
                    />
                </div>
            </div>
        </Layout>
    );
}

export const getStaticProps = async ({ params }) => {
    const seoData = seoPages[params.seo];
    const products = await fetchProducts(seoData.staticFilters);

    return {
        props: {
            initialProducts: products,
            seoData
        }
    };
};

export const getStaticPaths = async () => {
    return {
        paths: Object.keys(seoPages).map((seoSlug) => ({
            params: {
                seo: seoSlug
            }
        })),
        fallback: false
    };
};

const titleCSS = css`
    font-size: 3rem;
    text-transform: uppercase;
    line-height: 1;

    ${mobileDevice(css`
        margin: 2rem 0;
    `)}
`;

const containerCSS = css`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    width: 100%;
    margin-bottom: 2rem;

    ${mobileDevice(css`
        flex-direction: column-reverse;
    `)}
`;

const seoLinks = [
    {
        label: 'Shop by Product',
        links: [
            {
                label: 'View All',
                url: '/products/kids/all'
            },
            {
                label: 'Newborn 0-9m',
                url: '/products/kids/newborn'
            },
            {
                label: 'Baby Girls 4m-4Y',
                url: '/products/kids/baby-girls'
            },
            {
                label: 'Baby Boys 4m-4Y',
                url: '/products/kids/baby-boys'
            }
        ]
    },
    {
        label: 'Offers & Deals',
        links: [
            {
                label: 'Up to 60% off'
            },
            {
                label: 'Sale'
            },
            {
                label: 'BESTSELLERS FROM $9.99'
            },
            {
                label: 'MULTIPACK MAGIC FROM $19.99'
            }
        ]
    }
];

const seoPages = {
    all: {
        title: "View All - Shop Kid's Clothing online",
        h1: 'View All',
        staticFilters: {
            age: 'kid'
        },
        filters: {}
    },
    'baby-boys': {
        title: "Baby Boys - Shop Kid's Clothing online",
        h1: 'Baby Boys',
        staticFilters: {
            age: 'kid',
            seo: 'baby-boys-4m-4y'
        },
        filters: {
            age: 'kid',
            seo: 'baby-boys-4m-4y'
        }
    },
    'baby-girls': {
        title: "Baby Girls - Shop Kid's Clothing online",
        h1: 'Baby Girls',
        staticFilters: {
            age: 'kid',
            seo: 'baby-girls-4m-4y'
        },
        filters: {
            age: 'kid',
            seo: 'baby-girls-4m-4y'
        }
    },
    newborn: {
        title: "NEWBORN 0-9 MONTHS - Shop Kid's Clothing online",
        h1: 'NEWBORN 0-9 MONTHS',
        staticFilters: {
            age: 'kid',
            seo: 'newborn'
        },
        filters: {
            age: 'kid',
            seo: 'newborn'
        }
    },
    holiday: {
        title: "The Holiday Shop - Shop Kid's Clothing online",
        h1: 'The Holiday Shop',
        staticFilters: {
            age: 'kid',
            seo: 'holiday'
        },
        filters: {
            seo: 'holiday'
        }
    }
};

export default Seo;
