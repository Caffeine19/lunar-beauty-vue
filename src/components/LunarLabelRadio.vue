<template>
  <div
    class="group border-[1px] py-1 px-2 flex items-center justify-between transition-colors hover:bg-zinc-900/10 hover:border-zinc-900"
    :class="[
      givenValue == selectedValue
        ? 'border-zinc-900 bg-zinc-900/10'
        : 'border-zinc-300',
      disabled ? 'cursor-not-allowed' : 'cursor-pointer',
    ]"
    @click="clickHandler(givenValue)"
  >
    <slot></slot>
    <div
      class="flex items-center justify-center border-l-[1px] pl-2 transition-colors group-hover:border-zinc-900"
      :class="
        givenValue == selectedValue ? 'border-zinc-900' : 'border-zinc-300'
      "
    >
      <button
        class="box-border w-4 h-4 rounded-full transition-[colors,border-width] group-hover:border-zinc-900"
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
  props: {
    givenValue: { required: true },
    selectedValue: { required: true },
    disabled: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["update:selectedValue"],
  setup(props, { emit }) {
    const clickHandler = (newVal: unknown) => {
      if (!props.disabled) {
        emit("update:selectedValue", newVal);
      }
    };
    return {
      clickHandler,
    };
  },
});
</script>
<style></style>
