<template>
  <div class="border-t-[1px] border-zinc-900 flex justify-end">
    <div
      class="text-zinc-900 flex items-center p-3 space-x-4 border-r-[1px] border-zinc-900"
    >
      <p class="text-lg font-normal">Items per page:</p>

      <button class="flex items-center space-x-2">
        <p class="font-medium">10</p>
        <i class="ph-caret-down" style="font-size: 28px"></i>
      </button>
    </div>
    <div class="text-zinc-900 p-3 border-r-[1px] border-zinc-900 pr-8">
      <p class="text-lg font-normal">1-10 of 103 items</p>
    </div>
    <div
      class="text-zinc-900 flex items-center p-3 space-x-4 border-r-[1px] border-zinc-900"
    >
      <button class="flex items-center space-x-2">
        <p class="font-medium">1</p>
        <i class="ph-caret-down" style="font-size: 28px"></i>
      </button>
      <p class="text-lg font-normal">of 11 pages</p>
    </div>

    <button
      class="flex items-center border-r-[1px] border-zinc-900 p-3 text-zinc-900"
    >
      <i class="ph-caret-left-fill" style="font-size: 28px"></i>
    </button>
    <button class="text-zinc-900 flex items-center p-3">
      <i class="ph-caret-right-fill" style="font-size: 28px"></i>
    </button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({});
</script>
<style scoped></style>
