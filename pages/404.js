import React from "react";
import Layout from "../components/Layout";
import { staticPages } from "../tools/ContentfulClient";

export const getStaticProps = async () => {
  const items = await staticPages();

  return {
    props: {
      blurb: items.blurb404,
    },
    revalidate: 1,
  };
};

export default function fourOhFour({ blurb }) {
  return (
    <Layout header={blurb} className="page-not-found">
      <h4>404{"   "}</h4>
      <p className="--muted">(page not found)</p>
    </Layout>
  );
}
