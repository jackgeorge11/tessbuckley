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
            {/* {p.authors ? `${p.authors}. ` : null}
            {p.title ? (
              <>
                <span className="--italic">{p.title}</span>
                {`. `}
              </>
            ) : null}
            {p.publication ? `${p.publication}. ` : null}
            {p.date ? `${p.date} .` : null}
            {p.url ? (
              <>
                (
                <a href={p.url} target="_blank" rel="noopener noreferrer">
                  {p.url}
                </a>
                ).
              </>
            ) : null} */}
          </h2>
        ))
      ) : (
        <h4 className="--muted">There are no publications.</h4>
      )}
    </Layout>
  );
}
