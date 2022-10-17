import { defineStore } from "pinia";
import { reqProjectFindOverview, reqProjectFindRelated } from "@/api";
import type { IProduct } from "@/types/product";

const useProductStore = defineStore({
  id: "product",
  state: () => {
    return {
      productOverviewList: [] as IProduct[],
      relatedProductList: [] as IProduct[],
    };
  },
  actions: {
    async getProductOverviewList(category: string) {
      try {
        const res = await reqProjectFindOverview(category);
        const { productOverviewList } = res.data;
        this.productOverviewList = productOverviewList;
        console.log({ productOverviewList });
      } catch (error) {
        console.error(error);
      }
    },
    async getRelatedProduct(brand: string) {
      try {
        const res = await reqProjectFindRelated(brand);
        const { relatedProductList } = res.data;
        this.relatedProductList = relatedProductList;
        console.info({ relatedProductList });
      } catch (error) {
        console.error(error);
      }
    },
  },
});
export default useProductStore;
