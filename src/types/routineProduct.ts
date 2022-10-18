import type { applyingTime } from "./applyingTime";
import type { IProduct } from "./product";
import type { Ref } from "vue";
export interface IRoutineProduct {
  id: number;
  amount: number;
  applyingTime: applyingTime;
  expense: number;
  product: IProduct;
}
export type IRoutineProductWithRef = Ref<IRoutineProduct[]>;
