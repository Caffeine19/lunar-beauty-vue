export interface IEdge {
  id: number | string;
  label?: string;
  source: string;
  target: string;
  routineId: number;
  edgeType: EdgeType;
}
export enum EdgeType {
  PP = "PP",
  PI = "PI",
  II = "II",
}
