<template>
  <div
    class="bg-[url('./assets/images/Background.svg')] bg-cover bg-center h-screen w-screen"
  >
    <container-query-test v-if="false"></container-query-test>
    <router-view></router-view>
    <test-axios></test-axios>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { RouterView } from "vue-router";

import ContainerQueryTest from "@/components/ContainerQueryTest.vue";

import TestAxios from "./components/TestAxios.vue";
export default defineComponent({
  components: {
    RouterView,
    ContainerQueryTest,
    TestAxios,
  },
});
</script>
<style scoped>
body {
  @apply bg-zinc-50;
}
</style>
