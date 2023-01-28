import axiosInstance from ".";

export const reqCommentFindByProduct = (productId: number) => {
  return axiosInstance.post("/comment/findByProduct", { productId });
};

export const reqCommentCreateByUser = (
  userId: number,
  productId: number,
  content: string,
  mark: number
) => {
  return axiosInstance.post("/comment/createByUser", {
    userId,
    productId,
    content,
    mark,
  });
};
