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
        age: 'kid'
    });
    const { user } = useUser();
    const { data, error, size, setSize, revalidate } = useFetchProducts({
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
                <title>View All - Shop Kid's Clothing online</title>
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
                        url: '/products/kids',
                        text: 'Kids'
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
        age: 'kid'
    });

    return {
        props: {
            initialProducts: products
        }
    };
};

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

export default ViewAll;
