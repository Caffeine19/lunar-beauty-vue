<template>
  <div
    class="border-b-[1px] h-1[1px]"
    :class="[margin, dividerColor, width]"
  ></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    margin: {
      type: String,
      default: "my-1",
    },
    dividerColor: {
      type: String,
      default: "border-zinc-700",
    },
    width: {
      type: String,
      default: "w-full",
    },
  },
});
</script>

<style scoped></style>
