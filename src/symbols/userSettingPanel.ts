import type { InjectionKey } from "vue";
import type { IToggleUserSettingPanel } from "@/types/userSettingPanel";

export const toggleUserSettingPanelKey = Symbol(
  "IToggleUserSettingPanel"
) as InjectionKey<IToggleUserSettingPanel>;
