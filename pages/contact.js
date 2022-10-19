import React, { useState } from "react";
import Layout from "../components/Layout";
import { staticPages } from "../tools/ContentfulClient";
import * as emailjs from "emailjs-com";

export const getStaticProps = async () => {
  const items = await staticPages();

  return {
    props: {
      blurb: items.blurbContact || null,
      description: items.seoDescriptionContact || null,
    },
    revalidate: 60,
  };
};

export default function Contact({ blurb, description }) {
  const blankForm = {
    name: undefined,
    email: undefined,
    phone: undefined,
    message: undefined,
  };
  const [form, setForm] = useState(blankForm);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    if (form.name && form.email && form.message) {
      const templateParams = form;
      emailjs
        .send(
          process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE_ID,
          process.env.NEXT_PUBLIC_EMAIL_JS_TEMPLATE_ID,
          templateParams,
          process.env.NEXT_PUBLIC_EMAIL_JS_PUBLIC_KEY
        )
        .then(
          (result) => {
            console.log(result.text);
            setSuccess(true);
            setForm(blankForm);
            setError(false);
            setSending(false);
          },
          (error) => {
            console.log(err);
          }
        );
    } else {
      setError(true);
      setSending(false);
    }
  };

  return (
    <Layout header={blurb} description={description} title="Contact">
      {success ? (
        <h4>
          Thanks for the message. I will get back to you as soon as I can.
        </h4>
      ) : (
        <form
          className="contact"
          action=""
          method="POST"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => handleChange(e)}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number (optional)"
            value={form.phone}
            onChange={(e) => handleChange(e)}
          />
          <textarea
            placeholder="Message"
            name="message"
            rows={10}
            value={form.message}
            onChange={(e) => handleChange(e)}
          />
          {sending ? (
            <h4>One moment please...</h4>
          ) : (
            <button type="submit">Send</button>
          )}
          {error ? <h4>**Please ensure all fields are filled out</h4> : null}
        </form>
      )}
    </Layout>
  );
}
