import Link from "next/link";
import React from "react";
import Layout from "../../components/Layout";
import dayjs from "dayjs";
import { client, staticPages } from "../../tools/ContentfulClient";

export async function getStaticProps() {
  const releases = await client.getEntries({ content_type: "musicRelease" });
  const events = await client.getEntries({ content_type: "musicEvent" });
  const upcomingEvents = events.items
    .filter((a) => dayjs().isBefore(a.fields.date))
    .sort((a, b) => dayjs(a.fields.date) - dayjs(b.fields.date));
  const blurbs = await staticPages();
  const press = await client.getEntries({ content_type: "musicPress" });
  const sortedPress = press.items.sort(
    (a, b) => dayjs(b.fields.date) - dayjs(a.fields.date)
  );
  const slicedPress =
    sortedPress.length > 3 ? sortedPress.slice(0, 3) : sortedPress;

  return {
    props: {
      releases: releases.items,
      events: upcomingEvents,
      press: slicedPress,
      blurb: blurbs.blurbMusic || null,
      description: blurbs.seoDescriptionMusic || null,
    },
    revalidate: 60,
  };
}

export default function Index({ releases, events, blurb, press, description }) {
  return (
    <Layout className="music" header={blurb} title="Music">
      <div className="banner">
        <div className="banner-header">
          <h3>Upcoming Events</h3>
          <p>
            (
            <Link href="/music/events" passHref={true}>
              <a>see all events</a>
            </Link>
            )
          </p>
        </div>
        <div className="banner-list">
          {events.length ? (
            events?.map((e, i) => (
              <div className="event" key={i}>
                <a
                  href={e.fields.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {e.fields.title}
                </a>
                <p className="--muted">
                  {dayjs(e.fields.date).format("MMMM DD, YYYY")}
                </p>
              </div>
            ))
          ) : (
            <div className="event">
              <h4>
                No upcoming events.{" "}
                <Link href="/music/events" passhref={true}>
                  <a>See past events</a>
                </Link>
              </h4>
            </div>
          )}
        </div>
      </div>
      <div className="banner">
        <div className="banner-header">
          <h3>Recent Press</h3>
          <p>
            (
            <Link href="/music/press" passHref={true}>
              <a>see all press</a>
            </Link>
            )
          </p>
        </div>
        <div className="banner-list">
          {press.length ? (
            press?.map((e, i) => (
              <div className="event" key={i}>
                <a
                  href={e.fields.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {e.fields.title}
                </a>
                <p className="--muted">
                  {dayjs(e.fields.date).format("MMMM DD, YYYY")}
                </p>
              </div>
            ))
          ) : (
            <div className="event">
              <h4>
                No recent press.{" "}
                <Link href="/music/press" passhref={true}>
                  <a>See all press</a>
                </Link>
              </h4>
            </div>
          )}
        </div>
      </div>
      {releases.map((r, i) => (
        <div className="release" key={i}>
          <div className="info">
            <div className="top">
              {r.fields.title ? (
                <Link href={`/music/${r.fields.slug}`} passHref={true}>
                  <a>
                    <h1>{r.fields.title}</h1>
                  </a>
                </Link>
              ) : null}
              <p className="--muted">
                {r.fields.type ? `${r.fields.type} • ` : null}
                {r.fields.year ? r.fields.year : null}
              </p>
            </div>
            {(r.fields.with || r.fields.feat) && (
              <div className="bottom">
                {r.fields.with ? <h4>with {r.fields.with}</h4> : null}
                {r.fields.feat ? <h4>feat. {r.fields.feat}</h4> : null}
              </div>
            )}
          </div>
          <iframe
            src={r.fields.embedLink}
            width="100%"
            height={`${r.fields.length ? r.fields.length * 31 + 80 : 80}px`}
            frameBorder="0"
            allowFullScreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          ></iframe>
        </div>
      ))}
    </Layout>
  );
}
