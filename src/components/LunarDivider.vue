<template>
  <div
    class="border-b-[1px] h-1[1px]"
    :class="['my-' + margin, dividerColor, width]"
  ></div>
  <div
    class="w-[1px] border-l-[1px]"
    :class="['mx-' + margin, dividerColor, height]"
  ></div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
export default defineComponent({
  props: {
    margin: {
      type: Number,
      default: 1,
    },
    dividerColor: {
      type: String,
      default: "border-zinc-700",
    },
    width: {
      type: String,
      default: "w-full",
    },
    height: {
      type: String,
      default: "h-4/5",
    },
    type: {
      type: String as PropType<"vertical" | "horizontal">,
      default: "horizontal",
    },
  },
});
</script>

<style scoped></style>
