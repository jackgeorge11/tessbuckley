import React from "react";
import Layout from "../components/Layout";
import { staticPages } from "../tools/ContentfulClient";

export const getStaticProps = async () => {
  const items = await staticPages();

  return {
    props: {
      blurb: items.blurbContact || null,
      description: items.seoDescriptionContact || null,
    },
    revalidate: 60,
  };
};

export default function Contact({ blurb, description }) {
  return (
    <Layout header={blurb} description={description} title="Contact">
      <form className="contact" action="" method="POST">
        <input type="text" placeholder="Name" />
        <input type="text" placeholder="Email" />
        <input type="text" placeholder="Phone Number (optional)" />
        <textarea placeholder="Message" rows={10} />
        <button type="submit">Send</button>
      </form>
    </Layout>
  );
}
