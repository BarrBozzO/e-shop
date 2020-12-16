import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { css } from '@emotion/core';
import { mobileDevice } from 'styles/utils';
import { Layout, Breadcrumbs } from 'components';
import { Nav } from 'features/products';

function KidsHome() {
    return (
        <Layout>
            <Head>
                <title>Kids' clothes</title>
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
                        text: 'Kids'
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
                                src="/imgs/kids-home.jpeg"
                                layout="fill"
                            />
                            <div
                                css={{
                                    position: 'absolute',
                                    bottom: '1rem',
                                    left: '50%',
                                    transform: 'translate(-50%)',
                                    zIndex: '2',
                                    textAlign: 'center'
                                }}
                            >
                                <h3>
                                    Holiday Delights
                                    <span>
                                        Your one-stop shop for perfect presents
                                        & seasonal must-haves
                                    </span>
                                </h3>
                                <Link href="/products/kids/holiday">
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
                        Kids' clothes
                    </h1>
                    <article
                        css={{
                            fontSize: '1rem'
                        }}
                    >
                        <p>
                            Adorable clothes for babies, toddlers and teens.
                            Find new fashion favourites in our wide range of
                            kid’s clothing.
                        </p>
                        <p>
                            For the babies
                            <br />
                            We have your baby’s wardrobe covered with our range
                            of pieces for newborn from 0-9 months. Look out for
                            multipacks of all-in-ones in super-soft organic
                            cotton. As your baby grows, our clothes for baby
                            girls 0-24 months and baby boys 0-24 months has you
                            covered with dungarees, soft jersey pieces and fun
                            animal print tees.
                        </p>
                        <p>
                            For the girls
                            <br />
                            Girls from 1½-10 years will love our floral and
                            butterfly prints, colourful stripes and Disney
                            motifs. Browse our kids clothing including
                            playsuits, ballet pumps and vibrant hair clips and
                            Alice bands. Older girls from ages 8-14 years can
                            choose from flowing jersey dresses, slim-fit jeans
                            and floaty vest tops.
                        </p>
                        <p>
                            For the boys Boys from 1½-10 years can explore our
                            range of bold leafy graphics, dinosaur prints and
                            nautical themed designs. Discover tapered jeans,
                            cargo shorts and playful tees in this lively
                            collection. Boys from 8-14 years can go for urban
                            and surfwear-inspired looks featuring vivid slogan
                            tees, sweatpants and snap-back caps.
                        </p>
                        <p>
                            Each season we bring together some of our favourite
                            kids’ fashion for babies, toddlers and teens. Watch
                            out for the latest looks we’re loving online at H&M!
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

export default KidsHome;
