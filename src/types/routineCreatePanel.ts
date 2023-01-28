export type IRoutineCreatePanelOption = {
  visible: boolean;
  givenValue: string;
  confirmCallback?: (givenValue: string) => unknown;
  cancelCallback?: () => unknown;
};

export interface IShowRoutineCreatePanel {
  (
    confirmCallback?: IRoutineCreatePanelOption["confirmCallback"],
    cancelCallback?: IRoutineCreatePanelOption["cancelCallback"]
  ): unknown;
}
export interface IHideRoutineCreatePanel {
  (operationName: "confirm" | "cancel"): unknown;
}
