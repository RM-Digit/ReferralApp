import axios from "axios";

const getProduct = () => {
  return axios.post("/api/product/get", { data: 1 });
};

const saveProduct = (data) => {
  return axios.post("/api/product/save", data);
};
const removeProduct = () => {
  return axios.post("/api/product/remove", { data: 1 });
};
const checkWebhook = () => {
  return axios.post("/webhook/check", { data: 1 });
};
const getCustomer = () => {
  return axios.post("/api/customer/get", { data: 1 });
};
const updateCustomer = (id) => {
  return axios.post("/api/customer/update", { id: id });
};
const sendEmail = () => {
  return axios.post("/service/mailer/send", { id: 1 });
};
const saveLink = (link) => {
  return axios.post("/share/save", { shareLink: link });
};
const getLink = () => {
  return axios.post("/share/get", { shareLink: "link" });
};
export const httpService = {
  getProduct,
  saveProduct,
  removeProduct,
  checkWebhook,
  getCustomer,
  updateCustomer,
  sendEmail,
  saveLink,
  getLink,
};
