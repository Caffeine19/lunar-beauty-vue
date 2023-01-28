export interface ITooltipInfo<T = unknown> {
  status: boolean;
  content: string;
  data?: T;
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
