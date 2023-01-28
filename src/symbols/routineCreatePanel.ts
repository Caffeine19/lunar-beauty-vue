import type {
  IHideRoutineCreatePanel,
  IRoutineCreatePanelOption,
  IShowRoutineCreatePanel,
} from "@/types/routineCreatePanel";
import type { InjectionKey } from "vue";

export const routineCreatePanelOptionKey = Symbol(
  "routineCreatePanelOptionKey"
) as InjectionKey<IRoutineCreatePanelOption>;

export const showRoutineCreatePanelKey = Symbol(
  "showRoutineCreatePanel"
) as InjectionKey<IShowRoutineCreatePanel>;

export const hideRoutineCreatePanelKey = Symbol(
  "hideRoutineCreatePanelKey"
) as InjectionKey<IHideRoutineCreatePanel>;
