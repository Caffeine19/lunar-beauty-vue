<template>
  <div class="flex overflow-hidden">
    <router-view></router-view>
    <PickToPanel></PickToPanel>
    <PickingProductPanel></PickingProductPanel>
  </div>
</template>

<script setup lang="ts">
import { provide, ref } from "vue";
import { RouterView } from "vue-router";

import { togglePickToPanelKey } from "@/symbols/pickToPanel";
import PickToPanel from "./PickToPanel.vue";

import { togglePickingProductPanelKey } from "@/symbols/pickingProductPanel";
import PickingProductPanel from "./PickingProductPanel.vue";

import { setPickedProductKey } from "@/symbols/setPickedProduct";
import type { IProduct } from "@/types/product";

const showingPickToPanel = ref(false);
const togglePickToPanel = (flag: boolean) => {
  showingPickToPanel.value = flag;
};

provide("showingPickToPanel", showingPickToPanel);
provide(togglePickToPanelKey, togglePickToPanel);

const showingPickingProductPanel = ref(false);
const togglePickingProductPanel = (flag: boolean) => {
  showingPickingProductPanel.value = flag;
};
provide("showingPickingProductPanel", showingPickingProductPanel);
provide(togglePickingProductPanelKey, togglePickingProductPanel);

const pickedProduct = ref<null | IProduct>(null);
provide("pickedProduct", pickedProduct);
const setPickedProduct = (product: IProduct) => {
  pickedProduct.value = product;
};
provide(setPickedProductKey, setPickedProduct);
</script>

<style scoped></style>
