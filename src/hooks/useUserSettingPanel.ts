import type { InjectionKey } from "vue";
import type { IToggleUserSettingPanel } from "@/types/userSettingPanel";

export const hideDialogKey = Symbol(
  "IToggleUserSettingPanel"
) as InjectionKey<IToggleUserSettingPanel>;
