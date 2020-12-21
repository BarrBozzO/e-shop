import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { css } from '@emotion/core';
import { Layout, Breadcrumbs } from 'components';
import { Nav } from 'features/products';
import { mobileDevice } from 'styles/utils';

function MenHome() {
    return (
        <Layout>
            <Head>
                <title>Men's Clothing</title>
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
                        text: 'Men'
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
                                src="/imgs/men-home.jpeg"
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
                                    The Holiday Shop
                                    <span>Gift for him</span>
                                </h3>
                                <Link href="/products/men/holiday">
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
                        Men's Clothing
                    </h1>
                    <div
                        css={{
                            fontSize: '1rem'
                        }}
                    >
                        <h2 css={insightsCSS}>
                            Insights From Our Head Of Men's Fashion At H&M
                        </h2>
                        <b css={questionCSS}>
                            Can you explain your role as head of design for
                            menswear at H&M?
                        </b>
                        <p>
                            My role is mainly to analyse upcoming and current
                            menswear fashion and what we believe our customers
                            would like to buy and to wear. My responsibility is
                            to perceive the fashion to our different designers
                            and the different menswear teams. My ambition is
                            always that our visions should be clearly presented
                            in our stores and visible on the streets. My job is
                            to encourage our teams to design and to deliver the
                            best men’s fashion to our stores.
                        </p>
                        <b css={questionCSS}>
                            When analysing are you looking at the market or
                            men’s fashion trends?
                        </b>
                        <p>
                            I look into our own stores and I do look at
                            competitors and other concepts to make sure that we
                            are right on track with current and coming men’s
                            clothing collections. I also look at what the guys
                            on the street are wearing. I follow the catwalks to
                            look for new tendencies and directions. It is often
                            new concepts that I find most inspiring. It could be
                            a specific store, a movie or an album. The
                            combination of great creativity and profitability
                            are often the most inspiring for me.
                        </p>
                        <b css={questionCSS}>
                            You get inspiration from the street. Do you look at
                            what clothes men are wearing?
                        </b>
                        <p>
                            It’s interesting because for me that is the result
                            of being successful, when you see someone on the
                            street wearing something from our collections. How
                            does the guy on the street wear our collections
                            compared to how we present it? I really get inspired
                            from people wearing strong and individual looks.
                            That is often a mix of high end design with high
                            street and vintage. One of my biggest interests is
                            really to study people and to get an understanding
                            of them. I am an analyser and I am constantly
                            thinking of our potential customers and their ideas
                            on how to wear men’s clothes and what affects them
                            to wear them in a specific way.
                        </p>
                        <b css={questionCSS}>
                            Are you predicting the men’s fashion trend for next
                            year?
                        </b>
                        <p>
                            We are a fashion company so we design current
                            fashion that we present as different fashion
                            stories. Working with fashion you need to predict
                            what is next as well as paying respect to what is
                            happening now. You don’t challenge yourself or your
                            customers if you just put all existing trends on the
                            table and are happy doing what you believe everyone
                            else in the industry would do. My job is to put
                            analysed trends into an H&M context and constantly
                            provide our customers with current fashion.
                        </p>
                        <b css={questionCSS}>
                            How would you describe H&M menswear to a new
                            customer?
                        </b>
                        <p>
                            We are a fashion company offering our customers
                            current men’s clothes in good quality and at a great
                            price. Our strength is that we do have several
                            different concepts enabling us to offer fashion for
                            everyone, from basic fashion to latest fashion. If
                            you are insecure about your style you should always
                            be able to find something at H&M.
                        </p>
                        <b css={questionCSS}>
                            What are the upcoming men’s clothing trends that you
                            see applicable for H&M?
                        </b>
                        <p>
                            I'd say the following tendencies and directions are
                            most crucial. Modern Icons – Classic but updated
                            menswear pieces that often provide a foundation for
                            the male wardrobe. A classic men’s winter coat or
                            bomber jacket, a white shirt, the black or navy mens
                            suit, a crew neck camel sweater or a just a pair of
                            denims in a new wash and silhouette. The Uniform
                            Trend – A trend we see increasing. Uniform inspired
                            colors, details, materials and silhouettes is really
                            in fashion. Athleisure – Sportswear will continue to
                            inspire the modern man and mixing formalwear with
                            sportswear to create a comfortable yet stylish look.
                        </p>
                        <b css={questionCSS}>
                            What is the difference in the interest levels from
                            men in fashion compared to when you started?
                        </b>
                        <p>
                            I can see a quite drastic change. I believe that
                            competition has changed both the market and the male
                            customer. It is so much easier to get access to
                            great fashion, both in stores and online. I see that
                            men are much more experimental with fashion today
                            and are using men’s clothing as a way to express
                            themselves.
                        </p>
                    </div>
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

const insightsCSS = css`
    text-align: center;
    margin: 1rem 0;
`;

const questionCSS = css`
    display: inline-block;
    width: 100%;
    text-align: center;
    margin: 1rem 0 0;
`;

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
