import React, { Fragment } from 'react';
import Link from 'next/link';

function Nav({ links }) {
    return (
        <div>
            <aside
                css={{
                    paddingRight: '2rem'
                }}
            >
                <nav>
                    {links.map((linkGroup) => {
                        return (
                            <ul
                                css={{
                                    display: 'block',
                                    paddingLeft: '0'
                                }}
                            >
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
                                                    <Link href={link.url}>
                                                        <a
                                                            css={{
                                                                '&:hover': {
                                                                    color:
                                                                        '#e50010',
                                                                    textDecoration:
                                                                        'underline'
                                                                },
                                                                lineHeight:
                                                                    '1.6rem'
                                                            }}
                                                            dangerouslySetInnerHTML={{
                                                                __html:
                                                                    link.label
                                                            }}
                                                        />
                                                    </Link>
                                                ) : (
                                                    <Fragment>
                                                        <span
                                                            css={{
                                                                verticalAlign:
                                                                    'middle',
                                                                color: '#222',
                                                                opacity: '0.4',
                                                                lineHeight:
                                                                    '1.6rem'
                                                            }}
                                                            dangerouslySetInnerHTML={{
                                                                __html:
                                                                    link.label
                                                            }}
                                                        />
                                                        <span
                                                            css={{
                                                                display:
                                                                    'inline-block',

                                                                color:
                                                                    '#e50010',
                                                                fontSize:
                                                                    '0.6rem',
                                                                lineHeight: '1',
                                                                letterSpacing:
                                                                    '1px',
                                                                verticalAlign:
                                                                    'middle',
                                                                marginLeft:
                                                                    '0.6rem',
                                                                fontWeight:
                                                                    '700'
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
        </div>
    );
}

export default Nav;
