import React from "react";
import Layout from "../../components/Layout";
import Link from "next/link";
import dayjs from "dayjs";
import { client, staticPages } from "../../tools/ContentfulClient";

export async function getStaticProps() {
  const events = await client.getEntries({ content_type: "musicEvent" });
  const blurbs = await staticPages();

  const upcomingEvents = events.items
    .sort((a, b) => dayjs(a.fields.date) - dayjs(b.fields.date))
    .filter((a) => dayjs().isBefore(a.fields.date));

  const pastEvents = events.items
    .sort((a, b) => dayjs(b.fields.date) - dayjs(a.fields.date))
    .filter((a) => dayjs().isAfter(a.fields.date));

  return {
    props: {
      upcomingEvents: upcomingEvents,
      pastEvents: pastEvents,
      blurb: blurbs.blurbEvents || null,
      description: blurbs.seoDescriptionEvents || null,
    },
    revalidate: 60,
  };
}

export default function Events({
  upcomingEvents,
  pastEvents,
  blurb,
  description,
}) {
  return (
    <Layout
      header={blurb}
      className={"events-page"}
      title="Events"
      description={description}
    >
      <div className="events-column left">
        <div className="events-header">
          <h1>Upcoming Events</h1>
        </div>
        {upcomingEvents?.length ? (
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
          <h4>No upcoming events. </h4>
        )}
      </div>
      <div className="events-column right">
        <div className="events-header">
          <h1>Past Events</h1>
        </div>
        {pastEvents?.length ? (
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
          <h4>No past events. </h4>
        )}
      </div>
    </Layout>
  );
}
