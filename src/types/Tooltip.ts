export interface ITooltipInfo {
  status: boolean;
  content: string;
}

export interface ITooltipOption {
  info: ITooltipInfo;
  visible: boolean;
}
export interface IShowTooltip {
  (info: ITooltipInfo): void;
}
export interface IHideTooltip {
  (): void;
}
