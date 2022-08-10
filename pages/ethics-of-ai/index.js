import Link from "next/link";
import React, { useState } from "react";
import BlogPost from "../../components/BlogPost";
import Layout from "../../components/Layout";
import { MemoizedPalette } from "../../components/Palette";

export default function EthicsOfAi() {
  const posts = [
    {
      title: "How AI is Shaping a Sustainable Future",
      date: "Aug 15, 2022",
    },
    {
      title: "Who is Sophie?",
      date: "Aug 4, 2022",
    },
    {
      title: "Protein Folding; Bioethical Implications",
      date: "July 29, 2022",
    },
    {
      title: "Could Robotic Insects 'Bee' the Future?",
      date: "July 10, 2022",
    },
    {
      title: "Who am I?",
      date: "June 30, 2022",
    },
  ];

  const [expanded, setExpanded] = useState(Array(posts.length).fill(false));

  const handleExpand = (i) => {
    console.log("hit");
    let arr = expanded;
    arr[i] = !arr[i];
    setExpanded(arr);
  };

  return (
    <Layout className="ethics-of-ai">
      {posts.map((post, i) => (
        <BlogPost post={post} key={i} />
      ))}
    </Layout>
  );
}
