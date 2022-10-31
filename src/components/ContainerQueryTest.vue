<template>
  <div class="@container h-32 p-8 bg-red-300" :width="width + 'vw'">
    <div class="bg-red-700 @lg:bg-blue-300 w-full h-full"></div>
  </div>
</template>
<script lang="ts">
import { ref } from "vue";

export default {
  setup() {
    const width = ref(60);
    return { width };
  },
};
</script>
<style></style>
