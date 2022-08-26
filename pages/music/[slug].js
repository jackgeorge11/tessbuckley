import React from "react";
import Layout from "../../components/Layout";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import { MemoizedPalette } from "../../components/Palette";
import { client } from "../../tools/ContentfulClient";

export const getStaticPaths = async () => {
  const res = await client.getEntries({ content_type: "musicRelease" });

  const paths = res.items.map((item) => {
    return {
      params: { slug: item.fields.slug },
    };
  });

  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }) => {
  const { items } = await client.getEntries({
    content_type: "musicRelease",
    "fields.slug": params.slug,
  });

  return {
    props: { release: items[0].fields },
    revalidate: 1,
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

export default function Post({ release }) {
  const {
    blurb,
    title,
    type,
    year,
    length,
    embedLink,
    feat,
    description,
    cover,
  } = release;

  console.log(cover);
  return (
    <Layout header={blurb} className="release-page">
      <div className="top">
        <img src={`https://${cover.fields.file.url}`} alt="" />
        <MemoizedPalette vertical={true} />
        <div className="info">
          <h1>{title}</h1>
          <h4 className="--muted">
            {type ? `${type} • ` : null}
            {year ? year : null}
          </h4>
          {release.with ? <h3>with {release.with}</h3> : null}
          {feat ? <h3>feat. {feat}</h3> : null}
        </div>
      </div>
      <iframe
        src={embedLink}
        width="100%"
        height={`${length ? length * 31 + 80 : 80}px`}
        frameBorder="0"
        allowFullScreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      ></iframe>
      {documentToReactComponents(description)}
    </Layout>
  );
}
