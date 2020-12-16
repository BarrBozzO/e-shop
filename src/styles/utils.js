import { css } from '@emotion/core';

const breakpoints = [576, 768, 992, 1200];

export const mobileDevice = (content) => {
    return css`
        @media (max-width: ${breakpoints[0]}px) {
            ${content}
        }
    `;
};
