<template>
  <div class="grow p-6">
    <div class="flex items-center justify-between">
      <p class="text-zinc-900 text-2xl font-semibold">Routine</p>
      <div class="flex space-x-2">
        <button class="text-zinc-900">
          <i class="ph-kanban" style="font-size: 28px"></i>
        </button>
        <button class="text-zinc-900">
          <i class="ph-table" style="font-size: 28px"></i>
        </button>
        <button class="text-zinc-900">
          <i class="ph-graph" style="font-size: 28px"></i>
        </button>
        <div class="flex items-center">
          <div class="w-[1px] border-l-[1px] border-zinc-900 h-4/5"></div>
        </div>
        <button class="text-zinc-900">
          <i class="ph-faders" style="font-size: 28px"></i>
        </button>
        <button class="text-zinc-900">
          <i class="ph-sort-ascending" style="font-size: 28px"></i>
        </button>
      </div>
    </div>
    <div class="h-[1px] w-full border-t-[1px] border-zinc-900 my-2"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  setup() {
    const test = () => {};
  },
});
</script>
<style></style>
