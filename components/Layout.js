import React from "react";
import Nav from "./Nav";

export default function Layout({ children, header, className }) {
  return (
    <div className="layout">
      <div className="header">
        <h1 className="thick">Tess Buckley</h1>
        <div className="line"></div>
      </div>
      <Nav>{header}</Nav>
      <main className={className}>{children}</main>
      <div className="footer">
        <div className="line"></div>
        <h4 className="--muted">Home</h4>
      </div>
    </div>
  );
}
