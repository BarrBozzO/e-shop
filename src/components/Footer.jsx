import React from 'react';
import Link from 'next/link';
import { css } from '@emotion/core';
import Icon from 'components/Icon';
import { mobileDevice } from 'styles/utils';

function Footer() {
    return (
        <footer css={footerCSS}>
            <div
                css={{
                    maxWidth: '960px',
                    margin: '0 auto'
                }}
            >
                <div css={columnsCSS}>
                    <div css={linksColumn}>
                        <h4>shop</h4>
                        <Link href="/products/women">
                            <a css={linkCSS}>Women</a>
                        </Link>
                        <Link href="/products/men">
                            <a css={linkCSS}>Men</a>
                        </Link>
                        <Link href="/products/kids">
                            <a css={linkCSS}>Kids</a>
                        </Link>
                    </div>
                    <div css={linksColumn}>
                        <h4>help</h4>
                        <Link href="/returns-and-refund">
                            <a css={linkCSS}>Return and refund policy</a>
                        </Link>
                        <Link href="/terms">
                            <a css={linkCSS}>Terms and conditions</a>
                        </Link>
                        <Link href="/privacy">
                            <a css={linkCSS}>Privacy Notice</a>
                        </Link>
                    </div>
                    <div css={linksColumn}>
                        <h4>Become a member</h4>
                        <p>Join now and get 10% off your next purchase!</p>
                        <Link href="/member">
                            <a css={[linkCSS, readMoreCSS]}>Read more →</a>
                        </Link>
                    </div>
                </div>
            </div>
            <div
                css={{
                    width: '200px',
                    margin: '2rem auto'
                }}
            >
                <Icon
                    name="full-logo"
                    css={{ width: '100%', height: '24px' }}
                />
            </div>
            <div
                css={{
                    textTransform: 'uppercase',
                    textAlign: 'center',
                    color: '#9a9a9a'
                }}
            >
                DEMO project for presentation only purposes
            </div>
        </footer>
    );
}

const footerCSS = css`
    padding: 72px 0 54px;
    background-color: rgb(228, 228, 228);

    ${mobileDevice(css`
        padding: 48px 0;
    `)}
`;

const linkCSS = css`
    display: block;
    margin-bottom: 1rem;
`;

const readMoreCSS = css`
    text-transform: uppercase;
    font-weight: 700;

    &:hover {
        color: #e50010;
    }
`;

const columnsCSS = css`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;

    ${mobileDevice(css`
        flex-direction: column;
        align-items: flex-start;
        width: 80%;
        margin: 0 auto;
    `)}
`;

const linksColumn = css`
    h4 {
        text-transform: uppercase;
        margin-bottom: 1rem;
    }

    & + & {
        margin-left: 2rem;
    }

    ${mobileDevice(
        css`
            & + & {
                margin-left: 0;
                margin-top: 1rem;
            }
        `
    )}
`;

export default Footer;
