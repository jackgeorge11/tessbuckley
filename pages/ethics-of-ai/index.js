import React from "react";
import PostPreview from "../../components/PostPreview";
import Layout from "../../components/Layout";
import { createClient } from "contentful";

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN,
  });

  const posts = await client.getEntries({ content_type: "blogPost" });
  const blurb = await client.getContentType("blogPost");

  return {
    props: {
      posts: posts.items,
      blurb: blurb.description,
    },
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
