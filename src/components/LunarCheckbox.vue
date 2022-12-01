<template>
  <div class="flex items-center space-x-3">
    <button
      @click="$emit('update:checked', !checked)"
      :class="[
        checked
          ? checkBoxStyle.buttonStyle?.checked
          : checkBoxStyle.buttonStyle?.unchecked,
        checkBoxStyle.buttonStyle?.basic,
      ]"
      class="w-6 h-6 flex items-center justify-center rounded-sm border-[2px] transition-colors"
    >
      <svg
        v-if="checked"
        class="w-6 h-6"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          class="check-path"
          :class="checkBoxStyle.pathStyle"
          d="M5 16L13 23.5L27.5 9"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
    <p :class="checkBoxStyle.textStyle">{{ label }}</p>
  </div>
</template>
<script setup lang="ts">
export interface CheckBoxStyle {
  textStyle?: string;
  pathStyle?: string;
  buttonStyle?: {
    checked?: string;
    unchecked?: string;
    basic?: string;
  };
}
export interface Props {
  checked?: boolean;
  label: string;
  disabled?: boolean;
  checkBoxStyle?: CheckBoxStyle;
}

withDefaults(defineProps<Props>(), {
  checked: false,
  disabled: false,
  checkBoxStyle: () => ({
    textStyle: "text-zinc-50 text-base font-medium",
    pathStyle: "stroke-zinc-900",
    buttonStyle: {
      checked: "bg-zinc-50 hover:bg-zinc-50/90",
      unchecked: "hover:bg-zinc-50/10",
      basic: "border-zinc-50",
    },
  }),
});
defineEmits(["update:checked", "update:disabled"]);
</script>

<style scoped>
.check-path {
  stroke-dasharray: 200;
  stroke-dashoffset: 200;
  animation: dash 1.6s linear;
  animation-delay: 0.2s;
  animation-fill-mode: forwards;
}
@keyframes dash {
  from {
    stroke-dashoffset: 200;
  }
  to {
    stroke-dashoffset: 0;
  }
}
</style>
