import type { IRoutingProduct } from "./routineProduct";
export interface IRoutine {
  id: number;
  name: string;
  routineProducts: IRoutingProduct[];
}
