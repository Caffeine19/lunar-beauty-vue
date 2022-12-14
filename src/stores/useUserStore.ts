import { defineStore } from "pinia";

import { reqUserLogin, reqUserUpdateById } from "@/api";

import type { ITooltipInfo } from "@/types/Tooltip";

import type { IUser, IUserUpdateOptions } from "@/types/user";
const useUserStore = defineStore({
  id: "user",
  state: () => {
    return {
      userInfo: {
        name: "",
        id: 0,
        avatar: "",
        password: "",
        gender: "",
      } as IUser,
      token: "" as string,
    };
  },
  actions: {
    async login(username: string, password: string): Promise<ITooltipInfo> {
      try {
        const res = await reqUserLogin(username, password);
        const { user, token } = res.data;
        console.log({ user }, { token });
        this.userInfo = user;
        this.token = token;

        return { status: true, content: "login succeeded" };
      } catch (error) {
        if (error instanceof Error) {
          return { status: false, content: error.message };
        } else {
          return { status: false, content: "login failed" };
        }
      }
    },
    async updateById(
      userId: number,
      data: IUserUpdateOptions
    ): Promise<ITooltipInfo> {
      try {
        const res = await reqUserUpdateById(userId, data);
        const { updatedUser } = res.data;
        console.log({ updatedUser });
        this.userInfo = updatedUser;

        return { status: true, content: "update succeeded" };
      } catch (error) {
        if (error instanceof Error) {
          return { status: false, content: error.message };
        } else {
          return { status: false, content: "update failed" };
        }
      }
    },
  },
});
export default useUserStore;
