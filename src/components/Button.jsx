import React from "react";

function Button({ onClick, children, ...remainingProps }) {
  return (
    <button
      css={{
        display: "inline-block",
        width: "100%",
        margin: 0,
        padding: "10px 0",
        backgroundColor: "#222222",
        whiteSpace: "nowrap",
        fontSize: "1rem",
        fontWeight: "500",
        color: "#ffffff",
        border: 0,
        textTransform: "uppercase",
      }}
      onClick={onClick}
      {...remainingProps}
    >
      {children}
    </button>
  );
}

export default Button;
