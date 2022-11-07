<template>
  <div
    class="bg-[url('./assets/images/Background.svg')] bg-cover bg-center h-screen w-screen"
  >
    <router-view></router-view>
    <!-- <flex-text></flex-text> -->
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { RouterView } from "vue-router";
import FlexText from "./components/FlexText.vue";
export default defineComponent({
  components: {
    RouterView,
    // FlexText,
  },
});
</script>
<style scoped>
body {
  @apply bg-zinc-50;
}
</style>
