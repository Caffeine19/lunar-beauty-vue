<template>
  <div
    class="bg-zinc-900 border-zinc-700 absolute z-10 py-1.5 border-2 shadow-2xl"
  >
    <button
      v-for="(button, index) in operatorButtonOptions"
      :key="index"
      class="text-zinc-50 space-x-7 hover:bg-zinc-700 operator-section flex items-center w-full px-4 py-2 transition-colors"
      @click="button.action"
    >
      <i :class="button.iconClass" style="font-size: 24px"></i>
      <p class="text-base font-normal">{{ button.name }}</p>
    </button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";

import type { IOperatorButton } from "@/types/operatorButton";
export default defineComponent({
  props: {
    operatorButtonOptions: {
      type: Array as PropType<IOperatorButton[]>,
    },
  },
  setup() {},
});
</script>
<style>
.operator-section:not(:first-child) {
  @apply border-zinc-700 border-t-[1px];
}
</style>
