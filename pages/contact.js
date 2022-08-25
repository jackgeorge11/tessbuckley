import React from "react";
import Layout from "../components/Layout";
import { staticPages } from "../tools/ContentfulClient";

export const getStaticProps = async () => {
  const items = await staticPages();

  return {
    props: {
      blurb: items.blurbContact,
    },
  };
};

export default function Contact({ blurb }) {
  return (
    <Layout header={blurb}>
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
