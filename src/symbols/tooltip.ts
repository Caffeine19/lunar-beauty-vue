import type { InjectionKey } from "vue";
import type {
  ITooltipOption,
  IShowTooltip,
  IHideTooltip,
} from "@/types/tooltip";

export const tooltipOptionKey = Symbol(
  "tooltipOptionKey"
) as InjectionKey<ITooltipOption>;

export const showTooltipKey = Symbol(
  "showTooltipKey"
) as InjectionKey<IShowTooltip>;
export const hideTooltipKey = Symbol(
  "hideTooltipKey"
) as InjectionKey<IHideTooltip>;
