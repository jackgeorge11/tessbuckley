import React, { useState } from "react";
import PostPreview from "../../components/PostPreview";
import Layout from "../../components/Layout";
import { client, staticPages } from "../../tools/ContentfulClient";
import dayjs from "dayjs";

export async function getStaticProps() {
  const posts = await client.getEntries({ content_type: "blogPost" });
  const blurbs = await staticPages();

  const reversedPosts = posts.items.sort(
    (a, b) => dayjs(b.fields.date) - dayjs(a.fields.date)
  );

  let tabs = [
    {
      title: "All",
      posts: posts.items.sort(
        (a, b) => dayjs(b.fields.date) - dayjs(a.fields.date)
      ),
    },
  ];

  reversedPosts.forEach((p) => {
    const idx = tabs.findIndex((tab) => tab.title === p.fields.genre);
    if (idx > 0) {
      tabs[idx].posts.push(p);
    } else {
      const tab = { title: p.fields.genre, posts: [p] };
      tabs.push(tab);
    }
  });

  return {
    props: {
      tabs: tabs,
      blurb: blurbs.blurbBlog || null,
      description: blurbs.seoDescriptionBlog || null,
    },
    revalidate: 60,
  };
}

export default function EthicsOfAi({ tabs, blurb, description }) {
  const [openTab, setOpenTab] = useState(0);

  const toggleTab = (i) => {
    if (openTab !== i) {
      setOpenTab(i);
    }
  };

  return (
    <Layout
      className="blog-page"
      header={blurb}
      title="Blog"
      description={description}
    >
      <div className="tab-nav">
        {tabs.map((tab, i) => (
          <div
            className={i === openTab ? "tab is--active" : "tab"}
            key={i}
            onClick={() => toggleTab(i)}
          >
            <h4 className={i === openTab ? "thick" : ""}>{tab.title}</h4>
          </div>
        ))}
      </div>
      {tabs.map((tab, i) => (
        <div
          className={i === openTab ? "tab-list is--active" : "tab-list"}
          key={i}
        >
          {tab.posts.map((post, j) => (
            <PostPreview post={post.fields} key={j} />
          ))}
        </div>
      ))}
    </Layout>
  );
}
