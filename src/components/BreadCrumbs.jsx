import React from "react";
import { css } from "@emotion/core";
import Link from "next/link";

function BreadCrumbs({ path }) {
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {path.map((segment) => (
        <div css={[pathElementCSS, segment.url ? linkCSS : null]}>
          {segment.url ? (
            <Link href={segment.url}>
              <a>{segment.text}</a>
            </Link>
          ) : (
            <span>{segment.text}</span>
          )}
        </div>
      ))}
    </div>
  );
}

const linkCSS = css`
  &:hover {
    color: #e50010;
  }
`;

const pathElementCSS = css`
  display: inline-block;
  white-space: nowrap;
  font-size: 11px;
  text-transform: capitalize;

  &:not(:first-child) {
    padding-left: 0.2rem;
    margin-left: 0.2rem;
    &:before {
      position: relative;
      left: -0.2rem;
      content: "/";
    }
  }
`;

export default BreadCrumbs;
