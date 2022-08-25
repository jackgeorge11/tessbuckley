import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export default function Nav({ children, open }) {
  const path = useRouter().pathname.slice(1);
  return (
    <nav className={path === "" || open ? "is--open" : ""}>
      <h3>{children}</h3>
      <h4>
        <Link href="/ethics-of-ai" passHref={true}>
          <a className={path === "ethics-of-ai" ? "disabled" : ""}>
            Ethics of AI
          </a>
        </Link>
      </h4>
      <h4>
        <Link href="/publications" passHref={true}>
          <a className={path === "publications" ? "disabled" : ""}>
            Publications
          </a>
        </Link>
      </h4>
      <h4>
        <Link href="/music" passHref={true}>
          <a className={path === "music" ? "disabled" : ""}>Music</a>
        </Link>
      </h4>
      <br />
      <h4>
        <Link href="/about" passHref={true}>
          <a className={path === "about" ? "disabled" : ""}>About</a>
        </Link>
      </h4>
      <h4>
        <Link href="/contact" passHref={true}>
          <a className={path === "contact" ? "disabled" : ""}>Contact</a>
        </Link>
      </h4>
      <p className="--muted thin">© 2022 by Tess Buckley</p>
    </nav>
  );
}