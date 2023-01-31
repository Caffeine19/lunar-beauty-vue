<template>
  <div class="flex items-center" :class="checkBoxStyle.groupStyle?.gap">
    <button
      @click="toggleChecked"
      :class="[
        checked
          ? checkBoxStyle.buttonStyle?.checked
          : checkBoxStyle.buttonStyle?.unchecked,
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        checkBoxStyle.buttonStyle?.basic,
        checkBoxStyle.buttonStyle?.size,
      ]"
      class="flex items-center justify-center rounded-sm border-[2px] transition-colors"
    >
      <svg
        v-if="checked"
        :class="checkBoxStyle.buttonStyle?.size"
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
  groupStyle?: {
    gap?: string;
  };
  buttonStyle?: {
    checked?: string;
    unchecked?: string;
    basic?: string;
    size?: string;
  };
}
export interface Props {
  checked?: boolean;
  label: string;
  disabled?: boolean;
  checkBoxStyle?: CheckBoxStyle;
}

const props = withDefaults(defineProps<Props>(), {
  checked: false,
  disabled: false,
  checkBoxStyle: () => ({
    groupStyle: {
      gap: "space-x-3",
    },
    textStyle: "text-zinc-50 text-base font-medium",
    pathStyle: "stroke-zinc-900",
    buttonStyle: {
      checked: "bg-zinc-50 hover:bg-zinc-50/90",
      unchecked: "hover:bg-zinc-50/10",
      basic: "border-zinc-50",
      size: "w-8 h-8",
    },
  }),
});
const emit = defineEmits(["update:checked", "update:disabled"]);

const toggleChecked = () => {
  if (!props.disabled) {
    emit("update:checked", !props.checked);
  }
};
</script>

<style scoped>
.check-path {
  stroke-dasharray: 200;
  stroke-dashoffset: 200;
  animation: dash 1.2s linear;
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
