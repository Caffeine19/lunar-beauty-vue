import { defineStore } from "pinia";
import { reqIngredientFindByProduct } from "@/api";
import type { IIngredient } from "@/types/ingredient";
const useIngredientStore = defineStore({
  id: "ingredient",
  state: () => {
    return {
      ingredientList: [] as IIngredient[],
    };
  },
  actions: {
    async getIngredientList(productId: number) {
      try {
        const res = await reqIngredientFindByProduct(productId);
        const { ingredientList } = res.data;
        this.ingredientList = ingredientList;
        console.log(ingredientList);
      } catch (error) {
        console.log(error);
      }
    },
  },
});
export default useIngredientStore;
