import React from "react";
import Layout from "../../components/Layout";
import { client, staticPages } from "../../tools/ContentfulClient";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import dayjs from "dayjs";

export const getStaticProps = async ({ params }) => {
  const resources = await client.getEntries({ content_type: "resource" });
  const blurbs = await staticPages();

  return {
    props: {
      resources: resources.items.sort(
        (a, b) => dayjs(b.fields.date) - dayjs(a.fields.date)
      ),
      blurb: blurbs.blurbResources || null,
      description: blurbs.seoDescriptionResources || null,
    },
    revalidate: 60,
  };
};

export default function Index({ resources, blurb, description }) {
  return (
    <Layout
      header={blurb}
      className="resources-page"
      title="Resources"
      description={description}
    >
      {resources?.length ? (
        resources.map((r, i) => (
          <div className="resource" key={i}>
            <div className="resource-title">
              {r.fields.url ? (
                <a
                  href={r.fields.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h2>{r.fields.title}</h2>
                </a>
              ) : (
                <h2>{r.fields.title}</h2>
              )}
              <div className="line"></div>
            </div>
            {documentToReactComponents(r.fields.description)}
          </div>
        ))
      ) : (
        <h4 className="--muted">There are no resources.</h4>
      )}
    </Layout>
  );
}
