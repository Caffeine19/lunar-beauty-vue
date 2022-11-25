export interface IRoutineCreatePanelOption {
  visible: boolean;
  givenValue: string;
  confirmCallback?: (givenValue: string) => unknown;
  cancelCallback?: () => unknown;
}

export interface IShowRoutineCreatePanel {
  (
    confirmCallback?: (givenValue: string) => unknown,
    cancelCallback?: () => unknown
  ): unknown;
}
export interface IHideRoutineCreatePanel {
  (operationName: "confirm" | "cancel"): unknown;
}
