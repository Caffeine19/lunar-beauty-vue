import { defineStore } from "pinia";
import { reqStoreItemFindByUser } from "@/api";
import type { IStoreItem } from "@/types/storeItem";
import dayjs from "dayjs";
const useStoreItemStore = defineStore({
  id: "storeItem",
  state: () => {
    return {
      storeItemList: [] as IStoreItem[],
    };
  },
  actions: {
    async getStoreItem(userId: number) {
      try {
        const res = await reqStoreItemFindByUser(userId);
        const { storeItemList } = res.data;
        console.log({ storeItemList });
        storeItemList.forEach((product: IStoreItem) => {
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
        this.storeItemList = storeItemList;
      } catch (error) {
        console.log(error);
      }
    },
    updateTest(storeItemId: number, amount: number) {
      console.log("onUpdate");
      this.storeItemList.forEach((sP, index) => {
        if (sP.id == storeItemId) {
          this.storeItemList[index].amount = amount;
        }
      });
    },
  },
});
export default useStoreItemStore;
