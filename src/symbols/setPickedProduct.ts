import type { InjectionKey } from "vue";
import type { SetPickedProduct } from "@/types/setPickedProduct";

export const setPickedProductKey = Symbol(
  "setPickedProductKey"
) as InjectionKey<SetPickedProduct>;
