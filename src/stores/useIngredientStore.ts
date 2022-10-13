import { defineStore } from "pinia";
import { reqProjectFindOverview } from "@/api";
import type { IProduct } from "@/types/product.";
const useProductStore = defineStore({
  id: "ingredient",
  state: () => {
    return {
      productOverviewList: [] as IProduct[],
    };
  },
  actions: {
    async getProductOverviewList(category: string) {
      try {
        const res = await reqProjectFindOverview(category);
        const { productOverviewList } = res.data;
        this.productOverviewList = productOverviewList;
        console.log(productOverviewList);
      } catch (error) {
        console.error(error);
      }
    },
  },
});
export default useProductStore;
