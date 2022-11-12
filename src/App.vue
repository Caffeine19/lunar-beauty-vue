<template>
  <div
    class="bg-[url('./assets/images/Background.svg')] bg-cover bg-center h-screen w-screen"
  >
    <RouterView></RouterView>
    <UserSettingPanel></UserSettingPanel>
    <LunarTooltip></LunarTooltip>
  </div>
</template>
<script lang="ts">
import { defineComponent, provide, reactive, ref } from "vue";

import { RouterView } from "vue-router";

import UserSettingPanel from "@/components/UserSettingPanel.vue";
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
    UserSettingPanel,
    LunarTooltip,
  },
  setup() {
    const openingUserSettingPanel = ref(false);
    provide("openingUserSettingPanel", openingUserSettingPanel);
    const toggleOpeningUserSettingPanel = (flag: boolean) => {
      openingUserSettingPanel.value = flag;
    };
    provide(toggleUserSettingPanelKey, toggleOpeningUserSettingPanel);

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
