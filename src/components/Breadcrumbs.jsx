import React from 'react';
import Link from 'next/link';
import { css } from '@emotion/core';
import { mobileDevice } from 'styles/utils';

function Breadcrumbs({ path }) {
    return (
        <div css={containerCSS}>
            {path.map((segment) => (
                <div css={[pathElementCSS, segment.url ? linkCSS : null]}>
                    {segment.url ? (
                        <Link href={segment.url}>
                            <a>{segment.text}</a>
                        </Link>
                    ) : (
                        <span>{segment.text}</span>
                    )}
                </div>
            ))}
        </div>
    );
}

const containerCSS = css`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    ${mobileDevice(css`
        margin-top: 1rem;
    `)}
`;

const linkCSS = css`
    &:hover {
        color: #e50010;
    }
`;

const pathElementCSS = css`
    display: inline-block;
    white-space: nowrap;
    font-size: 11px;
    text-transform: capitalize;

    &:not(:first-child) {
        padding-left: 0.2rem;
        margin-left: 0.2rem;
        &:before {
            position: relative;
            left: -0.2rem;
            content: '/';
        }
    }
`;

export default Breadcrumbs;
