const fetch = require("node-fetch");
const private_key = require("../config/key").KLAVIYO_PRIVATE_KEY;
const { URLSearchParams } = require("url");

const id = "T9cZic";

const encodedParams = new URLSearchParams();

encodedParams.set("from_email", "ted@blueshiftnine.com");
encodedParams.set("from_name", "SkullSplitter");
encodedParams.set("subject", "Referrl Benefit Offer");

encodedParams.set("context", '{ "name" : "MM MM", "state" : "VA" }');

const sendEmail = (email, recepName, templateId) => {
  const url = `https://a.klaviyo.com/api/v1/email-template/${templateId}/send?api_key=${private_key}`;
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

// create Template
const createEncodedParams = new URLSearchParams();
const create_url = "https://a.klaviyo.com/api/v1/email-templates";
createEncodedParams.set("api_key", private_key);
createEncodedParams.set("name", "referral Template");

const createTemplate = (html) => {
  createEncodedParams.set("html", html);

  const create_options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: createEncodedParams,
  };

  return fetch(create_url, create_options)
    .then((res) => res.json())
    .catch((err) => console.error("error:" + err));
};

// Delete Template
const deleteEncodedParams = new URLSearchParams();
deleteEncodedParams.set("api_key", private_key);
deleteEncodedParams.set("name", "referrla Template");

const deleteTemplate = (delId) => {
  const delete_url = `https://a.klaviyo.com/api/v1/email-template/${delId}?api_key=${private_key}`;
  const delete_options = {
    method: "DELETE",
    headers: { Accept: "application/json" },
  };

  return fetch(delete_url, delete_options)
    .then((res) => res.json())
    .then((json) => console.log(json))
    .catch((err) => console.error("error:" + err));
};

const sender = {
  sendEmail,
  getTemplate,
  createTemplate,
  deleteTemplate,
};

module.exports = sender;
