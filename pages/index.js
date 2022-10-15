import { useState } from "react";
import Layout from "../components/Layout";
import { client, staticPages } from "../tools/ContentfulClient";

export const getStaticProps = async () => {
  const carousel = await client.getEntries({ content_type: "carousel" });
  const items = await staticPages();

  return {
    props: {
      images: carousel?.items[0]?.fields.images || null,
      blurb: items.blurbHome || null,
      description: items.seoDescriptionHome || null,
    },
    revalidate: 60,
  };
};

export default function Home({ blurb, images, description }) {
  const [carousel, setCarousel] = useState(0);

  const nextImage = () => {
    if (carousel >= images.length - 1) {
      setCarousel(0);
    } else {
      setCarousel((prev) => prev + 1);
    }
  };

  const prevImage = () => {
    if (carousel) {
      setCarousel((prev) => prev - 1);
    } else {
      setCarousel(images.length - 1);
    }
  };

  return (
    <Layout header={blurb} className="home" description={description}>
      <div className="arrows bottom">
        <p className="--a" onClick={prevImage}>
          prev
        </p>
        <p className="--a" onClick={nextImage}>
          next
        </p>
      </div>
      <div className="carousel">
        {images.map((img, i) => (
          <img
            src={img.fields.file.url}
            alt={img.fields.description}
            key={i}
            className={carousel === i ? "is--active" : ""}
          />
        ))}
      </div>
      <div className="arrows">
        <p className="--a" onClick={prevImage}>
          prev
        </p>
        <p className="--a" onClick={nextImage}>
          next
        </p>
      </div>
    </Layout>
  );
}
