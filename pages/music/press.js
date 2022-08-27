import React from "react";
import Layout from "../../components/Layout";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import dayjs from "dayjs";
import { client } from "../../tools/ContentfulClient";

export async function getStaticProps() {
  const blurb = await client.getContentType("musicPress");
  const press = await client.getEntries({ content_type: "musicPress" });
  const sortedPress = press.items.sort(
    (a, b) => new Date(a.fields.date) - new Date(b.fields.date)
  );

  return {
    props: {
      press: sortedPress,
      blurb: blurb.description,
    },
    revalidate: 1,
  };
}

export default function Events({ press, blurb }) {
  return (
    <Layout header={blurb} className={"press-page"}>
      {press?.length ? (
        press.map((p, i) => (
          <div className="piece" key={i}>
            <h2>
              <a href={p.fields.url} target="_blank" rel="noopener noreferrer">
                {p.fields.title}
              </a>
            </h2>
            <p className="--muted">
              {dayjs(p.fields.date).format("MMMM DD, YYYY")}
            </p>
            {documentToReactComponents(p.fields.description)}
          </div>
        ))
      ) : (
        <h4>No press.</h4>
      )}
    </Layout>
  );
}
