import type { IIngredientNode } from "./ingredientNode";

import type { XYPosition } from "@vue-flow/core";
export interface IProductNode {
  id: number | string;
  label: string;
  routineProductId: number;
  ingredientNodes?: IIngredientNode[];
  position?: XYPosition;
  x?: XYPosition["x"];
  y?: XYPosition["y"];
  showChildren: boolean;
}
