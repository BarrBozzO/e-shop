import React from "react";
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
        <div>
          <Link href={segment.url}>
            <a>/{segment.text}</a>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default BreadCrumbs;
