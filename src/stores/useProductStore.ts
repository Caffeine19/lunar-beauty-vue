import { defineStore } from "pinia";
import { reqProjectFindOverview } from "@/api";
const useProductStore = defineStore({
  id: "product",
  state: () => {
    return {
      projectOverList: [],
    };
  },
  actions: {
    async getProductOverviewList(category: string) {
      try {
        const res = await reqProjectFindOverview(category);
        console.log(res);
      } catch (error) {
        console.error(error);
      }
    },
  },
});
export default useProductStore;
