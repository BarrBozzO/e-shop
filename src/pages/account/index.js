import React, { useState, useMemo } from 'react';
import useSWR from 'swr';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react';
import { stringify } from 'qs';
import { css } from '@emotion/core';
import Layout from 'components/Layout';
import ActionButton from 'components/ActionButton';
import { useUser } from 'features/user';
import Button from 'components/Button';

const Account = observer(() => {
    const router = useRouter();
    const { user, logout } = useUser();

    if (!user && typeof window !== 'undefined') {
        router.replace('/');
    }

    return (
        <Layout>
            <Head>
                <title>My Account</title>
            </Head>
            <div
                css={{
                    display: 'flex',
                    alignItems: 'flex-start'
                }}
            >
                <section
                    css={{
                        flex: '0 0 314px',
                        padding: '0 14px 0 0',
                        textAlign: 'left'
                    }}
                >
                    <div css={profileCSS}>
                        <span css={profileEmailCSS}>{user.email}</span>
                        <div css={profilePointsCSS}>
                            <span>0 points</span>
                            <p>
                                You’re 200 points away from your next reward and
                                500 points are needed to become a Plus member.
                                Vouchers are issued 30 days after they are
                                earned.
                            </p>
                        </div>
                        <Button css={viewIdCSS}>VIEW MEMBER ID</Button>
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
                            <ActionButton label={'Sign Out'} onClick={logout} />
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
                        <div>No purchases made</div>
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
`;

const insightsItemCSS = css`
    padding: 1rem 2rem;
    background-color: #ffffff;

    & + & {
        margin-top: 1rem;
    }

    h3 {
        margin-top: 0;
    }
`;

export default Account;
