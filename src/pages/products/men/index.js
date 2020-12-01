import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Layout from 'components/Layout';
import BreadCrumbs from 'components/Breadcrumbs';
import Button from 'components/Button';
import { Nav } from 'features/products';

function MenHome() {
    return (
        <Layout>
            <Head>
                <title>Men's Clothing</title>
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
                        text: 'Men'
                    }
                ]}
            />
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
                    <section
                        css={{
                            maxWidth: '960px',
                            margin: '2rem auto'
                        }}
                    >
                        <div
                            css={{
                                position: 'relative',
                                display: 'flex',
                                width: '100%',
                                paddingBottom: '66%',
                                flexDirection: 'column',
                                alignItems: 'stretch'
                            }}
                        >
                            <Image
                                css={{
                                    zIndex: '1'
                                }}
                                src="/imgs/men-home.jpeg"
                                layout="fill"
                            />
                            <div
                                css={{
                                    position: 'absolute',
                                    bottom: '1rem',
                                    left: '50%',
                                    transform: 'translate(-50%)',
                                    zIndex: '2'
                                }}
                            >
                                <h3
                                    css={{
                                        fontSize: '3rem',
                                        color: '#fff',
                                        marginBottom: '1rem'
                                    }}
                                >
                                    The Holiday Shop
                                </h3>
                                <p
                                    css={{
                                        color: '#fff',
                                        textAlign: 'center'
                                    }}
                                >
                                    Gift for him
                                </p>
                                <Button
                                    css={{
                                        display: 'block',
                                        width: '200px',
                                        borderColor: '#fff',
                                        backgroundColor: '#fff',
                                        color: '#222',
                                        margin: '1rem auto'
                                    }}
                                >
                                    Shop Now
                                </Button>
                            </div>
                        </div>
                    </section>
                    <h1
                        css={{
                            fontSize: '3rem',
                            textTransform: 'uppercase'
                        }}
                    >
                        Men's Clothing
                    </h1>
                    <div
                        css={{
                            fontSize: '0.8rem'
                        }}
                    ></div>
                </div>
            </div>
        </Layout>
    );
}

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

export default MenHome;
