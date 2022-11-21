import { defineStore } from "pinia";
import { reqStoreItemFindByUser, reqStoreItemUpdateById } from "@/api";
import type { IStoreItem, IStoreItemUpdateOptions } from "@/types/storeItem";
import dayjs from "dayjs";

import type { ITooltipInfo } from "@/types/tooltip";

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
    // updateTest(storeItemId: number, amount: number) {
    //   console.log("onUpdate");
    //   this.storeItemList.forEach((sP, index) => {
    //     if (sP.id == storeItemId) {
    //       this.storeItemList[index].amount = amount;
    //     }
    //   });
    // },

    async updateById(
      storeItemId: number,
      data: IStoreItemUpdateOptions
    ): Promise<ITooltipInfo> {
      try {
        const res = await reqStoreItemUpdateById(storeItemId, data);
        const { updatedStoreItem } = res.data;
        console.log({ updatedStoreItem });

        this.storeItemList.forEach((sI, index) => {
          if (sI.id == storeItemId) {
            // console.log(sI.id);
            this.storeItemList[index].amount = updatedStoreItem.amount;
            this.storeItemList[index].applyingTime =
              updatedStoreItem.applyingTime;
            this.storeItemList[index].expense = updatedStoreItem.expense;
            this.storeItemList[index].productionTime =
              updatedStoreItem.productionTime;
            this.storeItemList[index].shelfTime = updatedStoreItem.shelfTime;
            this.storeItemList[index].openedTime = updatedStoreItem.openedTime;
            this.storeItemList[index].isRunout = updatedStoreItem.isRunout;
          }
        });
        // console.log(this.storeItemList);

        return { status: true, content: "update succeeded" };
      } catch (error) {
        console.log(error);
        return { status: false, content: "update failed" };
      }
    },
  },
});
export default useStoreItemStore;
