import React, { Fragment, useState } from 'react';
import { css } from '@emotion/core';
import Link from 'next/link';
import { Icon } from 'components';
import { AuthDialog } from 'features/user';
import Actions from './Actions';
import { mobileDevice } from 'styles/utils';

function Header({ minimal, back }) {
    const [displayAuth, setDisplayAuth] = useState(false);

    return (
        <Fragment>
            <header css={headerCSS}>
                <div
                    css={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        position: 'relative'
                    }}
                >
                    {back && (
                        <Link href={back.url}>
                            <a css={backCSS}>
                                <span>←</span>
                                <span>{back.label}</span>
                            </a>
                        </Link>
                    )}
                    <Link href={'/'}>
                        <a>
                            <Icon name="logo" css={logoCSS} />
                        </a>
                    </Link>
                    <Actions
                        minimal={minimal}
                        handleDisplayAuth={() => setDisplayAuth(true)}
                    />
                </div>
                {!minimal && (
                    <nav css={navCSS}>
                        <Link href="/products/women">
                            <a css={navLinkCSS}>Women</a>
                        </Link>
                        <Link href="/products/men">
                            <a css={navLinkCSS}>Men</a>
                        </Link>
                        <Link href="/products/kids">
                            <a css={navLinkCSS}>Kids</a>
                        </Link>
                        <span css={[navLinkCSS, disabledLinkCSS]}>
                            H&M Home
                        </span>
                    </nav>
                )}
            </header>
            <AuthDialog
                isOpen={displayAuth}
                onClose={() => setDisplayAuth(false)}
            />
        </Fragment>
    );
}

const backCSS = css`
    display: inline-flex;
    margin-right: auto;

    ${mobileDevice(css`
        max-width: 120px;

        span {
            display: inline-block;
            vertical-align: middle;
        }
    `)}
`;

const headerCSS = css`
    width: 100%;
    z-index: 1000;
    padding: 16px;

    ${mobileDevice(css`
        padding: 8px;
    `)}
`;

const logoCSS = css`
    width: 68px;
    height: 44px;
    position: absolute;
    right: 50%;
    top: 0;
    transform: translateX(50%);

    ${mobileDevice(css`
        width: 36px;
        height: 36px;
    `)}
`;

const navCSS = css`
    display: flex;
    justify-content: center;
    margin-top: 3rem;

    ${mobileDevice(
        css`
            width: 100%;
            margin: 2rem auto 0;
        `
    )}
`;

const navLinkCSS = css`
    margin: 0 0.6rem;
    font-size: 1rem;
    font-weight: 700;
    padding-bottom: 2px;
    color: rgb(74, 74, 74);
    text-transform: uppercase;
    user-select: none;

    &:hover {
        cursor: pointer;
        border-bottom: 2px solid rgb(34, 34, 34);
        padding-bottom: 0;
    }

    ${mobileDevice(css`
        flex: 1 0 25%;
        margin: 0;
        padding: 0;
        text-align: center;
    `)}
`;

const disabledLinkCSS = css`
    opacity: 0.6;

    &:hover {
        cursor: default;
        border-bottom: none;
        padding-bottom: 0;
    }
`;

export default Header;
