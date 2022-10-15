import React from "react";
import Layout from "../components/Layout";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import { staticPages } from "../tools/ContentfulClient";

export const getStaticProps = async () => {
  const items = await staticPages();

  return {
    props: {
      blurb: items.blurbAbout || null,
      about: items.aboutDescription || null,
      description: items.seoDescriptionAbout || null,
    },
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

export default function About({ about, blurb, description }) {
  return (
    <Layout
      header={blurb}
      className="about"
      title="About"
      description={description}
    >
      {documentToReactComponents(about, options)}
    </Layout>
  );
}
