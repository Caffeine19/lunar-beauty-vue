export interface IDialogOption {
  title: string;
  desc: string;
  visible: boolean;
  confirmCallback?: () => unknown;
  cancelCallback?: () => unknown;
}
export interface IShowDialog {
  (
    desc: string,
    title: string,
    confirmCallback?: () => unknown,
    cancelCallback?: () => unknown
  ): unknown;
}
export interface IHideDialog {
  (operationName: "confirm" | "cancel"): unknown;
}
