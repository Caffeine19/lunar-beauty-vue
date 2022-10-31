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

export const reqStoreItemFindByUser = (userId: number) => {
  return axiosInstance.post("/storeItem/findByUser", { userId });
};
export const reqRoutineFindByUser = (userId: number) => {
  return axiosInstance.post("/routine/findByUser", { userId });
};
export const reqRoutineItemFindByRoutine = (routineId: number) => {
  return axiosInstance.post("/routineItem/findByRoutine", routineId);
};
export const reqRoutineFindNode = (routineId: number) => {
  return axiosInstance.post("/routine/findNode", { routineId });
};
export const reqRoutineFindEdge = (routineId: number) => {
  return axiosInstance.post("/routine/findEdge", { routineId });
};
