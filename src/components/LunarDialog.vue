<template>
  <div
    v-show="dialogOption?.visible"
    class="bg-zinc-900/30 fixed top-0 left-0 flex items-center justify-center w-full h-full"
  >
    <transition name="fade">
      <div
        v-show="dialogOption?.visible"
        class="bg-zinc-900 border-zinc-50/60 h-fit p-6 border-[1px] shadow-2xl"
      >
        <div class="flex items-center space-x-4">
          <i
            class="ph-warning-circle-fill text-zinc-50"
            style="font-size: 32px"
          ></i>
          <div class="space-y-3">
            <p class="libertinus-semibold text-zinc-50 text-2xl">
              Are you sure to delete this item?
            </p>
            <p class="text-zinc-300 text-base font-normal">
              It wont come back,perhaps.
            </p>
          </div>
        </div>
        <LunarDivider :margin="4"></LunarDivider>
        <div class="float-right space-x-4">
          <button
            @click="confirmClickHandler"
            class="bg-gradient-to-r from-champagne-800 to-champagne-900/80 hover:opacity-90 px-2 py-1 transition-opacity"
          >
            <p
              class="text-zinc-50 text-lg font-medium flex items-center space-x-1.5"
            >
              <i class="ph-check" style="font-size: 24px"></i
              ><span>Confirm</span>
            </p>
          </button>
          <button
            @click="cancelClickHandler"
            class="border-[1px] border-zinc-300 hover:bg-zinc-50/10 transition-colors px-2 py-1"
          >
            <p
              class="text-zinc-300 text-lg font-medium flex items-center space-x-1.5"
            >
              <i class="ph-x" style="font-size: 24px"></i><span>Cancel</span>
            </p>
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, watch } from "vue";

import { dialogOptionKey, hideDialogKey } from "@/symbols/dialog";

import LunarDivider from "./LunarDivider.vue";
export default defineComponent({
  components: { LunarDivider },
  setup() {
    const dialogOption = inject(dialogOptionKey);
    const hideDialog = inject(hideDialogKey);

    // watch(
    //   () => tooltipOption?.visible,
    //   () => {
    //     if (hideTooltip) hideTooltip();
    //   }
    // );

    const confirmClickHandler = () => {
      hideDialog ? hideDialog("confirm") : console.log("confirm");
    };

    const cancelClickHandler = () => {
      hideDialog ? hideDialog("cancel") : console.log("cancel");
    };
    return {
      dialogOption,
      confirmClickHandler,
      cancelClickHandler,
    };
  },
});
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-100px);
}

.fade-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}

/* .lunar-tooltip-content {
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.lunar-tooltip-content.succeeded {
  background-image: -webkit-linear-gradient(right, #e3e5ed, #b0b6c4);
}
.lunar-tooltip-content.failed {
  background-image: -webkit-linear-gradient(right, #dbc5cf, #c5b1b8);
} */
</style>
