<template>
  <Transition name="fade">
    <div
      class="bg-zinc-900 border-zinc-700 fixed z-10 py-1.5 border-2 shadow-2xl"
      :style="{
        top: operatorMenuStyle?.y + 'px',
        left: operatorMenuStyle?.x + 'px',
        width: operatorMenuStyle?.w + 'px',
      }"
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
  </Transition>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";

import type { IOperatorButton } from "@/types/operatorButton";
interface IOperatorMenuStyle {
  x: number;
  y: number;
  w: number;
}
export default defineComponent({
  props: {
    operatorButtonOptions: {
      type: Array as PropType<IOperatorButton[]>,
    },
    operatorMenuStyle: {
      type: Object as PropType<IOperatorMenuStyle>,
    },
  },
  setup() {},
});
</script>
<style scoped>
.operator-section:not(:first-child) {
  @apply border-zinc-700 border-t-[1px];
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in;
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
