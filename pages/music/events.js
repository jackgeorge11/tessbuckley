import React from "react";
import { createClient } from "contentful";
import Layout from "../../components/Layout";
import Link from "next/link";
import dayjs from "dayjs";
import { client } from "../../tools/ContentfulClient";

export async function getStaticProps() {
  const events = await client.getEntries({ content_type: "musicEvent" });
  const blurb = await client.getContentType("musicEvent");

  const upcomingEvents = events.items
    .sort((a, b) => new Date(a.fields.date) - new Date(b.fields.date))
    .filter((a) => dayjs().isBefore(a.fields.date));

  const pastEvents = events.items
    .sort((a, b) => new Date(b.fields.date) - new Date(a.fields.date))
    .filter((a) => dayjs().isAfter(a.fields.date));

  return {
    props: {
      upcomingEvents: upcomingEvents,
      pastEvents: pastEvents,
      blurb: blurb.description,
      revalidate: 1,
    },
  };
}

export default function events({ upcomingEvents, pastEvents, blurb }) {
  return (
    <Layout header={blurb} className={"events-page"}>
      <div className="events-column left">
        <div className="events-header">
          <h1>Upcoming Events</h1>
        </div>
        {upcomingEvents.length ? (
          <ul>
            {upcomingEvents?.map((e, i) => (
              <li className="event" key={i}>
                <h3>
                  <a
                    href={e.fields.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {e.fields.title}
                  </a>{" "}
                  <span className="--muted">
                    {dayjs(e.fields.date).format("MMMM DD, YYYY")}
                  </span>
                </h3>
                <h4>{e.fields.additionalInformation}</h4>

                <p className="--muted">{e.fields.location}</p>
              </li>
            ))}
          </ul>
        ) : (
          <h4>
            No upcoming events.{" "}
            <Link href="/music/events" passhref={true}>
              <a>See past events</a>
            </Link>
          </h4>
        )}
      </div>
      <div className="events-column right">
        <div className="events-header">
          <h1>Past Events</h1>
        </div>
        {pastEvents.length ? (
          <ul>
            {pastEvents?.map((e, i) => (
              <li className="event" key={i}>
                <h3>
                  <a
                    href={e.fields.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {e.fields.title}
                  </a>{" "}
                  <span className="--muted">
                    {dayjs(e.fields.date).format("MMMM DD, YYYY")}
                  </span>
                </h3>
                <h4>{e.fields.additionalInformation}</h4>

                <p className="--muted">{e.fields.location}</p>
              </li>
            ))}
          </ul>
        ) : (
          <h4>
            No upcoming events.{" "}
            <Link href="/music/events" passhref={true}>
              <a>See past events</a>
            </Link>
          </h4>
        )}
      </div>
    </Layout>
  );
}
