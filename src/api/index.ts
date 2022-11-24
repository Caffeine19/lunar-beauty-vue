import type { IStoreItemUpdateOptions } from "@/types/storeItem";
import type { IUserUpdateOptions } from "@/types/user";

import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "http://localhost:3008/api/",
  timeout: 5000,
});

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    console.log("response failed", err);
    if (err.response.data.err) {
      throw new Error(err.response.data.err);
    } else {
      throw new Error("response failed");
    }
  }
);

export const reqUserLogin = (name: string, password: string) => {
  return axiosInstance.post("/user/login", { name, password });
};
export const reqUserUpdateById = (
  userId: number,
  userData: IUserUpdateOptions
) => {
  return axiosInstance.post("/user/updateById", {
    userId,
    userData,
  });
};
export const reqProductFindOverview = (category: string) => {
  return axiosInstance.post("/product/findOverview", { category });
};
export const reqProductFindByBrand = (brand: string) => {
  return axiosInstance.post("/product/findByBrand", { brand });
};
export const reqProductFindByIngredient = (ingredientId: number) => {
  return axiosInstance.post("/product/findByIngredient", { ingredientId });
};
export const reqIngredientFindByProduct = (productId: number) => {
  return axiosInstance.post("/ingredient/findByProduct", { productId });
};

export const reqCommentFindByProduct = (productId: number) => {
  return axiosInstance.post("/comment/findByProduct", { productId });
};

export const reqStoreItemFindByUser = (userId: number) => {
  return axiosInstance.post("/storeItem/findByUser", { userId });
};
export const reqStoreItemUpdateById = (
  storeItemId: number,
  data: IStoreItemUpdateOptions
) => {
  return axiosInstance.post("/storeItem/updateById", {
    storeItemId,
    ...data,
  });
};
export const reqStoreItemDeleteById = (storeItemId: number) => {
  return axiosInstance.post("/storeItem/deleteById", { storeItemId });
};
export const reqRoutineFindByUser = (userId: number) => {
  return axiosInstance.post("/routine/findByUser", { userId });
};
export const reqRoutineFindNode = (routineId: number) => {
  return axiosInstance.post("/routine/findNode", { routineId });
};
export const reqRoutineFindEdge = (routineId: number) => {
  return axiosInstance.post("/routine/findEdge", { routineId });
};
export const reqRoutineUpdateById = (routineId: number, name: string) => {
  return axiosInstance.post("/routine/updateById", { routineId, name });
};

export const reqRoutineDeleteById = (routineId: number) => {
  return axiosInstance.post("/routine/deleteById", { routineId });
};
export const reqRoutineItemFindByRoutine = (routineId: number) => {
  return axiosInstance.post("/routineItem/findByRoutine", { routineId });
};
