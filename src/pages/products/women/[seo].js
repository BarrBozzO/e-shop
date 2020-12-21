import React, { useState, useEffect, useCallback } from 'react';
import { css } from '@emotion/core';
import { mobileDevice } from 'styles/utils';
import Head from 'next/head';
import { Layout, Breadcrumbs, AdBanner } from 'components';
import {
    List,
    fetchProducts,
    Filter,
    useFetchProducts,
    Nav
} from 'features/products';
import { useUser } from 'features/user';

function SeoPage({ initialProducts, seoData }) {
    const [filters, setFilters] = useState(seoData.filters);
    const { user } = useUser();
    const { data, error, size, setSize, revalidate } = useFetchProducts({
        initialData: [
            {
                data: initialProducts,
                cursor: initialProducts[initialProducts.length - 1].id
            }
        ],
        category: 'women',
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

    const isLoading = !data && !error;

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
                        url: '/products/women',
                        text: 'Women'
                    },
                    {
                        text: seoData.h1
                    }
                ]}
            />
            {!user && <AdBanner />}
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
                        isLastPage={products.length >= totalProductsCount}
                        loading={isLoading}
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
        label: 'New Arrivals',
        links: [
            {
                label: 'View All',
                url: '/products/women/all'
            },
            {
                label: 'Clothes',
                url: '/products/women/clothes'
            },
            {
                label: 'Underwear &amp; Nightwear',
                url: '/products/women/underwear-nightwear'
            },
            {
                label: 'Shoes &amp; Accessories',
                url: '/products/women/shoes-accessories'
            }
        ]
    },
    {
        label: 'Offers',
        links: [
            {
                label: 'Up to 60% off'
            },
            {
                label: 'Sale'
            },
            {
                label: 'Join Loyalty: Get 10% Off'
            },
            {
                label: 'Student Discount: Get 15% off'
            }
        ]
    },
    {
        label: 'Trending Now',
        links: [
            {
                label: 'Trend Edit'
            },
            {
                label: 'The Holiday Shop'
            },
            {
                label: 'Fashion Finds Under $25'
            },
            {
                label: 'Shop by Product'
            }
        ]
    }
];

const seoPages = {
    all: {
        title: "View All - Shop Women's Clothing online",
        h1: 'View All',
        staticFilters: {
            sex: 'female',
            age: 'adult'
        },
        filters: {}
    },
    clothes: {
        title: "Clothes - Shop Women's Clothing online",
        h1: 'Clothes',
        staticFilters: {
            sex: 'female',
            age: 'adult',
            type: 'clothes'
        },
        filters: {
            type: 'clothes'
        }
    },
    'underwear-nightwear': {
        title: "Underwear & Nightwear - Shop Women's Clothing online",
        h1: 'UNDERWEAR & NIGHTWEAR',
        staticFilters: {
            sex: 'female',
            age: 'adult',
            type: 'underwear'
        },
        filters: {
            type: 'underwear'
        }
    },
    'shoes-accessories': {
        title: "Shoes & Accessories - Shop Women's Clothing online",
        h1: 'Shoes & Accessories',
        staticFilters: {
            sex: 'female',
            age: 'adult',
            type: 'shoes&accessories'
        },
        filters: {
            type: 'shoes&accessories'
        }
    },
    holiday: {
        title: "The Holiday Shop - Shop Women's Clothing online",
        h1: 'The Holiday Shop',
        description:
            "Unwrap our favorite picks from the Holiday Shop and treat her to a selection of classic sweaters, novelty pajamas and stocking stuffers. Discover the perfect outfits for the season, including outfit-making accessories and cold-weather essentials. Whatever her style, you're guaranteed to find something suitably festive below.",
        staticFilters: {
            sex: 'female',
            age: 'adult',
            seo: 'holiday'
        },
        filters: {
            seo: 'holiday'
        }
    }
};

export default SeoPage;
