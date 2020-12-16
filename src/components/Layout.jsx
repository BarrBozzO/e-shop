import React from 'react';
import { css } from '@emotion/core';
import { mobileDevice } from 'styles/utils';
import { Header, Footer } from 'components';

function Layout({ children, minimal, back }) {
    return (
        <div css={layoutCSS}>
            <Header minimal={minimal} back={back} />
            <main css={mainCSS}>{children}</main>
            <Footer />
        </div>
    );
}

const layoutCSS = css`
    display: flex;
    flex-direction: column;
`;

const mainCSS = css`
    flex: 1 0 auto;
    padding: 0 2rem;
    min-height: 80vh;

    ${mobileDevice(css`
        padding: 0 1rem;
    `)}
`;

export default Layout;
