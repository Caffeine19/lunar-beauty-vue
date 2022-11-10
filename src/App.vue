<template>
  <div
    class="bg-[url('./assets/images/Background.svg')] bg-cover bg-center h-screen w-screen"
  >
    <RouterView></RouterView>
    <UserSettingPanel v-if="true"></UserSettingPanel>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { RouterView } from "vue-router";

import UserSettingPanel from "@/components/UserSettingPanel.vue";
export default defineComponent({
  components: {
    RouterView,
    UserSettingPanel,
  },
});
</script>
<style scoped>
body {
  @apply bg-zinc-50;
}
</style>
