import React from "react";
import Layout from "../../components/Layout";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import dayjs from "dayjs";
import { client } from "../../tools/ContentfulClient";
import OpenGraphTags from "../../components/OpenGraphTags";
import Helmet from "react-helmet";

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
    revalidate: 60,
  };
};

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

export default function Post({ post }) {
  const {
    slug,
    blurb,
    date,
    blogTitle,
    blogBody,
    references,
    accreditation,
    seoDescription,
    seoImage,
  } = post;

  return (
    <Layout
      header={blurb}
      className="post-page"
      title={blogTitle}
      description={seoDescription}
    >
      <OpenGraphTags
        title={blogTitle}
        url={`https://tessbuckley.me/blog/${slug}`}
        description={seoDescription}
        type="article"
        image={seoImage?.fields.file.url}
      />
      <div className="post-info">
        <h1 className="title">{blogTitle}</h1>
        <p className="accreditation">
          {accreditation}
          <span className="divider">•</span>
          <span className="--muted">{dayjs(date).format("MMMM DD, YYYY")}</span>
        </p>
      </div>
      {documentToReactComponents(blogBody, options)}
      {references ? (
        <>
          <h2 className="references">References</h2>
          {documentToReactComponents(references)}
        </>
      ) : null}
    </Layout>
  );
}
