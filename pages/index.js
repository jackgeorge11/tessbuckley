import Layout from "../components/Layout";
import { staticPages } from "../tools/ContentfulClient";

export const getStaticProps = async () => {
  const items = await staticPages();

  return {
    props: {
      blurb: items.blurbHome,
    },
  };
};

export default function Home({ blurb }) {
  return <Layout header={blurb}></Layout>;
}
