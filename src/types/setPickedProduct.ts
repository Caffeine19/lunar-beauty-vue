import type { IProduct } from "./product";

export interface SetPickedProduct {
  (product: IProduct): void;
}
