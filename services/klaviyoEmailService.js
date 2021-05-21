const fetch = require("node-fetch");
const private_key = require("../config/key").KLAVIYO_PRIVATE_KEY;
const { URLSearchParams } = require("url");

const id = "T9cZic";
const encodedParams = new URLSearchParams();

encodedParams.set("from_email", "menglanwen33@gmail.com");
encodedParams.set("from_name", "SkullSplitter");
encodedParams.set("subject", "Referrl Benefit Offer");

encodedParams.set("context", '{ "name" : "MM MM", "state" : "VA" }');

const url = `https://a.klaviyo.com/api/v1/email-template/${id}/send?api_key=${private_key}`;

const sendEmail = (email, recepName) => {
  encodedParams.set("to", `[{"name":"${recepName}","email":"${email}"}]`);
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: encodedParams,
  };
  fetch(url, options)
    .then((res) => res.json())
    .then((json) => console.log(json))
    .catch((err) => console.error("error:" + err));
};

const get_url = `https://a.klaviyo.com/api/v1/email-templates?api_key=${private_key}`;
const get_options = { method: "GET", headers: { Accept: "application/json" } };
const getTemplate = () => {
  return fetch(get_url, get_options)
    .then((res) => res.json())
    .catch((err) => console.error("error:" + err));
};
const sender = {
  sendEmail,
  getTemplate,
};

module.exports = sender;
