import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "http://localhost:3008/api/",
  timeout: 1000,
});
export const reqProjectFindOverview = (category: string) => {
  return axiosInstance.post("/product/findOverview", { category });
};
export const reqIngredientFindByProduct = (productId: number) => {
  return axiosInstance.post("/ingredient/findByProduct", { productId });
};
