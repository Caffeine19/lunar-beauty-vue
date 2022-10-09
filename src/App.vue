<template>
  <div
    class="bg-[url('./assets/images/Background.png')] w-screen h-screen bg-cover bg-center"
  >
    <MyHeader></MyHeader>
    <h1 class="text-4xl text-red-700">HI</h1>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import MyHeader from "@/components/MyHeader.vue";
export default defineComponent({
  components: { MyHeader },
});
</script>
<style scoped>
body {
  @apply bg-zinc-50;
}
</style>
