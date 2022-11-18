import type { InjectionKey } from "vue";
import type { IToggleUserSettingPanel } from "@/types/userSettingPanel";

export const toggleUserSettingPanelKey = Symbol(
  "toggleUserSettingPanelKey"
) as InjectionKey<IToggleUserSettingPanel>;
