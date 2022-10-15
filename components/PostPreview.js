import Link from "next/link";
import React, { useState } from "react";
import { MemoizedPalette } from "./Palette";
import dayjs from "dayjs";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";

const options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      return (
        <img
          src={node.data.target.fields.file.url}
          alt={node.data.target.fields.description}
        />
      );
    },
  },
};

export default function PostPreview({ post }) {
  const [expanded, setExpanded] = useState(false);

  const postString = post.blogBody.content.reduce((words, e) => {
    return words + e.content[0]?.value + "\n\n";
  }, "");

  return (
    <article
      className={expanded ? "post-preview is--active" : "post-preview"}
      onClick={() => setExpanded((prev) => !prev)}
    >
      <div className="top">
        <div className="info">
          <h2>
            <Link href={`/blog/${post.slug}`} passHref={true}>
              <a onClick={(e) => e.stopPropagation()}>{post.blogTitle}</a>
            </Link>
          </h2>
          <p>
            {dayjs(post.date).format("MMMM DD, YYYY")}{" "}
            <span style={{ padding: "0 .15rem" }}>•</span>{" "}
            <span className="--muted">
              {Math.ceil(postString?.length / 4.74 / 200)} minute read
            </span>
          </p>
        </div>
        <MemoizedPalette />
      </div>
      <div className={expanded ? "is--active preview" : "preview"}>
        {documentToReactComponents(post.blogBody, options)}
        {/* {postString.length > 1000 ? postString.slice(0, 1000) : postString}...{" "} */}
      </div>
      <Link href={`/blog/${post.slug}`} passHref={true}>
        <a
          className={expanded ? "is--active continue" : "continue"}
          onClick={(e) => e.stopPropagation()}
        >
          continue reading...
        </a>
      </Link>
    </article>
  );
}
