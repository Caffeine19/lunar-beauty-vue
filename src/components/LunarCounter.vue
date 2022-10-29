<template>
  <div class="flex items-center space-x-3">
    <button class="operator-button" @click="minus">
      <i class="ph-minus-light" style="font-size: 20px"></i>
    </button>

    <p class="num-input">{{ modelValue }}</p>
    <button class="operator-button" @click="plus">
      <i class="ph-plus-light" style="font-size: 20px"></i>
    </button>
  </div>
</template>
<script lang="ts">
export default {
  props: ["modelValue"],
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const plus = () => {
      const newVal = props.modelValue + 1;
      emit("update:modelValue", newVal);
    };
    const minus = () => {
      if (props.modelValue >= 0) {
        const newVal = props.modelValue - 1;
        emit("update:modelValue", newVal);
      }
    };
    return {
      plus,
      minus,
    };
  },
};
</script>
<style>
.operator-button {
  @apply p-0.5 rounded-full border-[1px] border-zinc-600 text-zinc-600 transition-colors hover:bg-zinc-900/10 hover:text-zinc-900 hover:border-zinc-900 flex items-center justify-center;
}
.num-input {
  @apply text-zinc-900 hover:underline hover:decoration-zinc-900 text-base font-medium transition-all;
}
</style>
