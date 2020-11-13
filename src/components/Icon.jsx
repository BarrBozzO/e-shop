import React from "react";
import dynamic from "next/dynamic";
import { css } from "@emotion/core";

function Icon({ name, size = 20, ...otherProps }) {
  const IconModule = dynamic(() =>
    import(`react-svg-loader!icons/${name}.svg`)
  );

  return (
    <IconModule
      css={css`
        display: block;
        width: ${size}px;
        height: ${size}px;
      `}
      {...otherProps}
    />
  );
}
export default Icon;
