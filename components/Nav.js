import Link from "next/link";
import React from "react";

export default function Nav({ children, open, path }) {
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
      <div className="socials">
        <a
          href="https://www.linkedin.com/in/tess-buckley-a9580b166/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className="icon" src="/linkedin.png" alt="LinkedIn Logo" />
        </a>
        <a
          href="https://twitter.com/tesssbuckley"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className="icon" src="/twitter.png" alt="Twitter Logo" />{" "}
        </a>
        <a
          href="https://open.spotify.com/artist/63NPLqRR2b0712ln4oK4zW?si=-Jobq82bRNq-kCe4qBpa6g"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className="icon" src="/spotify.png" alt="Spotify Logo" />{" "}
        </a>
        <a
          href="https://www.youtube.com/user/tessbuckleysings"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className="icon" src="/youtube.png" alt="Youtube Logo" />{" "}
        </a>
      </div>
    </nav>
  );
}
