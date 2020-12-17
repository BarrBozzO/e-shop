import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { css } from '@emotion/core';
import { mobileDevice } from 'styles/utils';
import { Layout, Breadcrumbs } from 'components';
import { Nav } from 'features/products';

function WomenProducts() {
    return (
        <Layout>
            <Head>
                <title>Women's Clothing</title>
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
                        text: 'Women'
                    }
                ]}
            />
            <div css={containerCSS}>
                <Nav links={seoLinks} />
                <div css={{ flex: '1 0 0' }}>
                    <section
                        css={{
                            maxWidth: '960px',
                            margin: '2rem auto'
                        }}
                    >
                        <div css={seoBlockCSS}>
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
                                    textAlign: 'center',
                                    bottom: '1rem',
                                    left: '50%',
                                    transform: 'translate(-50%)',
                                    zIndex: '2'
                                }}
                            >
                                <h3>
                                    The Holiday Shop
                                    <span>Gift for her</span>
                                </h3>
                                <Link href="/products/women/holiday">
                                    <a
                                        css={{
                                            display: 'block',
                                            width: '200px',
                                            borderColor: '#fff',
                                            backgroundColor: '#fff',
                                            color: '#222',
                                            padding: '1rem 0.5rem',
                                            margin: '1rem auto'
                                        }}
                                    >
                                        Shop Now
                                    </a>
                                </Link>
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
                    <article
                        css={{
                            fontSize: '1rem'
                        }}
                    >
                        <p>
                            Shop the latest fashion online at H&M and discover
                            new favourites in women’s clothing. Find everything
                            from casual day dresses or cocktail dresses to sharp
                            office wear. We have jeans in every fit, premium
                            quality items and the latest fashion essentials.
                            Check out our Conscious collection, made out of more
                            sustainable materials, we bring you women’s fashion
                            in a more sustainable way
                        </p>
                        <p>
                            Once you’ve found that perfect outfit complete your
                            look with stylish shoes, bags and accessories. Don’t
                            miss out on our wide range of on-point beauty
                            products, not to mention beautiful and flattering
                            lingerie, shapewear and loungewear. Prepare for the
                            cold season with our women’s winter coats.
                        </p>
                        <p>
                            Update your gym bag with stylish, functional
                            sportswear for the gym or the yoga class.
                        </p>
                        <p>
                            If you have a big occasion coming up and an evening
                            dress is the only thing to suffice we have suitable
                            styles. For the biggest occasion of all we also have
                            bridesmaids dresses to co-ordinate your bridal party
                            and have the girls looking their absolute best.
                        </p>
                        <p>
                            Find flattering and on-trend bikinis and swimsuits.
                            Start building your new wardrobe today. Browse our
                            collections to find the latest in women’s fashion
                            trends and update your wardrobe with stylish women’s
                            clothes. Your new season style starts here at H&M.
                        </p>
                    </article>
                </div>
            </div>
        </Layout>
    );
}

const containerCSS = css`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    width: 100%;
    margin-bottom: 2rem;

    ${mobileDevice(css`
        flex-direction: column;
    `)}
`;

const seoBlockCSS = css`
    position: relative;
    display: flex;
    width: 100%;
    padding-bottom: 66%;
    flex-direction: column;
    align-items: stretch;

    h3 {
        font-size: 3rem;
        color: #fff;
        margin-bottom: 1rem;
        text-shadow: 0px 0px 20px rgba(0, 9, 84, 0.2);

        ${mobileDevice(css`
            font-size: 2rem;
        `)}

        span {
            display: inline-block;
            width: 100%;
            font-weight: 400;
            font-size: 1rem;
            color: #fff;
            text-align: center;
        }
    }
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

export default WomenProducts;
