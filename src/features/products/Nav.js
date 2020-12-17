import React, { Fragment } from 'react';
import { css } from '@emotion/core';
import { mobileDevice } from 'styles/utils';
import NavLink from 'components/NavLink';

function Nav({ links }) {
    return (
        <aside css={asideCSS}>
            <nav css={navCSS}>
                {links.map((linkGroup) => {
                    return (
                        <ul css={listCSS}>
                            <li
                                css={{
                                    fontSize: '1.2rem',
                                    marginBottom: '1rem',
                                    fontWeight: '700'
                                }}
                            >
                                {linkGroup.label}
                            </li>
                            <ul
                                css={{
                                    display: 'block',
                                    paddingLeft: '0'
                                }}
                            >
                                {linkGroup.links.map((link) => {
                                    return (
                                        <li>
                                            {link.url ? (
                                                <NavLink
                                                    href={link.url}
                                                    linkCSS={{
                                                        '&:hover': {
                                                            color: '#e50010',
                                                            textDecoration:
                                                                'underline'
                                                        },
                                                        lineHeight: '1.6rem'
                                                    }}
                                                    activeCSS={{
                                                        color: '#e50010'
                                                    }}
                                                >
                                                    <span
                                                        dangerouslySetInnerHTML={{
                                                            __html: link.label
                                                        }}
                                                    />
                                                </NavLink>
                                            ) : (
                                                <Fragment>
                                                    <span
                                                        css={{
                                                            verticalAlign:
                                                                'middle',
                                                            color: '#222',
                                                            opacity: '0.4',
                                                            lineHeight: '1.6rem'
                                                        }}
                                                        dangerouslySetInnerHTML={{
                                                            __html: link.label
                                                        }}
                                                    />
                                                    <span
                                                        css={{
                                                            display:
                                                                'inline-block',

                                                            color: '#e50010',
                                                            fontSize: '0.6rem',
                                                            lineHeight: '1',
                                                            letterSpacing:
                                                                '1px',
                                                            verticalAlign:
                                                                'middle',
                                                            marginLeft:
                                                                '0.6rem',
                                                            fontWeight: '700'
                                                        }}
                                                    >
                                                        COMING SOON
                                                    </span>
                                                </Fragment>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        </ul>
                    );
                })}
            </nav>
        </aside>
    );
}

const asideCSS = css`
    padding-right: 2rem;

    ${mobileDevice(css`
        width: 100%;
        padding-right: 0;
        margin-top: 2rem;
    `)}
`;

const navCSS = css`
    width: 100%;
`;

const listCSS = css`
    display: block;
    padding-left: 0;
    margin-bottom: 1rem;

    ${mobileDevice(css`
        width: 100%;
    `)}
`;

export default Nav;
