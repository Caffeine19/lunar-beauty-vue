import { defineStore } from "pinia";

import { reqUserLogin } from "@/api";

import type { ITooltipInfo } from "@/types/Tooltip";

import type { IUser } from "@/types/user";
const useUserStore = defineStore({
  id: "user",
  state: () => {
    return { userInfo: {} as IUser, token: "" as string };
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
  },
});
export default useUserStore;
