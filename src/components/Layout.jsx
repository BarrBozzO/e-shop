import React from "react";
import Link from "next/link";
import Header from "components/Header";

function Layout({ children }) {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <footer
        css={{
          height: "100px",
          backgroundColor: "#faf9f8",
        }}
      >
        Footer
      </footer>
    </div>
  );
}

export default Layout;
