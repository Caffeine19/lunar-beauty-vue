import type { applyingTime } from "./applyingTime";
import type { IProduct } from "./product";

export type IStoreItem = {
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
};
// export type IStoreItemUpdateOptions= {
//   amount?: IStoreItem["amount"];
//   applyingTime?: IStoreItem["applyingTime"];

//   expense?: IStoreItem["expense"];

//   openedTime?: IStoreItem["openedTime"];
//   productionTime?: IStoreItem["productionTime"];
//   shelfTime?: IStoreItem["shelfTime"];

//   isRunout?: IStoreItem["isRunout"];
// }
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
