<script setup lang="ts">
import { inject, reactive } from "vue";

const isPickingProduct = inject("isPickingProduct");

const targetOption = reactive([
  { name: "Store", icon: "ph-package", action: "" },
  { name: "Routine", icon: "ph-map-trifold", action: "" },
]);
</script>
<template>
  <Transition name="fade">
    <div
      v-if="isPickingProduct"
      class="top-1/3 left-1/2 bg-zinc-900 divide-zinc-600 fixed py-2 -translate-x-1/2 divide-y-[1px] shadow-2xl rounded"
    >
      <button
        class="w-full py-0.5 group px-2 text-zinc-50 hover:bg-zinc-700 transition-colors flex space-x-1 items-center justify-between"
        v-for="(tab, index) in targetOption"
        :key="index"
        @click.stop="tab.action"
      >
        <i
          class="ph-arrow-right-light group-hover:opacity-100 opacity-0"
          style="font-size: 28px"
        ></i>
        <div class="grow flex items-center px-4 py-2 space-x-6">
          <i :class="tab.icon" style="font-size: 32px"></i>
          <p class="text-xl font-medium">{{ tab.name }}</p>
        </div>
        <i
          class="ph-arrow-left-light group-hover:opacity-100 opacity-0"
          style="font-size: 28px"
        ></i>
      </button></div
  ></Transition>
</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease-in;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to {
  opacity: 1;
}
.fade-leave-from {
  opacity: 1;
}
</style>
