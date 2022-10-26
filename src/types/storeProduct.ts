import type { applyingTime } from "./applyingTime";
import type { IProduct } from "./product";

export interface IStoreProduct {
  id: number;
  amount: number;
  applyingTime: applyingTime;

  expense: string;

  isOpened: boolean;
  openedTime: string;

  isExpired: boolean;
  productionTime: string;
  shelfTime: number;

  isRunout: boolean;

  product: IProduct;
}
