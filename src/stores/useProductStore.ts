import { defineStore } from "pinia";
import {
  reqProjectFindOverview,
  reqProjectFindRelated,
  reqProductFindByStore,
} from "@/api";
import type { IProduct } from "@/types/product";
import type { IStoreProduct } from "@/types/storeProduct";
import dayjs from "dayjs";
const useProductStore = defineStore({
  id: "product",
  state: () => {
    return {
      productOverviewList: [] as IProduct[],
      relatedProductList: [] as IProduct[],
      storeProductList: [] as IStoreProduct[],
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
    async getStoreProduct(userId: number) {
      try {
        const res = await reqProductFindByStore(userId);
        const { storeProductList } = res.data;
        console.log({ storeProductList });
        storeProductList.forEach((product: IStoreProduct) => {
          if (product.openedTime) {
            product.isOpened = true;
          }
          if (product.productionTime) {
            const safeTime = dayjs(product.productionTime).add(
              product.shelfTime,
              "month"
            );
            if (safeTime.unix() > dayjs().unix()) {
              product.isExpired = false;
            } else {
              product.isExpired = true;
            }
          }
        });
        this.storeProductList = storeProductList;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
export default useProductStore;
