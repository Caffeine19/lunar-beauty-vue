import { defineStore } from "pinia";

import type { IComment } from "@/types/comment";
import { reqCommentCreateByUser, reqCommentFindByProduct } from "@/api/comment";

import type { ITooltipInfo } from "@/types/tooltip";
const useCommentStore = defineStore({
  id: "comment",
  state: () => {
    return {
      productRelatedCommentList: [] as IComment[],
    };
  },
  actions: {
    async getProductRelatedCommentList(productId: number) {
      try {
        const res = await reqCommentFindByProduct(productId);
        const { commentList } = res.data;
        console.log({ commentList });
        this.productRelatedCommentList = commentList;
      } catch (error) {
        console.error(error);
      }
    },
    async createByUser(
      userId: number,
      productId: number,
      content: string,
      mark: number
    ): Promise<ITooltipInfo> {
      try {
        const res = await reqCommentCreateByUser(
          userId,
          productId,
          content,
          mark
        );
        const { createdComment } = res.data;
        this.productRelatedCommentList.unshift(createdComment);
        return { status: true, content: "created succeeded" };
      } catch (error) {
        console.error(error);
        return { status: false, content: "created failed" };
      }
    },
  },
});
export default useCommentStore;
