import type { IRoutineItem } from "./routineItem";
export interface IRoutine {
  id: number;
  name: string;
  routineItems: IRoutineItem[];
  flowChartInfo: string;
}
