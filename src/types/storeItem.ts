import type { applyingTime } from "./applyingTime";
import type { IProduct } from "./product";

export interface IStoreItem {
  id: number;

  amount: number;
  applyingTime: applyingTime;

  expense: string;

  isOpened: boolean;
  openedTime: string | null;

  isExpired: boolean;
  productionTime: string;
  shelfTime: number;

  isRunout: boolean;

  product: IProduct;
}
export interface IStoreItemUpdateOptions {
  amount?: number;
  applyingTime?: applyingTime;

  expense?: string;

  openedTime?: string | null;
  productionTime?: string;
  shelfTime?: number;

  isRunout?: boolean;
}
