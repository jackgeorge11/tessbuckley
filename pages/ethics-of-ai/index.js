import React from "react";
import PostPreview from "../../components/PostPreview";
import Layout from "../../components/Layout";
import { client } from "../../tools/ContentfulClient";

export async function getStaticProps() {
  const posts = await client.getEntries({ content_type: "blogPost" });
  const blurb = await client.getContentType("blogPost");

  return {
    props: {
      posts: posts.items,
      blurb: blurb.description,
    },
    revalidate: 1,
  };
}

export default function EthicsOfAi({ posts, blurb }) {
  return (
    <Layout className="ethics-of-ai" header={blurb}>
      {posts.map((post, i) => (
        <PostPreview post={post.fields} key={i} />
      ))}
    </Layout>
  );
}
