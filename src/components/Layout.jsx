import React from 'react';
import { css } from '@emotion/core';
import { mobileDevice } from 'styles/utils';
import { Header, Footer } from 'components';
import { ToastContainer, toast } from 'react-toastify';

function Layout({ children, minimal, back }) {
    toast.configure();

    return (
        <div css={layoutCSS}>
            <Header minimal={minimal} back={back} />
            <main css={mainCSS}>{children}</main>
            <Footer />
            <ToastContainer
                position="top-center"
                autoClose={5000}
                newestOnTop
                closeOnClick
                rtl={false}
                draggable={false}
            />
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

const toastsCSS = css`
    position: fixed;
    z-index: 2000;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
`;

export default Layout;
