import { createClient } from "contentful";

export const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN,
});

export const staticPages = async () => {
  const res = await client.getEntries({ content_type: "staticPages" });
  return res?.items[0]?.fields;
};
