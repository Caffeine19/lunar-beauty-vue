import { defineStore } from "pinia";
import {
  reqProductFindOverview,
  reqProductFindByBrand,
  reqProductFindByIngredient,
} from "@/api";
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
        const res = await reqProductFindOverview(category);
        const { productOverviewList } = res.data;
        this.productOverviewList = productOverviewList;
        console.log({ productOverviewList });
      } catch (error) {
        console.error(error);
      }
    },
    async getBrandRelatedProduct(brand: string) {
      try {
        const res = await reqProductFindByBrand(brand);
        const { relatedProductList } = res.data;
        this.relatedProductList = relatedProductList;
        console.info({ relatedProductList });
      } catch (error) {
        console.error(error);
      }
    },
    async getIngredientRelatedProduct(ingredientId: number) {
      try {
        const res = await reqProductFindByIngredient(ingredientId);
        const { relatedProductList } = res.data;
        this.relatedProductList = relatedProductList;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
export default useProductStore;
