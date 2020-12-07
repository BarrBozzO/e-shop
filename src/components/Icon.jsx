import React from 'react';
import dynamic from 'next/dynamic';
import { css } from '@emotion/core';

function Icon({ name, size = 20, placeholder, ...otherProps }) {
    const IconModule = dynamic(
        () => import(`react-svg-loader!icons/${name}.svg`),
        {
            loading: placeholder
                ? placeholder
                : () => <div css={iconCSS(size)} />
        }
    );

    return <IconModule css={iconCSS(size)} {...otherProps} />;
}

const iconCSS = (size) => css`
    display: block;
    width: ${size}px;
    height: ${size}px;
`;

export default React.memo(Icon);
