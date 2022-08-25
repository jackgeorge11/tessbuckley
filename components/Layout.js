import Link from "next/link";
import React, { useState } from "react";
import Nav from "./Nav";

export default function Layout({ children, header, className }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="layout">
      <div className="header">
        <button
          className={
            open
              ? "hamburger hamburger--arrowalt is-active"
              : "hamburger hamburger--arrowalt"
          }
          type="button"
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className="hamburger-box">
            <span className="hamburger-inner"></span>
          </span>
        </button>
        <h1 className="thick">
          <Link href="/" passHref={true}>
            <a>Tess Buckley</a>
          </Link>
        </h1>
        <div className="line"></div>
      </div>
      <Nav open={open} setOpen={setOpen}>
        {header}
      </Nav>
      <main className={className}>{children}</main>
      <div className="footer">
        <div className="line"></div>
        {/* <h4 className="--muted">Home</h4> */}
      </div>
    </div>
  );
}
