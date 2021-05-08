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
export const httpService = {
  getProduct,
  saveProduct,
  removeProduct,
};
