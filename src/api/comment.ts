import type { CommentCreateOptions } from "@/types/comment";
import axiosInstance from ".";

export const reqCommentFindByProduct = (productId: number) => {
  return axiosInstance.post("/comment/findByProduct", { productId });
};

export const reqCommentCreateByUser = (data: CommentCreateOptions) => {
  return axiosInstance.post("/comment/createByUser", data);
};
export const reqCommentDeleteById = (commentId: number) => {
  return axiosInstance.post("/comment/deleteById", { commentId });
};
