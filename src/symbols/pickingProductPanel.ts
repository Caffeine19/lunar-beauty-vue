import type { InjectionKey } from "vue";
import type { togglePickingProductPanel } from "@/types/pickingProductPanel";

export const togglePickingProductPanelKey = Symbol(
  "togglePickingProductPanelKey"
) as InjectionKey<togglePickingProductPanel>;
