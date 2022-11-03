<template>
  <div
    class="bg-[url('./assets/images/Background.svg')] bg-cover bg-center h-screen w-screen"
  >
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { RouterView } from "vue-router";

export default defineComponent({
  components: {
    RouterView,
  },
});
</script>
<style scoped>
body {
  @apply bg-zinc-50;
}
</style>
