import Layout from "../components/Layout";
import { staticPages } from "../tools/ContentfulClient";

export const getStaticProps = async () => {
  const items = await staticPages();

  return {
    props: {
      blurb: items.blurbHome,
      revalidate: 1,
    },
  };
};

export default function Home({ blurb }) {
  return <Layout header={blurb}></Layout>;
}
