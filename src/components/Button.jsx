import React from "react";

function Button({
  onClick,
  children,
  secondary,
  link,
  type,
  disabled,
  ...remainingProps
}) {
  return (
    <button
      css={[
        buttonCSS,
        !secondary || secondaryCSS,
        !link || linkCSS,
        !disabled || disabledCSS,
      ]}
      onClick={onClick}
      type={type || "button"}
      disabled={disabled}
      {...remainingProps}
    >
      {children}
    </button>
  );
}

const buttonCSS = {
  display: "inline-block",
  width: "100%",
  margin: 0,
  padding: "10px 0",
  backgroundColor: "#222222",
  whiteSpace: "nowrap",
  fontSize: "1rem",
  fontWeight: "700",
  color: "#ffffff",
  border: "1px solid #222222",
  textTransform: "uppercase",
  cursor: "pointer",
};

const secondaryCSS = {
  color: "#222222",
  backgroundColor: "transparent",
};

const linkCSS = {
  width: "auto",
  paddingBottom: "0.2rem",
  color: "#222222",
  fontSize: "1rem",
  fontWeight: "normal",
  backgroundColor: "transparent",
  border: "none",
  textTransform: "none",
  borderBottom: "1px solid #222222",
};

const disabledCSS = {
  opacity: 0.6,
  cursor: "default",
};

export default Button;
