import type { applyingTime } from "./applyingTime";
import type { IProduct } from "./product";
export interface IRoutineProduct {
  id: number;
  amount: number;
  applyingTime: applyingTime;
  expense: number;
  product: IProduct;
}
