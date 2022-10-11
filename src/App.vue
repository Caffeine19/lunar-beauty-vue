<template>
  <div><router-view></router-view></div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { RouterView } from "vue-router";
export default defineComponent({
  components: {
    RouterView,
  },
});
</script>
<style scoped>
body {
  @apply bg-zinc-50;
}
</style>
