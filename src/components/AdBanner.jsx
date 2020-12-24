import React from 'react';
import Link from 'next/link';

function AdBanner() {
    return (
        <article
            css={{
                backgroundColor: '#C9002E',
                padding: '2rem',
                fontSize: '2rem',
                textAlign: 'center',
                display: 'flow-root',
                margin: '1rem 0',
                color: '#fff'
            }}
        >
            <h3>
                Member early access: 30% off
                <br />
                everything online &amp; in-store!
            </h3>

            <p
                css={{
                    margin: '1rem 0',
                    fontSize: '0.8rem',
                    fontWeight: '700'
                }}
            >
                Discount automatically applies when you’re signed in. Not a
                member?{' '}
                <Link href={'/register'}>
                    <a
                        css={{
                            textDecoration: 'underline'
                        }}
                    >
                        Join now!
                    </a>
                </Link>
            </p>
        </article>
    );
}

export default AdBanner;
