<script setup lang="ts">
defineProps<{
  iconSize?: number;
}>();
</script>
<template>
  <div
    class="border-zinc-400 w-full text-zinc-500 border border-dashed flex justify-between items-center p-1.5 space-x-2"
  >
    <div class="border-zinc-500 flex items-center justify-end pr-2 border-r">
      <i class="ph-package" :style="{ fontSize: (iconSize || 32) + 'px' }"></i>
    </div>
    <p class="text-lg font-normal">EMPTY YET</p>
  </div>
</template>
<style scoped></style>
