import axiosInstance from ".";
export const reqProductFindOverview = (
  category: string,
  skip: number,
  take: number
) => {
  return axiosInstance.post("/product/findOverview", { category, skip, take });
};
export const reqProductFindByBrand = (brand: string) => {
  return axiosInstance.post("/product/findByBrand", { brand });
};
export const reqProductFindByIngredient = (ingredientId: number) => {
  return axiosInstance.post("/product/findByIngredient", { ingredientId });
};
