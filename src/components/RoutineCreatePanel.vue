<template>
  <Transition name="fade">
    <div
      v-if="routineCreatePanelOption?.visible"
      ref="routineCreatePanelRef"
      class="top-1/3 left-1/2 bg-zinc-50/70 border-zinc-200 backdrop-blur-xl fixed p-6 -translate-x-1/2 border shadow-2xl"
    >
      <div class="text-zinc-900 flex items-center mb-6 space-x-4">
        <i class="ph-map-trifold" style="font-size: 28px"></i>
        <p class="text-xl">New Routine</p>
      </div>

      <LunarInput
        v-model:given-value="routineCreatePanelOption.givenValue"
      ></LunarInput
      ><LunarDivider :margin="4" divider-color="border-zinc-300"></LunarDivider>
      <div class="space-x-6">
        <button
          @click="confirmClickHandler"
          class="bg-gradient-to-r from-champagne-800 to-champagne-900/80 hover:opacity-90 px-2 py-1 transition-opacity"
        >
          <p
            class="text-zinc-50 text-lg font-medium flex items-center space-x-1.5"
          >
            <i class="ph-check" style="font-size: 24px"></i><span>Confirm</span>
          </p>
        </button>
        <button
          @click="cancelClickHandler"
          class="border-zinc-900 hover:bg-zinc-900/10 px-2 py-1 transition-colors border"
        >
          <p
            class="text-zinc-900 text-lg font-medium flex items-center space-x-1.5"
          >
            <i class="ph-x" style="font-size: 24px"></i><span>Cancel</span>
          </p>
        </button>
      </div>
    </div></Transition
  >
</template>
<script lang="ts">
import { defineComponent, inject, ref } from "vue";
import { onClickOutside } from "@vueuse/core";

import LunarInput from "./LunarInput.vue";
import LunarDivider from "./LunarDivider.vue";
import {
  hideRoutineCreatePanelKey,
  routineCreatePanelOptionKey,
} from "@/symbols/routineCreatePanel";
export default defineComponent({
  setup() {
    const routineCreatePanelOption = inject(routineCreatePanelOptionKey);
    const hideRoutineCreatePanel = inject(hideRoutineCreatePanelKey);

    const confirmClickHandler = () => {
      (hideRoutineCreatePanel
        ? hideRoutineCreatePanel
        : () => {
            console.log("missing hideRoutineCreatePanelKey inject");
          })("confirm");
    };

    const cancelClickHandler = () => {
      (hideRoutineCreatePanel
        ? hideRoutineCreatePanel
        : () => {
            console.log("missing hideRoutineCreatePanelKey inject");
          })("cancel");
    };

    const routineCreatePanelRef = ref<HTMLElement | null>(null);

    onClickOutside(routineCreatePanelRef, () => {
      cancelClickHandler();
    });

    return {
      routineCreatePanelOption,
      confirmClickHandler,
      cancelClickHandler,
      routineCreatePanelRef,
    };
  },
  components: { LunarInput, LunarDivider },
});
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.1s ease;
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
