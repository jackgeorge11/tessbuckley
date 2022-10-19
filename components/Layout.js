import Link from "next/link";
import React, { useState } from "react";
import Nav from "./Nav";
import { useRouter } from "next/router";
import Head from "next/head";

export default function Layout({
  children,
  header,
  className,
  title,
  description,
  additional,
}) {
  const [open, setOpen] = useState(false);

  const path = useRouter().pathname.slice(1);

  return (
    <div className="layout">
      <Head>
        <title>{title ? `${title} | Tess Buckley` : "Tess Buckley"}</title>
        {description ? <meta name="description" content={description} /> : null}
        {additional?.length ? additional.map((tag) => tag) : null}
      </Head>
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
      <Nav open={open} setOpen={setOpen} path={path}>
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
