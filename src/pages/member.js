import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Layout from 'components/Layout';
import Button from 'components/Button';
import { useUser, AuthDialog } from 'features/user';

function Member() {
    const [displayAuth, setDisplayAuth] = useState(false);
    const { user } = useUser();

    return (
        <Layout>
            <AuthDialog
                isOpen={displayAuth}
                onClose={() => setDisplayAuth(false)}
            />
            <Head>
                <title>H&M MEMBERSHIP</title>
            </Head>

            <h1
                css={{
                    textAlign: 'center',
                    margin: '2rem 0'
                }}
            >
                H&M MEMBERSHIP
            </h1>

            <section>
                <article
                    css={{
                        height: '569px',
                        backgroundImage: 'url(/imgs/hello-member.jpeg)',
                        backgroundSize: 'cover',
                        textAlign: 'center',
                        position: 'relative'
                    }}
                >
                    <div
                        css={{
                            position: 'absolute',
                            width: '100%',
                            top: '40%',
                            transform: 'translateY(-50%)'
                        }}
                    >
                        <h3
                            css={{
                                fontSize: '2.4rem'
                            }}
                        >
                            Shop now. Pay later.
                            <br />
                            Exclusively for Members
                        </h3>
                        <p
                            css={{
                                fontSize: '1.4rem'
                            }}
                        >
                            Try your items first and pay for them later.
                            <br />
                            Available online and in-store with the H&M app.
                        </p>
                        {!user && (
                            <div>
                                <Button
                                    css={{
                                        width: '200px',
                                        backgroundColor: '#fff',
                                        color: '#222'
                                    }}
                                    onClick={() => setDisplayAuth(true)}
                                >
                                    Become a member
                                </Button>
                            </div>
                        )}
                    </div>
                </article>
                <div
                    css={{
                        textAlign: 'center',
                        margin: '4rem 0'
                    }}
                >
                    <h2
                        css={{
                            margin: '2rem 0'
                        }}
                    >
                        EXCLUSIVE FOR MEMBERS
                    </h2>
                    <div
                        css={{
                            display: 'flex'
                        }}
                    >
                        <div
                            css={{
                                flex: '1 0 calc(33% - 1rem)',
                                margin: '0 0.5rem'
                            }}
                        >
                            <div
                                css={{
                                    position: 'relative',
                                    width: '100%',
                                    paddingBottom: '50%'
                                }}
                            >
                                <Image
                                    src={'/imgs/shop-pay.jpeg'}
                                    layout="fill"
                                />
                            </div>
                            <h3>SHOP NOW. PAY LATER.</h3>
                            <p>
                                Try your items first and pay for them later —
                                available when shopping both online and
                                in-store.
                            </p>
                        </div>
                        <div
                            css={{
                                flex: '1 0 calc(33% - 1rem)',
                                margin: '0 0.5rem'
                            }}
                        >
                            <div
                                css={{
                                    position: 'relative',
                                    width: '100%',
                                    paddingBottom: '50%'
                                }}
                            >
                                <Image src={'/imgs/earn.jpeg'} layout="fill" />
                            </div>
                            <h3>EARN POINTS</h3>
                            <p>
                                Earn points by shopping. Earn enough points and
                                become a Plus member with more perks and
                                benefits!
                            </p>
                        </div>
                        <div
                            css={{
                                flex: '1 0 calc(33% - 1rem)',
                                margin: '0 0.5rem'
                            }}
                        >
                            <div
                                css={{
                                    position: 'relative',
                                    width: '100%',
                                    paddingBottom: '50%'
                                }}
                            >
                                <Image
                                    src={'/imgs/rewards.jpeg'}
                                    layout="fill"
                                />
                            </div>
                            <h3>REWARDS</h3>
                            <p>
                                Every 200 points earned your will receive a $5
                                Reward to use on your next purchase!
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section
                css={{
                    margin: '2rem 0',
                    padding: '80px 34px',
                    backgroundColor: '#f5e6e0',
                    textAlign: 'center'
                }}
            >
                <div
                    css={{
                        maxWidth: '1144px'
                    }}
                >
                    <h2>As an H&M Member this is what you'll get:</h2>
                    <p>
                        - Points for shopping: $1 = 1 point, for every 200
                        points you will receive a $5 Reward - Exclusive Offers
                        and Discounts - Free Online Returns - Birthday Offer -
                        Shopping Events - Digital Receipts - Download the H&M
                        App for easy access to all your offers, rewards and
                        information on the go!
                    </p>
                </div>
            </section>
        </Layout>
    );
}

export default Member;
