import { defineStore } from "pinia";
import { reqStoreProductFindByUser } from "@/api";
import type { IStoreProduct } from "@/types/storeProduct";
import dayjs from "dayjs";
const useStoreProductStore = defineStore({
  id: "storeProduct",
  state: () => {
    return {
      storeProductList: [] as IStoreProduct[],
    };
  },
  actions: {
    async getStoreProduct(userId: number) {
      try {
        const res = await reqStoreProductFindByUser(userId);
        const { storeProductList } = res.data;
        console.log({ storeProductList });
        storeProductList.forEach((product: IStoreProduct) => {
          if (product.openedTime) {
            product.isOpened = true;
          } else {
            product.isOpened = false;
          }

          const safeTime = dayjs(product.productionTime).add(
            product.shelfTime,
            "month"
          );
          if (safeTime.unix() > dayjs().unix()) {
            product.isExpired = false;
          } else {
            product.isExpired = true;
          }
        });
        this.storeProductList = storeProductList;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
export default useStoreProductStore;
