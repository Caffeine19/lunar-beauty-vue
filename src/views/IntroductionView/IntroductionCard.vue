<template>
  <div
    class="p-6 space-y-6 rounded-md max-w-[360px] hover:shadow-xl"
    :class="cardClass"
    ref="target"
    :style="{
      transform: cardTransition,
      transition: 'transform 0.2s ease-out',
    }"
  >
    <div class="w-fit flex p-3 rounded-full" :class="iconContainerClass">
      <i class="text-white" style="font-size: 48px" :class="iconClass"></i>
    </div>
    <div class="space-y-3">
      <p class="text-lg font-medium" :class="titleClass">
        {{ title }}
      </p>
      <p class="text-base font-normal" :class="contentClass">
        {{ content }}
      </p>
    </div>
  </div>
</template>
<script lang="ts">
import { ref, computed } from "vue";
import { useMouseInElement } from "@vueuse/core";
export default {
  props: {
    iconClass: String,
    iconContainerClass: String,
    title: String,
    content: String,
    cardClass: String,
    titleClass: String,
    contentClass: String,
  },
  setup() {
    const target = ref(null);

    const { elementX, elementY, isOutside, elementHeight, elementWidth } =
      useMouseInElement(target);

    const cardTransition = computed(() => {
      const MAX_ROTATION = 8;
      const rX = (
        MAX_ROTATION / 2 -
        (elementY.value / elementHeight.value) * MAX_ROTATION
      ).toFixed(2); // handles x-axis
      const rY = (
        (elementX.value / elementWidth.value) * MAX_ROTATION -
        MAX_ROTATION / 2
      ).toFixed(2); // handles y-axis
      return isOutside.value
        ? ""
        : `perspective(${elementWidth.value}px) rotateX(${rX}deg) rotateY(${rY}deg)`;
    });
    return {
      target,
      cardTransition,
    };
  },
};
</script>
<style></style>
