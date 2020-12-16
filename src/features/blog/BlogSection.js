import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { css } from '@emotion/core';
import { mobileDevice } from 'styles/utils';

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
        <section css={sectionCSS}>
            <h2
                css={{
                    textAlign: 'center',
                    fontSize: '3rem',
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
            <div css={itemsCSS}>
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

const sectionCSS = css`
    display: flow-root;
    background-color: #f4eddd;
    margin: 0 -2rem;
    padding: 4rem;

    ${mobileDevice(css`
        margin: 0 -1rem;
        padding: 3rem;
    `)}
`;

const itemsCSS = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 3rem 0;

    ${mobileDevice(
        css`
            flex-direction: column;
            margin: 3rem 0 0;
        `
    )}
`;

const itemCSS = css`
    flex: 1 0 calc(33% - 1rem);
    max-width: 310px;
    margin: 0 0.5rem;
    min-height: 300px;
    background-color: #ffffff;

    ${mobileDevice(
        css`
            flex: auto;
            max-width: none;
            width: 100%;

            & + & {
                margin-top: 1rem;
            }
        `
    )}
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
