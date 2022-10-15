import Head from "next/head";
import React from "react";

export default function OpenGraphTags({
  title,
  url,
  description,
  type,
  image,
}) {
  return (
    <Head>
      <meta property="og:title" content={title} key={1} />
      <meta property="og:site_name" content="Tess Buckley" key={2} />
      <meta property="og:url" content={url} key={3} />
      <meta property="og:description" content={description} key={4} />
      <meta property="og:type" content={type} key={5} />
      <meta property="og:image" content={`https:${image}`} key={6} />
    </Head>
  );
}
