import React from 'react';
import Link from 'next/link';
import Header from 'components/Header';
import Footer from 'components/Footer';

function Layout({ children, minimal, back }) {
    return (
        <div
            css={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh'
            }}
        >
            <Header minimal={minimal} back={back} />
            <main
                css={{
                    flex: '1 0 auto',
                    padding: '0 2rem'
                }}
            >
                {children}
            </main>
            <Footer />
        </div>
    );
}

export default Layout;
