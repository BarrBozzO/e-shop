import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { css } from '@emotion/core';

const ReadTheStory = () => {
    return (
        <span
            css={{
                display: 'inline-block',
                width: '100%',
                textDecoration: 'underline',
                textAlign: 'center'
            }}
        >
            Read The Story
        </span>
    );
};

function BlogSection() {
    return (
        <section
            css={{
                display: 'flow-root',
                backgroundColor: '#f4eddd',
                margin: '0 -2rem',
                padding: '2rem'
            }}
        >
            <h2
                css={{
                    textAlign: 'center',
                    fontSize: '2rem',
                    textTransform: 'uppercase'
                }}
            >
                Magazine
            </h2>
            <Link href="/blog">
                <a
                    css={{
                        display: 'block',
                        margin: '0 auto',
                        width: '200px',
                        textAlign: 'center',
                        textTransform: 'uppercase',
                        textDecoration: 'underline'
                    }}
                >
                    Read The Magazine
                </a>
            </Link>
            <div
                css={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '2rem 0'
                }}
            >
                <div css={itemCSS}>
                    <Link href={'/blog/jeans'}>
                        <a css={itemLinkCSS}>
                            <div css={itemImgCSS}>
                                <Image src={'/imgs/jeans.jpeg'} layout="fill" />
                            </div>
                            <div>
                                <p
                                    css={{
                                        textAlign: 'center',
                                        fontWeight: '700'
                                    }}
                                >
                                    Conscious Exclusive A/W20
                                </p>
                                <ReadTheStory />
                            </div>
                        </a>
                    </Link>
                </div>
                <div css={itemCSS}>
                    <Link href={'/blog/jeans'}>
                        <a css={itemLinkCSS}>
                            <div css={itemImgCSS}>
                                <Image src={'/imgs/city.jpeg'} layout="fill" />
                            </div>
                            <div>
                                <p
                                    css={{
                                        textAlign: 'center',
                                        fontWeight: '700'
                                    }}
                                >
                                    Meet the changemakers
                                </p>
                                <ReadTheStory />
                            </div>
                        </a>
                    </Link>
                </div>
                <div css={itemCSS}>
                    <Link href={'/blog/jeans'}>
                        <a css={itemLinkCSS}>
                            <div css={itemImgCSS}>
                                <Image src={'/imgs/eco-2.jpeg'} layout="fill" />
                            </div>
                            <div>
                                <p
                                    css={{
                                        textAlign: 'center',
                                        fontWeight: '700'
                                    }}
                                >
                                    The Jeans Redesign project
                                </p>
                                <ReadTheStory />
                            </div>
                        </a>
                    </Link>
                </div>
            </div>
        </section>
    );
}

const itemCSS = css`
    flex: 1 0 calc(33% - 1rem);
    max-width: 310px;
    margin: 0 0.5rem;
    min-height: 300px;
    background-color: #ffffff;
`;

const itemLinkCSS = css`
    display: block;
    width: 100%;
    height: 100%;
`;

const itemImgCSS = css`
    width: 100%;
    padding-bottom: 66%;
    position: relative;
`;

export default BlogSection;
