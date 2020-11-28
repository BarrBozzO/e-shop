import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from 'components/Layout';
import BreadCrumbs from 'components/Breadcrumbs';
import Button from 'components/Button';
import AdBanner from 'components/AdBanner';
import {
    List,
    fetchProducts,
    Filter,
    useFetchProducts,
    Nav
} from 'features/products';
import { useUser } from 'features/user';

function Clothes({ initialProducts }) {
    const [filters, setFilters] = useState({
        type: 'clothes'
    });
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

    const isLoading = !data && !error;

    if (error) {
        console.error(error);
    }

    const products = data
        ? data.reduce((allPages, page) => {
              return allPages.concat(page.data);
          }, [])
        : [];

    return (
        <Layout>
            <Head>
                <title>Clothes</title>
            </Head>

            <BreadCrumbs
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
                        text: 'View All'
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
                        Clothes
                    </h1>
                    <Filter filters={filters} onChange={setFilters} />
                    <List products={products} loading={isLoading} />
                    <Button
                        css={{
                            display: 'block',
                            width: '300px',
                            height: '47px',
                            margin: '0 auto'
                        }}
                        disabled={isLoading}
                        onClick={() => setSize(size + 1)}
                    >
                        Load More Products
                    </Button>
                </div>
            </div>
        </Layout>
    );
}

export const getStaticProps = async () => {
    const products = await fetchProducts({
        sex: 'female',
        age: 'adult',
        type: 'clothes'
    });

    return {
        props: {
            initialProducts: products
        }
    };
};

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

export default Clothes;
