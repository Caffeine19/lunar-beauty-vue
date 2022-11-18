import type { InjectionKey, Ref } from "vue";
import type { IUser } from "@/types/user";

export const userInfoKey = Symbol("userInfoKey") as InjectionKey<Ref<IUser>>;
