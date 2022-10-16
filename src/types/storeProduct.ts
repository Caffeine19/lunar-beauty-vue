import type { applyingTime } from "./applyingTime";
import type { IProduct } from "./product";

export interface IStoreProduct {
  id: number;
  amount: number;
  applyingTime: applyingTime;
  productionTime: string;
  openedTime: string;
  shelfTime: string;
  expense: string;

  product: IProduct;
}
