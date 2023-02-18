import axiosInstance from ".";
import type { IUserUpdateOptions } from "@/types/user";
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
export const reqUserRegister = (username: string, password: string) => {
  return axiosInstance.post("/user/register", { username, password });
};
