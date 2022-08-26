import { client, preview } from "../../tools/ContentfulClient";

export default async function handler(req, res) {
  const { secret, slug } = req.query;
  console.log("productId: ", slug);

  if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET || !slug) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const post = await contentful.preview.getEntries({
    content_type: "productReview",
    limit: 1,
    "fields.slug": slug,
  });

  if (!post.items.length) {
    return res.status(401).json({ message: "Invalid slug" });
  }

  const pageFields = slug.items[0].fields;

  res.setPreviewData({});
  res.redirect(`/blog/${pageFields.slug}`);
}
