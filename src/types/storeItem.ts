import type { applyingTime } from "./applyingTime";
import type { IProduct } from "./product";

type CalculatedPreservationStatus = {
  isOpened: boolean;
  isExpired: boolean;
};

export type IStoreItem = {
  id: number;

  amount: number;
  applyingTime: applyingTime;

  expense: string;

  openedTime: string | null;

  productionTime: string;
  shelfTime: number;

  isRunout: boolean;

  product: IProduct;
} & CalculatedPreservationStatus;

export type IStoreItemUpdateOptions = Pick<
  IStoreItem,
  | "amount"
  | "applyingTime"
  | "expense"
  | "openedTime"
  | "productionTime"
  | "shelfTime"
  | "isRunout"
>;
