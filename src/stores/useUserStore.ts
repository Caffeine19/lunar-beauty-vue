import { defineStore } from "pinia";

import { reqUserLogin } from "@/api";

import type { ITooltipInfo } from "@/types/Tooltip";
const useUserStore = defineStore({
  id: "user",
  state: () => {
    return { userInfo: {}, token: "" };
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
        console.log(error);
        return { status: false, content: "login failed" };
      }
    },
  },
});
export default useUserStore;
