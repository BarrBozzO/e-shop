import React, { Fragment, useState } from 'react';
import { css } from '@emotion/core';
import Link from 'next/link';
import { Icon } from 'components';
import { AuthDialog } from 'features/user';
import Actions from './Actions';

function Header({ minimal, back }) {
    const [displayAuth, setDisplayAuth] = useState(false);

    return (
        <Fragment>
            <header
                css={{
                    width: '100%',
                    'z-index': 1000,
                    padding: '16px'
                }}
            >
                <div
                    css={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        position: 'relative'
                    }}
                >
                    {back && (
                        <Link href={back.url}>
                            <a
                                css={{
                                    display: 'inline-flex',
                                    marginRight: 'auto'
                                }}
                            >
                                <span>←</span>
                                <span>{back.label}</span>
                            </a>
                        </Link>
                    )}
                    <Link href={'/'}>
                        <a>
                            <Icon
                                name="logo"
                                css={{
                                    width: '68px',
                                    height: '44px',
                                    position: 'absolute',
                                    right: '50%',
                                    top: '0',
                                    transform: 'translateX(50%)'
                                }}
                            />
                        </a>
                    </Link>
                    <Actions
                        minimal={minimal}
                        handleDisplayAuth={() => setDisplayAuth(true)}
                    />
                </div>
                {!minimal && (
                    <nav
                        css={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: '3rem'
                        }}
                    >
                        <Link href="/products/women">
                            <a css={linkCSS}>Women</a>
                        </Link>
                        <Link href="/products/men">
                            <a css={linkCSS}>Men</a>
                        </Link>
                        <Link href="/products/kids">
                            <a css={linkCSS}>Kids</a>
                        </Link>
                        {/* <Link href="/sale"> */}
                        <span css={[linkCSS, disabledLinkCSS]}>H&M Home</span>
                        {/* </Link> */}
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

const linkCSS = css`
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
