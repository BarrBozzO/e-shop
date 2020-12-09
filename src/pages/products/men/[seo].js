import React, { useState, useEffect, useCallback } from 'react';
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

function ViewAll({ initialProducts, seoData }) {
    const [filters, setFilters] = useState({});
    const { user } = useUser();
    const { data, error, size, setSize, revalidate } = useFetchProducts({
        initialData: [
            {
                data: initialProducts,
                cursor: initialProducts[initialProducts.length - 1].id
            }
        ],
        category: 'men',
        filters
    });

    useEffect(() => {
        revalidate();
    }, [filters]);

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
                        url: '/products/Men',
                        text: 'Men'
                    },
                    {
                        text: seoData.h1
                    }
                ]}
            />
            {!user && <AdBanner />}
            <div
                css={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    width: '100%'
                }}
            >
                <Nav links={seoLinks} />
                <div css={{ flex: '1 0 0' }}>
                    <h1
                        css={{
                            fontSize: '3rem',
                            textTransform: 'uppercase'
                        }}
                    >
                        {seoData.h1}
                    </h1>
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

const seoLinks = [
    {
        label: 'New Arrivals',
        links: [
            {
                label: 'View All',
                url: '/products/men/all'
            },
            {
                label: 'Clothes',
                url: '/products/men/clothes'
            },
            {
                label: 'Shoes &amp; Accessories',
                url: '/products/men/shoes-accessories'
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
                label: 'Socks: B2G1'
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
                label: 'Winter Essentials'
            },
            {
                label: 'The Holiday Shop'
            },
            {
                label: 'Holiday Knitwear'
            },
            {
                label: 'Most Popular Tops & Pants'
            },
            {
                label: 'The Graphics Shop'
            }
        ]
    }
];

const seoPages = {
    all: {
        title: "View All - Shop Men's Clothing online",
        h1: 'View All',
        staticFilters: {
            sex: 'male',
            age: 'adult'
        },
        filters: {}
    },
    clothes: {
        title: "Clothes - Shop Men's Clothing online",
        h1: 'Clothes',
        staticFilters: {
            sex: 'male',
            age: 'adult',
            type: 'clothes'
        },
        fitlers: {
            type: 'clothes'
        }
    },
    'shoes-accessories': {
        title: "Shoes & Accessories - Shop Men's Clothing online",
        h1: 'Shoes & Accessories',
        staticFilters: {
            sex: 'male',
            age: 'adult',
            type: 'shoes&accessories'
        },
        filters: {
            type: 'shoes&accessories'
        }
    },
    holiday: {
        title: "The Holiday Shop - Shop Men's Clothing online",
        h1: 'The Holiday Shop',
        description:
            "From great gifts for him to a wide range of festive outfits, find everything he'll need to navigate the season in our Holiday Shop for men. Find ugly Christmas sweaters, classic knits, pajamas, socks and more. There's plenty of inspiration in our holiday gift guide for even the most hard-to-buy-for guy!",
        staticFilters: {
            sex: 'male',
            age: 'adult',
            seo: 'holiday'
        },
        filters: {
            seo: 'holiday'
        }
    }
};

export default ViewAll;
