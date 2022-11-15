import { defineStore } from "pinia";

import { reqUserLogin } from "@/api";
const useUserStore = defineStore({
  id: "user",
  state: () => {
    return { userInfo: {}, token: "" };
  },
  actions: {
    async login(username: string, password: string) {
      try {
        const res = await reqUserLogin(username, password);
        const { user, token } = res.data;
        console.log({ user }, { token });
        this.userInfo = user;
        this.token = token;
      } catch (error) {
        console.log(error);
        throw new Error("user login failed");
      }
    },
  },
});
export default useUserStore;
