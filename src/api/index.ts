import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "http://localhost:3008/api/",
  timeout: 5000,
});
export const reqProjectFindOverview = (category: string) => {
  return axiosInstance.post("/product/findOverview", { category });
};
export const reqIngredientFindByProduct = (productId: number) => {
  return axiosInstance.post("/ingredient/findByProduct", { productId });
};
export const reqProjectFindRelated = (brand: string) => {
  return axiosInstance.post("/product/findRelated", { brand });
};

export const reqCommentFindByProduct = (productId: number) => {
  return axiosInstance.post("/comment/findByProduct", { productId });
};

export const reqStoreProductFindByUser = (userId: number) => {
  return axiosInstance.post("/storeProduct/findByUser", { userId });
};
export const reqRoutineFindByUser = (userId: number) => {
  return axiosInstance.post("/routine/findByUser", { userId });
};
export const reqRoutineProductFindByRoutine = (routineId: number) => {
  return axiosInstance.post("/routineProduct/findByRoutine", routineId);
};
export const reqRoutineFindFlow = (routineId: number) => {
  return axiosInstance.post("/routine/findFlow", { routineId });
};
