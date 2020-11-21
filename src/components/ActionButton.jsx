import React from "react";
import { css } from "@emotion/core";
import PropTypes from "prop-types";
import Icon from "components/Icon";

function ActionButton({ icon, label, onClick, css, ...remainingProps }) {
  const handleClick = (e) => {
    onClick(e);
  };

  return (
    <div onClick={handleClick} css={[btnCSS, css]} {...remainingProps}>
      {icon && (
        <Icon size={icon.size} name={icon.name} css={[iconCSS, icon.css]} />
      )}
      {label && <span css={labelCSS}>{label}</span>}
    </div>
  );
}

const labelCSS = css`
  display: inline-block;
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
  onClick: PropTypes.func.isRequired,
};

export default ActionButton;
