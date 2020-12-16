import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react';
import { css } from '@emotion/core';
import { Layout, ActionButton, Preloader, Button } from 'components';
import { useUser } from 'features/user';
import { useOrderStats } from 'features/orders';
import { mobileDevice } from 'styles/utils';

const Account = observer(() => {
    const router = useRouter();
    const { user, initializing: userInitializing, logout } = useUser();
    const { data: orderStats, error: orderStatsError } = useOrderStats(
        user?.token
    );

    if (!user && !userInitializing && typeof window !== 'undefined') {
        router.replace('/');
    }

    const isLoadingStats = !orderStats && !orderStatsError;
    const email = user ? user.email : '';

    return (
        <Layout>
            <Head>
                <title>My Account</title>
            </Head>
            <div css={containerCSS}>
                <section
                    css={{
                        flex: '0 0 314px',
                        padding: '0 14px 0 0',
                        textAlign: 'left'
                    }}
                >
                    <div css={profileCSS}>
                        {userInitializing ? (
                            <Preloader cssParams={profileLoadingCSS} />
                        ) : (
                            <>
                                <span css={profileEmailCSS}>{email}</span>
                                <div css={profilePointsCSS}>
                                    <span>777 points</span>
                                    <p>
                                        You’re 200 points away from your next
                                        reward and 500 points are needed to
                                        become a Plus member. Vouchers are
                                        issued 30 days after they are earned.
                                    </p>
                                </div>
                                <Button css={viewIdCSS}>VIEW MEMBER ID</Button>
                            </>
                        )}
                    </div>
                    <h1>My Account</h1>
                    <ul css={linksListCSS}>
                        <li>
                            <Link href={'/account/purchases'}>
                                <a css={linkCSS}>All Purchases</a>
                            </Link>
                        </li>
                        <li>
                            <Link href={'/account/reviews'}>
                                <a css={linkCSS}>Reviews</a>
                            </Link>
                        </li>
                        <li>
                            <ActionButton
                                css={linkCSS}
                                label={'Sign Out'}
                                onClick={logout}
                            />
                        </li>
                    </ul>
                </section>
                <section
                    css={{
                        flex: '1 0 auto'
                    }}
                >
                    <div css={insightsItemCSS}>
                        <h3>Purchases</h3>
                        <div>
                            {isLoadingStats ? (
                                <Preloader />
                            ) : (
                                <div>
                                    <div css={purchaseStatItemCSS}>
                                        <span>Total</span>
                                        <span>{orderStats.data.total}</span>
                                    </div>
                                    <div css={purchaseStatItemCSS}>
                                        <span>Total Products</span>
                                        <span>{orderStats.data.items}</span>
                                    </div>
                                    <div css={purchaseStatItemCSS}>
                                        <span>Latest order</span>
                                        <span>
                                            {format(
                                                new Date(
                                                    orderStats.data.latest
                                                ),
                                                'mm/dd/yyyy'
                                            )}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div css={insightsItemCSS}>
                        <h3>Reviews</h3>
                        <div>No reviews</div>
                    </div>
                </section>
            </div>
        </Layout>
    );
});

const containerCSS = css`
    display: flex;
    align-items: flex-start;
    margin: 2rem auto;

    ${mobileDevice(css`
        flex-direction: column;
    `)}
`;

const viewIdCSS = css`
    display: block;
    width: 60%;
    margin: 1rem auto 0;
    background-color: transparent;
    font-weight: 700;
    color: #222;
`;

const profileCSS = css`
    display: flow-root;
    padding: 1.6rem;
    background-color: #f5e6e0;
    margin-bottom: 2rem;
`;

const profileLoadingCSS = css`
    fill: #222222;
`;

const profilePointsCSS = css`
    margin: 1rem 0;

    span {
        font-size: 2rem;
        font-weight: 700;
    }

    p {
        font-size: 0.8rem;
    }
`;

const profileEmailCSS = css`
    font-weight: 700;
`;

const linksListCSS = css`
    margin: 0.4rem 0;

    li {
        padding: 0.4rem 0;
        text-transform: uppercase;
    }

    ${mobileDevice(css`
        display: flex;

        li {
            flex: 1 0 auto;
            padding: 0;
        }
    `)}
`;

const linkCSS = css`
    display: block;
    width: 100%;
    position: relative;

    &:hover {
        color: #e50010;
    }

    &::after {
        position: absolute;
        top: 0;
        right: 0;
        content: '⟶';
    }

    ${mobileDevice(css`
        text-decoration: underline;

        span {
            text-decoration: underline;
        }

        &::after {
            content: '';
        }
    `)}
`;

const insightsItemCSS = css`
    padding: 1rem 2rem;
    background-color: #ffffff;

    & + & {
        margin-top: 1rem;
    }

    h3 {
        font-size: 1.8rem;
        margin-top: 0;
        margin-bottom: 1rem;
    }
`;

const purchaseStatItemCSS = css`
    width: 33%;
    display: inline-block;
    text-align: center;

    & > span:first-child {
        display: inline-block;
        width: 100%;
        font-size: 1rem;
        font-weight: 700;
        margin-bottom: 0.4rem;
        text-transform: uppercase;
    }

    & > span:last-child {
        color: #666;
        font-size: 1.2rem;
    }
`;

export default Account;
