import React, { useRef, useLayoutEffect } from 'react';
import Icon from 'components/Icon';

function Preloader({ cssParams, size = 16 }) {
    const iconRef = useRef(null);

    useLayoutEffect(() => {
        if (!iconRef.current) return;

        iconRef.current.animate(
            [
                // keyframes
                { transform: 'rotate(0)' },
                { transform: 'rotate(360deg)' }
            ],
            {
                // timing options
                duration: 1000,
                iterations: Infinity
            }
        );
    }, [iconRef.current]);

    return (
        <div
            css={[
                {
                    display: 'inline-block',
                    width: '16px',
                    height: '16px',
                    fill: '#ffffff',
                    verticalAlign: 'top'
                },
                cssParams
            ]}
            ref={iconRef}
        >
            <Icon size={size} name="loading-circle" />
        </div>
    );
}

export default Preloader;
