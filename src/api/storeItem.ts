import type {
  StoreItemCreateOptions,
  StoreItemUpdateOptions,
} from "@/types/storeItem";
import axiosInstance from ".";

export const reqStoreItemFindByUser = (userId: number) => {
  return axiosInstance.post("/storeItem/findByUser", { userId });
};
export const reqStoreItemUpdateById = (
  storeItemId: number,
  data: StoreItemUpdateOptions
) => {
  return axiosInstance.post("/storeItem/updateById", {
    storeItemId,
    ...data,
  });
};
export const reqStoreItemDeleteById = (storeItemId: number) => {
  return axiosInstance.post("/storeItem/deleteById", { storeItemId });
};

export const reqStoreItemCreateByUser = (data: StoreItemCreateOptions) => {
  return axiosInstance.post("/storeItem/createByUser", { data });
};
