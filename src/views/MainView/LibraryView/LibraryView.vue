<template>
  <div class="flex overflow-hidden">
    <router-view></router-view> <AddingToPanel></AddingToPanel>
  </div>
</template>

<script setup lang="ts">
import { provide, ref } from "vue";
import { RouterView } from "vue-router";

import { toggleIsPickingProductKey } from "@/symbols/pickingProduct";
import AddingToPanel from "./PickToPanel.vue";

const isPickingProduct = ref(false);

const toggleIsPickingProduct = (flag: boolean) => {
  isPickingProduct.value = flag;
};

provide("isPickingProduct", isPickingProduct);
provide(toggleIsPickingProductKey, toggleIsPickingProduct);
</script>

<style scoped></style>
