import axiosInstance from ".";
export const reqIngredientFindByProduct = (productId: number) => {
  return axiosInstance.post("/ingredient/findByProduct", { productId });
};
