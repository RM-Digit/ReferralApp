const fetch = require("node-fetch");
const private_key = require("../config/key").KLAVIYO_PRIVATE_KEY;
const { URLSearchParams } = require("url");

const id = "UfPa68";
const encodedParams = new URLSearchParams();

encodedParams.set("from_email", "menglanwen33@gmail.com");
encodedParams.set("from_name", "Menglan Wen");
encodedParams.set("subject", "Referrl Benefit Offer");
encodedParams.set(
  "to",
  `[{"name":"Abraham Lincoln","email":"storm00530@gmail.com"}]`
);
encodedParams.set("context", '{ "name" : "MM MM", "state" : "VA" }');

const url = `https://a.klaviyo.com/api/v1/email-template/${id}/send?api_key=${private_key}`;
const options = {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
  },
  body: encodedParams,
};
const get_url = `https://a.klaviyo.com/api/v1/email-templates?api_key=${private_key}`;
const get_options = { method: "GET", headers: { Accept: "application/json" } };
const sendEmail = () => {
  fetch(url, options)
    .then((res) => res.json())
    .then((json) => console.log(json))
    .catch((err) => console.error("error:" + err));
};
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
