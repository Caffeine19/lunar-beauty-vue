import { defineStore } from "pinia";
import type { IComment } from "@/types/comment";
import { reqCommentFindByProduct } from "@/api";
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
  },
});
export default useCommentStore;
