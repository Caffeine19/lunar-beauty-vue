<template>
  <div class="fixed top-0 left-0 flex justify-center w-full">
    <transition name="fade">
      <div
        v-if="tooltipOption?.visible"
        class="bg-zinc-900/90 border-zinc-50/60 backdrop-blur-2xl h-fit flex items-center p-4 mt-8 border-[1px] rounded-full shadow-2xl"
      >
        <p
          :class="tooltipOption?.info.status ? 'succeeded' : ' failed'"
          class="lunar-tooltip-content flex items-center space-x-4"
        >
          <i
            class="text-zinc-50 lunar-tooltip-content"
            style="font-size: 32px"
            :class="
              tooltipOption?.info.status
                ? 'ph-confetti-fill '
                : 'ph-bug-beetle-fill'
            "
          ></i>
          <span
            class="text-zinc-50 lunar-tooltip-content text-2xl font-semibold"
          >
            {{ tooltipOption?.info.content }}
          </span>
        </p>
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, watch } from "vue";

import { tooltipOptionKey, hideTooltipKey } from "@/symbols/tooltip";
export default defineComponent({
  setup() {
    const tooltipOption = inject(tooltipOptionKey);
    const hideTooltip = inject(hideTooltipKey);

    watch(
      () => tooltipOption?.visible,
      () => {
        if (hideTooltip) hideTooltip();
      }
    );
    return {
      tooltipOption,
      hideTooltip,
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

.lunar-tooltip-content {
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.lunar-tooltip-content.succeeded {
  background-image: -webkit-linear-gradient(right, #e3e5ed, #b0b6c4);
}
.lunar-tooltip-content.failed {
  background-image: -webkit-linear-gradient(right, #dbc5cf, #c5b1b8);
}
</style>
