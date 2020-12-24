import React, { forwardRef } from 'react';
import { css } from '@emotion/core';
import PropTypes from 'prop-types';
import Icon from 'components/Icon';

function ActionButton(
    { icon, label, onClick, css, disabled, ...remainingProps },
    ref
) {
    const handleClick = (e) => {
        if (disabled) {
            return;
        }

        onClick(e);
    };

    return (
        <div
            ref={ref}
            onClick={handleClick}
            css={[btnCSS, disabled ? disabledCSS : null, css]}
            {...remainingProps}
        >
            {icon && (
                <Icon
                    size={icon.size}
                    name={icon.name}
                    css={[iconCSS, icon.css]}
                />
            )}
            {label && <span css={labelCSS}>{label}</span>}
        </div>
    );
}

const labelCSS = css`
    display: inline-block;
`;

const disabledCSS = css`
    opacity: 0.6;
    cursor: default;
`;

const btnCSS = css`
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
`;

const iconCSS = css`
    display: inline-block;
    margin-right: 0.4rem;
`;

ActionButton.propTypes = {
    icon: PropTypes.object,
    label: PropTypes.string,
    onClick: PropTypes.func.isRequired
};

export default forwardRef(ActionButton);
