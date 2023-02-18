import type { applyingTime } from "./applyingTime";
import type { IProduct } from "./product";

type CalculatedPreservationStatus = {
  isOpened: boolean;
  isExpired: boolean;
};

export type StoreItem = {
  id: number;

  amount: number;
  applyingTime: applyingTime;

  expense: number;

  openedTime: string | null;

  productionTime: string | null;
  shelfTime: number;

  isRunout: boolean;

  product: IProduct;
} & CalculatedPreservationStatus;

export type StoreItemUpdateOptions = Pick<
  StoreItem,
  | "amount"
  | "applyingTime"
  | "expense"
  | "openedTime"
  | "productionTime"
  | "shelfTime"
  | "isRunout"
>;

export type StoreItemCreateOptions = Omit<
  StoreItem,
  "id" | "product" | keyof CalculatedPreservationStatus
> & { productId: IProduct["id"] };
