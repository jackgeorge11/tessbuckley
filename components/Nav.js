import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export default function Nav({ children }) {
  const path = useRouter().pathname.slice(1);
  return (
    <nav>
      <h1>{children}</h1>
      <Link href="ethics-of-ai" passHref={true}>
        <a className={path === "ethics-of-ai" ? "disabled" : ""}>
          Ethics of AI
        </a>
      </Link>
      <Link href="publications" passHref={true}>
        <a className={path === "publications" ? "disabled" : ""}>
          Publications
        </a>
      </Link>
      <Link href="music" passHref={true}>
        <a className={path === "music" ? "disabled" : ""}>Music</a>
      </Link>
      <br />
      <Link href="about" passHref={true}>
        <a className={path === "about" ? "disabled" : ""}>About</a>
      </Link>
      <Link href="contact" passHref={true}>
        <a className={path === "contact" ? "disabled" : ""}>Contact</a>
      </Link>
      <p className="--muted thin">© 2022 by Tess Buckley</p>
    </nav>
  );
}
