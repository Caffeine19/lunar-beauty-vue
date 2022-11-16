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
import { userInfoKey } from "@/symbols/userInfoKey";
import { storeToRefs } from "pinia";

import { toggleUserSettingPanelKey } from "@/symbols/userSettingPanel";

import LunarTooltip from "./components/LunarTooltip.vue";
import type { ITooltipOption, ITooltipInfo } from "./types/Tooltip";
import {
  tooltipOptionKey,
  showTooltipKey,
  hideTooltipKey,
} from "./symbols/tooltip";

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

    return {
      tooltipOption,
    };
  },
});
</script>
<style scoped>
body {
  @apply bg-zinc-50;
}
</style>
