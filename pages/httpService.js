import axios from "axios";

const getProduct = () => {
  return axios.post("/api/product/get", { data: 1 });
};

const saveProduct = (data) => {
  return axios.post("/api/product/save", data);
};
export const httpService = {
  getProduct,
  saveProduct,
};
