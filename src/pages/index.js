import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from 'components/Layout';
import Button from 'components/Button';
import BlogSection from 'features/blog/BlogSection';

function Home() {
    return (
        <Layout>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <section
                css={{
                    marginBottom: '2rem',
                    fontSize: '1.2rem',
                    maxWidth: '960px',
                    margin: '2rem auto'
                }}
            >
                <div
                    css={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <div
                        css={{
                            flex: '1 0 33%',
                            textAlign: 'center'
                        }}
                    >
                        Attn: all orders will take 12-15 business days to be
                        delivered
                    </div>

                    <div
                        css={{
                            flex: '1 0 33%',
                            textAlign: 'center'
                        }}
                    >
                        Free Shipping Over $40
                    </div>

                    <div
                        css={{
                            flex: '1 0 33%',
                            textAlign: 'center'
                        }}
                    >
                        Become a Loyalty Member
                    </div>
                </div>
            </section>
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
                        <h3
                            css={{
                                fontSize: '3rem',
                                color: '#fff',
                                marginBottom: '1rem'
                            }}
                        >
                            Holiday Delights
                        </h3>
                        <p
                            css={{
                                color: '#fff',
                                textAlign: 'center'
                            }}
                        >
                            Festive fashion at great prices
                        </p>
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
            <section
                css={{
                    maxWidth: '960px',
                    margin: '2rem auto'
                }}
            >
                <article
                    css={{
                        backgroundImage:
                            'url(https://lp2.hm.com/hmgoepprod?source=url[https://www2.hm.com/content/dam/ladies_s02/november_2020/6022/6022-3x1-bring-on-the-future.jpg]&scale=size[960]&sink=format[jpeg],quality[80])',
                        backgroundSize: 'cover',
                        padding: '2rem'
                    }}
                >
                    <div
                        css={{
                            display: 'block',
                            textAlign: 'center',
                            color: '#fff'
                        }}
                    >
                        <h3
                            css={{
                                fontWeight: '700',
                                fontSize: '2rem',
                                margin: '0'
                            }}
                        >
                            Christmas attitude
                        </h3>

                        <p>Time to choose presents!</p>
                    </div>

                    <div
                        css={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Link href="/products/women/holiday">
                            <a
                                css={{
                                    border: '1px solid #fff',
                                    padding: '0.5rem 1rem',
                                    color: '#fff',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    margin: '0 2rem'
                                }}
                            >
                                Women
                            </a>
                        </Link>

                        <Link href="/products/men/holiday">
                            <a
                                css={{
                                    border: '1px solid #fff',
                                    padding: '0.5rem 1rem',
                                    color: '#fff',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    margin: '0 2rem'
                                }}
                            >
                                Men
                            </a>
                        </Link>

                        <Link href="/products/kids/holiday">
                            <a
                                css={{
                                    border: '1px solid #fff',
                                    padding: '0.5rem 1rem',
                                    color: '#fff',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    margin: '0 2rem'
                                }}
                            >
                                Kids
                            </a>
                        </Link>
                    </div>
                </article>
            </section>
            <BlogSection />
        </Layout>
    );
}

export default Home;
