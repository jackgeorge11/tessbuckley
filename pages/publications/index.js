import React from "react";
import Layout from "../../components/Layout";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { client } from "../../tools/ContentfulClient";

export const getStaticProps = async ({ params }) => {
  const publications = await client.getEntries({ content_type: "publication" });
  const blurb = await client.getContentType("publication");

  return {
    props: {
      publications: publications.items,
      blurb: blurb.description,
      revalidate: 1,
    },
  };
};

export default function Index({ publications, blurb }) {
  console.log(publications);
  return (
    <Layout header={blurb} className="publications">
      {publications?.length ? (
        publications.map((p, i) => (
          <h2 className={i % 2 ? "publication right" : "publication"} key={i}>
            {documentToReactComponents(p.fields.citation)}
          </h2>
        ))
      ) : (
        <h4 className="--muted">There are no publications.</h4>
      )}
    </Layout>
  );
}
