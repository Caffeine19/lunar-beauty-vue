<template>
  <div class="grow flex"><router-view></router-view></div>
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

<style scoped></style>
