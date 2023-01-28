import { defineStore } from "pinia";
import {
  reqStoreItemDeleteById,
  reqStoreItemFindByUser,
  reqStoreItemUpdateById,
} from "@/api/storeItem";
import type { IStoreItem, IStoreItemUpdateOptions } from "@/types/storeItem";

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
        this.storeItemList = storeItemList;
      } catch (error) {
        console.log(error);
      }
    },

    async updateById(
      storeItemId: number,
      data: IStoreItemUpdateOptions
    ): Promise<ITooltipInfo> {
      try {
        const res = await reqStoreItemUpdateById(storeItemId, data);
        const { updatedStoreItem } = res.data;
        console.log({ updatedStoreItem });

        this.storeItemList.forEach((sI, index) => {
          if (sI.id === storeItemId) {
            // console.log(sI.id);
            // this.storeItemList[index] = updatedStoreItem;

            this.storeItemList[index].amount = updatedStoreItem.amount;
            this.storeItemList[index].applyingTime =
              updatedStoreItem.applyingTime;
            this.storeItemList[index].expense = updatedStoreItem.expense;

            this.storeItemList[index].openedTime = updatedStoreItem.openedTime;

            this.storeItemList[index].productionTime =
              updatedStoreItem.productionTime;
            this.storeItemList[index].shelfTime = updatedStoreItem.shelfTime;

            this.storeItemList[index].isRunout = updatedStoreItem.isRunout;

            this.storeItemList[index].isOpened = updatedStoreItem.isOpened;
            this.storeItemList[index].isExpired = updatedStoreItem.isExpired;
          }
        });
        // console.log(this.storeItemList);
        return { status: true, content: "update succeeded" };
      } catch (error) {
        console.log(error);
        return { status: false, content: "update failed" };
      }
    },
    async deleteById(storeItemId: number): Promise<ITooltipInfo> {
      try {
        const res = await reqStoreItemDeleteById(storeItemId);
        const { deletedStoreItem } = res.data;
        this.storeItemList = this.storeItemList.filter((sI) => {
          return sI.id !== deletedStoreItem.id;
        });
        console.log({ storeItemList: this.storeItemList });
        return { status: true, content: "delete succeeded" };
      } catch (error) {
        console.log(error);
        return { status: false, content: "delete failed" };
      }
    },
  },
});
export default useStoreItemStore;
