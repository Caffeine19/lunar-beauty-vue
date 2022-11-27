<template>
  <div
    class="hover:bg-zinc-900/10 hover:border-zinc-900 flex items-center justify-between p-1 transition-colors"
    :class="
      !disabled
        ? 'border-zinc-300  border-[1px]'
        : 'border-b-zinc-300 border-transparent border-[1px]'
    "
  >
    <input
      type="text"
      :value="givenValue"
      class="text-zinc-900 outline-0 flex-1 w-full text-lg font-medium bg-transparent"
      :disabled="disabled"
      @input="
        $emit('update:givenValue', ($event.target as HTMLInputElement).value)
      "
    />
    <i
      class="ph-pencil-simple-light transition-colors"
      style="font-size: 20px"
      :class="!disabled ? 'text-zinc-900 animate-pulse' : 'text-zinc-300'"
    ></i>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    givenValue: {},
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:givenValue"],
  setup() {},
});
</script>
<style></style>
