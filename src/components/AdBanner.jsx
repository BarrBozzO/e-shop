import React from 'react';

function AdBanner() {
    return (
        <article
            css={{
                backgroundColor: '#ff2f00',
                padding: '0 15px 24px',
                fontSize: '2rem',
                textAlign: 'center',
                display: 'flow-root',
                margin: '1rem 0'
            }}
        >
            <h3>
                Member early access: 30% off
                <br />
                everything online &amp; in-store!
            </h3>

            <p
                css={{
                    fontSize: '0.8rem',
                    fontWeight: '700'
                }}
            >
                Discount automatically applies when you’re signed in. Not a
                member? Join now!
            </p>
        </article>
    );
}

export default AdBanner;
