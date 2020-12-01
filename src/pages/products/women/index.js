import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Layout from 'components/Layout';
import BreadCrumbs from 'components/Breadcrumbs';
import Button from 'components/Button';
import { Nav } from 'features/products';

function WomenProducts() {
    return (
        <Layout>
            <Head>
                <title>Women's Clothing</title>
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
                        text: 'Women'
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
                                src="/imgs/women-home.jpeg"
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
                                <p
                                    css={{
                                        color: '#fff',
                                        textAlign: 'center'
                                    }}
                                >
                                    On my wish list
                                </p>
                                <h3
                                    css={{
                                        fontSize: '3rem',
                                        color: '#fff',
                                        marginBottom: '1rem'
                                    }}
                                >
                                    Sequins made for the future
                                </h3>
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
                        Women's Clothing
                    </h1>
                    <div
                        css={{
                            fontSize: '0.8rem'
                        }}
                    >
                        Shop the latest fashion online at H&M and discover new
                        favorites in women’s clothing. Find everything from
                        casual day dresses to sharp office wear. We have jeans
                        in every fit, premium quality items and the latest
                        fashion essentials. Check out our Conscious collection
                        made out of more sustainable materials, we bring you
                        women’s fashion in a more sustainable way Once you’ve
                        found that perfect outfit complete your look with
                        stylish shoes, bags and accessories. Don’t miss out on
                        our wide range of on-point beauty products, not to
                        mention beautiful and flattering lingerie, shapewear and
                        loungewear. Update your gym bag with stylish, functional
                        sportswear for the gym or the yoga class. Find
                        flattering and on-trend bikinis and swimsuits. Start
                        building your new wardrobe today. Browse our collections
                        to find the latest in women’s fashion trends and update
                        your wardrobe with stylish women’s clothes. Your new
                        season style starts here at H&M.
                    </div>
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

export default WomenProducts;
