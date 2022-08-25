import React from "react";
import { createClient } from "contentful";
import Layout from "../../components/Layout";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import dayjs from "dayjs";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN,
});

export const getStaticPaths = async () => {
  const res = await client.getEntries({ content_type: "blogPost" });

  const paths = res.items.map((item) => {
    return {
      params: { slug: item.fields.slug },
    };
  });

  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }) => {
  const { items } = await client.getEntries({
    content_type: "blogPost",
    "fields.slug": params.slug,
  });

  return {
    props: { post: items[0].fields },
  };
};

const options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      return (
        <img
          src={`https://${node.data.target.fields.file.url}`}
          alt={node.data.target.fields.description}
        />
      );
    },
  },
};

export default function Post({ post }) {
  const { blurb, date, blogTitle, blogBody, references, accreditation } = post;

  return (
    <Layout header={blurb} className="post-page">
      <div className="post-info">
        <h1 className="title">{blogTitle}</h1>
        <p className="accreditation">
          {accreditation}
          <span className="divider">•</span>
          <span className="--muted">{dayjs(date).format("MMMM DD, YYYY")}</span>
        </p>
      </div>
      {documentToReactComponents(blogBody, options)}
      <h2 className="references">References</h2>
      {documentToReactComponents(references)}
    </Layout>
  );
}
