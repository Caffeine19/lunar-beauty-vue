<template>
  <div
    class="border-[1px] py-1 px-2 flex items-center justify-between cursor-pointer transition-colors"
    :class="
      givenValue == selectedValue
        ? 'border-zinc-900 bg-zinc-900/10'
        : 'border-zinc-300'
    "
    @click="$emit('update:selectedValue', givenValue)"
  >
    <slot></slot>
    <div
      class="flex items-center justify-center border-l-[1px] pl-2 transition-colors"
      :class="
        givenValue == selectedValue ? 'border-zinc-900' : 'border-zinc-300'
      "
    >
      <button
        class="box-border w-4 h-4 rounded-full transition-[colors,border-width]"
        :class="
          givenValue == selectedValue
            ? 'border-zinc-900 border-[5px]'
            : 'border-zinc-300 border-[1px]'
        "
      ></button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: ["givenValue", "selectedValue"],
  emits: ["update:selectedValue"],
  setup() {},
});
</script>
<style></style>
