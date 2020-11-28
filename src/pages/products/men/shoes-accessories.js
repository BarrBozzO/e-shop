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

function ViewAll({ initialProducts }) {
    const [filters, setFilters] = useState({
        type: 'shoes&accessories'
    });
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
                <title>View All - Shop Men's Clothing online</title>
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
                        url: '/products/men',
                        text: 'Men'
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
                        View All
                    </h1>
                    <div>
                        <Filter filters={filters} onChange={setFilters} />
                        <List products={products} />
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
            </div>
        </Layout>
    );
}

export const getStaticProps = async () => {
    const products = await fetchProducts({
        age: 'adult',
        sex: 'male',
        type: 'shoes&accessories'
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

export default ViewAll;
