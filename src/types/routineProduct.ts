import type { applyingTime } from "./applyingTime";
import type { IProduct } from "./product";
export interface IRoutingProduct {
  amount: number;
  applyingTIme: applyingTime;
  product: IProduct;
}
