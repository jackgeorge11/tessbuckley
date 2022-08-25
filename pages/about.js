import React from "react";
import Layout from "../components/Layout";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { staticPages } from "../tools/ContentfulClient";

export const getStaticProps = async () => {
  const items = await staticPages();

  return {
    props: {
      blurb: items.blurbAbout,
      about: items.aboutDescription,
    },
  };
};

export default function About({ about, blurb }) {
  return (
    <Layout header={blurb} className="about">
      {documentToReactComponents(about)}
    </Layout>
  );
}
