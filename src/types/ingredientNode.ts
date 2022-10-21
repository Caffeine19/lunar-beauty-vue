import type { XYPosition } from "@vue-flow/core";

export interface IIngredientNode {
  id: number | string;
  label: string;
  productNodeId: number;
  position?: XYPosition;
  x?: XYPosition["x"];
  y?: XYPosition["y"];
}
