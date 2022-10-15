const fs = require("fs");
const axios = require("axios");
require("dotenv").config();

class API {
  constructor(accessToken, spaceID) {
    this.accessToken = accessToken;
    this.spaceID = spaceID;
    this.environment_id = "master";
    this.endpoint = `https://graphql.contentful.com/content/v1/spaces/${this.spaceID}`;
  }

  getFetchOptions(query) {
    return {
      spaceID: this.spaceID,
      accessToken: this.accessToken,
      endpoint: this.endpoint,
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    };
  }

  async getNav() {
    const query = `
      {
        blogPostCollection {
          items {
            genre
          }
        }
      }
    `;

    axios(this.endpoint, this.getFetchOptions(query))
      .then((res) => res.json())
      .then(({ data }) => {
        console.log(data?.blogPostCollection);
      })
      .catch((err) => console.log(err));
  }
}

const api = new API(
  process.env.CONTENTFUL_DELIVERY_TOKEN,
  process.env.CONTENTFUL_SPACE_ID
);

api.getNav();
