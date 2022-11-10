<template>
  <div
    class="bg-[url('./assets/images/Background.svg')] bg-cover bg-center h-screen w-screen"
  >
    <RouterView></RouterView>
    <UserSettingPanel v-if="true"></UserSettingPanel>
  </div>
</template>
<script lang="ts">
import { defineComponent, provide, ref } from "vue";
import { RouterView } from "vue-router";

import UserSettingPanel from "@/components/UserSettingPanel.vue";
import { toggleUserSettingPanelKey } from "@/symbols/userSettingPanel";
export default defineComponent({
  components: {
    RouterView,
    UserSettingPanel,
  },
  setup() {
    const openingUserSettingPanel = ref(false);
    provide("openingUserSettingPanel", openingUserSettingPanel);
    const toggleOpeningUserSettingPanel = (flag: boolean) => {
      openingUserSettingPanel.value = flag;
    };
    provide(toggleUserSettingPanelKey, toggleOpeningUserSettingPanel);
  },
});
</script>
<style scoped>
body {
  @apply bg-zinc-50;
}
</style>
