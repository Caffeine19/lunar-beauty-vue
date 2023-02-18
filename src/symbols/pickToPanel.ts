import type { InjectionKey } from "vue";
import type { TogglePickToPanel } from "@/types/pickToPanel";

export const togglePickToPanelKey = Symbol(
  "togglePickToPanelKey"
) as InjectionKey<TogglePickToPanel>;
