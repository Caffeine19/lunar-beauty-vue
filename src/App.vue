<template>
  <div
    class="bg-[url('./assets/images/Background.png')] w-screen h-screen bg-cover bg-center flex flex-col"
  >
    <MyHeader></MyHeader>
    <div class="grow flex">
      <MySider></MySider>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import MyHeader from "@/components/MyHeader.vue";
import MySider from "@/components/MySider.vue";
export default defineComponent({
  components: { MyHeader, MySider },
});
</script>
<style scoped>
body {
  @apply bg-zinc-50;
}
</style>
