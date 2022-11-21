<template>
  <div
    class="bg-[url('./assets/images/Background.svg')] bg-cover bg-center h-screen w-screen"
  >
    <RouterView></RouterView>
    <LunarTooltip></LunarTooltip>
  </div>
</template>
<script lang="ts">
import { defineComponent, provide, reactive, ref } from "vue";

import { RouterView } from "vue-router";

import useUserStore from "./stores/useUserStore";
import { userInfoKey } from "@/symbols/userInfo";
import { storeToRefs } from "pinia";

import { toggleUserSettingPanelKey } from "@/symbols/userSettingPanel";

import LunarTooltip from "./components/LunarTooltip.vue";
import type { ITooltipOption, ITooltipInfo } from "./types/tooltip";
import {
  tooltipOptionKey,
  showTooltipKey,
  hideTooltipKey,
} from "./symbols/tooltip";

import type { IDialogOption, IHideDialog, ISHowDialog } from "./types/dialog";
import {
  dialogOptionKey,
  showDialogKey,
  hideDialogKey,
} from "@/symbols/dialog";

export default defineComponent({
  components: {
    RouterView,
    LunarTooltip,
  },
  setup() {
    /*provide userInfo*/
    const userStore = useUserStore();
    const { userInfo } = storeToRefs(userStore);
    provide(userInfoKey, userInfo);

    /*provide the user setting panel*/
    const openingUserSettingPanel = ref(false);
    provide("openingUserSettingPanel", openingUserSettingPanel);
    const toggleOpeningUserSettingPanel = (flag: boolean) => {
      openingUserSettingPanel.value = flag;
    };
    provide(toggleUserSettingPanelKey, toggleOpeningUserSettingPanel);

    /*provide the tooltip*/
    const tooltipOption = reactive<ITooltipOption>({
      info: {
        status: false,
        content: "",
      },
      visible: false,
    });
    provide(tooltipOptionKey, tooltipOption);

    const showTooltip = (info: ITooltipInfo) => {
      tooltipOption.info = info;
      tooltipOption.visible = true;
    };
    provide(showTooltipKey, showTooltip);

    const hideTooltip = () => {
      setTimeout(() => {
        tooltipOption.visible = false;
      }, 2000);
    };
    provide(hideTooltipKey, hideTooltip);

    /*provide the dialog*/
    const dialogOption = reactive<IDialogOption>({
      title: "",
      desc: "",
      visible: false,
    });
    provide(dialogOptionKey, dialogOption);

    const showDialog: ISHowDialog = (
      desc: string,
      title: string,
      confirmCallback?: () => unknown,
      cancelCallback?: () => unknown
    ) => {
      dialogOption.title = title;
      dialogOption.desc = desc;
      dialogOption.confirmCallback = confirmCallback;
      dialogOption.cancelCallback = cancelCallback;
    };
    provide(showDialogKey, showDialog);

    const hideDialog: IHideDialog = (operationName: "confirm" | "cancel") => {
      dialogOption.visible = false;
      if (operationName == "confirm" && dialogOption.confirmCallback) {
        dialogOption.confirmCallback();
        dialogOption.confirmCallback = undefined;
      }

      if (operationName == "cancel" && dialogOption.cancelCallback) {
        dialogOption.cancelCallback();
        dialogOption.cancelCallback = undefined;
      }
    };
    provide(hideDialogKey, hideDialog);
    return { dialogOption };
  },
});
</script>
<style scoped>
body {
  @apply bg-zinc-50;
}
</style>
