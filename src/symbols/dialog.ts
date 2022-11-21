import type { InjectionKey } from "vue";
import type { ISHowDialog, IHideDialog, IDialogOption } from "@/types/dialog";

export const dialogOptionKey = Symbol(
  "dialogOptionKey"
) as InjectionKey<IDialogOption>;

export const showDialogKey = Symbol(
  "showDialogKey"
) as InjectionKey<ISHowDialog>;

export const hideDialogKey = Symbol(
  "hideDialogKey"
) as InjectionKey<IHideDialog>;
