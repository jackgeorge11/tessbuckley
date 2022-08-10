import Link from "next/link";
import React, { useState } from "react";
import { MemoizedPalette } from "./Palette";

export default function BlogPost({ post }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="blog-post" onClick={() => setExpanded((prev) => !prev)}>
      <div className="top">
        <div className="info">
          <Link href="/ethics-of-ai/example" passHref={true}>
            <a>{post.title}</a>
          </Link>
          <p>
            {post.date} <span style={{ padding: "0 .15rem" }}>•</span> 25 minute
            read
          </p>
        </div>
        <MemoizedPalette />
      </div>
      <h4 className={expanded ? "is--active" : ""}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ullamcorper a lacus
        vestibulum sed arcu. Viverra nibh cras pulvinar mattis. Convallis
        convallis tellus id interdum velit laoreet. Turpis in eu mi bibendum
        neque egestas congue. Duis ut diam quam nulla porttitor massa id neque
        aliquam. At tempor commodo ullamcorper a lacus vestibulum sed. Amet est
        placerat in egestas erat. Velit aliquet sagittis id consectetur purus ut
        faucibus pulvinar elementum. Orci a scelerisque purus semper eget.
        Consectetur lorem donec massa sapien. Nisi scelerisque eu ultrices vitae
        auctor eu augue ut. Odio euismod lacinia at quis risus. Habitasse platea
        dictumst vestibulum rhoncus est pellentesque elit. In iaculis nunc sed
        augue. Leo vel fringilla est ullamcorper eget nulla facilisi. Sed
        euismod nisi porta lorem mollis aliquam.
        <br />
        Diam phasellus vestibulum lorem sed risus ultricies. Leo duis ut diam
        quam nulla porttitor. Eget nullam non nisi est. Eu nisl nunc mi ipsum
        faucibus vitae. Eu consequat ac felis donec. At imperdiet dui accumsan
        sit amet nulla facilisi morbi tempus. Cursus vitae congue mauris rhoncus
        aenean vel elit. At elementum eu facilisis sed odio morbi. Habitant
        morbi tristique senectus et netus et. Ac turpis egestas integer eget.
        Sagittis eu volutpat odio facilisis mauris sit amet massa. Diam volutpat
        commodo sed egestas egestas. Auctor urna nunc id cursus metus aliquam
        eleifend. Ac felis donec et odio pellentesque diam volutpat commodo. Et
        tortor consequat id porta nibh venenatis. Cursus turpis massa tincidunt
        dui ut ornare lectus sit. In hac habitasse platea dictumst quisque.
        <br />
        Gravida quis blandit turpis cursus in hac. Urna porttitor rhoncus dolor
        purus non enim praesent. Pellentesque id nibh tortor id aliquet. Nullam
        eget felis eget nunc lobortis mattis aliquam. Adipiscing commodo elit at
        imperdiet dui. Sed sed risus pretium quam vulputate dignissim
        suspendisse in est. Purus faucibus ornare suspendisse...{" "}
        <Link href="/ethics-of-ai/example" passHref={true}>
          <a>continue reading</a>
        </Link>
        <br />
      </h4>
    </article>
  );
}
