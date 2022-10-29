import type { IRoutineProduct } from "./routineProduct";
export interface IRoutine {
  id: number;
  name: string;
  routineProducts: IRoutineProduct[];
  flowChartInfo: string;
}

