import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { css } from '@emotion/core';
import { mobileDevice } from 'styles/utils';
import { Layout } from 'components';
import BlogSection from 'features/blog/BlogSection';

function Home() {
    return (
        <Layout>
            <Head>
                <title>H&M</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <section css={sectionCSS}>
                <div css={demoCSS}>
                    DEMO PROJECT FOR PRESENTATION ONLY PURPOSES
                </div>
                <div css={featuresCSS}>
                    <div css={featureItemCSS}>
                        Attn: all orders will take 12-15 business days to be
                        delivered
                    </div>

                    <div css={featureItemCSS}>Free Shipping Over $40</div>

                    <div css={featureItemCSS}>Become a Loyalty Member</div>
                </div>
            </section>
            <section css={sectionCSS}>
                <article css={seoBlockCSS}>
                    <Image
                        css={{
                            zIndex: '1'
                        }}
                        src="/imgs/kids-promo.jpeg"
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
                            <span>Festive fashion at great prices</span>
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
                </article>
            </section>
            <section css={sectionCSS}>
                <article css={seoSecondaryBlockCSS}>
                    <div
                        css={{
                            display: 'block',
                            textAlign: 'center',
                            color: '#fff',
                            marginBottom: '2rem'
                        }}
                    >
                        <h3>
                            Christmas attitude
                            <span>Time to choose presents!</span>
                        </h3>
                    </div>

                    <div
                        css={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Link href="/products/women/holiday">
                            <a css={seoSecondaryLinkCSS}>Women</a>
                        </Link>

                        <Link href="/products/men/holiday">
                            <a css={seoSecondaryLinkCSS}>Men</a>
                        </Link>

                        <Link href="/products/kids/holiday">
                            <a css={seoSecondaryLinkCSS}>Kids</a>
                        </Link>
                    </div>
                </article>
            </section>
            <section css={sectionCSS}>
                <article css={seoBlockCSS}>
                    <Image
                        css={{
                            zIndex: '1'
                        }}
                        src="/imgs/home-classic.jpeg"
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
                            Home Classic
                            <span>COMING SOON</span>
                        </h3>
                    </div>
                </article>
            </section>
            <BlogSection />
        </Layout>
    );
}

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
        line-height: 1;

        span {
            display: inline-block;
            width: 100%;
            font-size: 1rem;
            font-weight: 400;
        }

        ${mobileDevice(
            css`
                font-size: 3rem;
            `
        )}
    }
`;

const seoSecondaryBlockCSS = css`
    background-image: url(https://lp2.hm.com/hmgoepprod?source=url[https://www2.hm.com/content/dam/ladies_s02/november_2020/6022/6022-3x1-bring-on-the-future.jpg]&scale=size[960]&sink=format[jpeg],quality[80]);
    background-size: cover;
    padding: 2rem;

    h3 {
        font-weight: 700;
        font-size: 2rem;
        margin: 0;
        text-shadow: 0px 0px 20px rgba(0, 9, 84, 0.2);
        line-height: 1;

        span {
            display: inline-block;
            width: 100%;
            font-size: 1rem;
            font-weight: 400;
        }
    }
`;

const seoSecondaryLinkCSS = css`
    flex: 0 0 80px;
    text-align: center;
    border: 1px solid #fff;
    padding: 0.5rem 1rem;
    color: #fff;
    font-weight: 700;
    text-transform: uppercase;
    margin: 0 2rem;

    ${mobileDevice(
        css`
            margin: 0 1rem;
            background-color: rgba(0, 0, 0, 0.3);
        `
    )}
`;

const demoCSS = css`
    text-align: center;
    color: #e50010;
    margin-bottom: 2rem;

    ${mobileDevice(
        css`
            font-size: 0.8rem;
        `
    )}
`;

const sectionCSS = css`
    max-width: 960px;
    margin: 2rem auto;
`;

const featuresCSS = css`
    display: flex;
    align-items: center;
    justify-content: center;

    ${mobileDevice(css`
        flex-direction: column;
        font-size: 1rem;
    `)}
`;

const featureItemCSS = css`
    flex: 1 0 33%;
    text-align: center;

    ${mobileDevice(
        css`
            flex: 1 0 auto;
            & + & {
                margin-top: 1rem;
            }
        `
    )}
`;

export default Home;
