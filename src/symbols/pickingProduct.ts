import type { InjectionKey } from "vue";
import type { ToggleIsPickingProduct } from "@/types/pickingProduct";

export const toggleIsPickingProductKey = Symbol(
  "toggleIsPickingProductKey"
) as InjectionKey<ToggleIsPickingProduct>;
