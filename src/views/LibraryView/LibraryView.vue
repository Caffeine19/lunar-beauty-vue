<template>
  <div class="p-6 grow overflow-hidden space-y-8">
    <div class="flex items-center overflow-hidden divide-x divide-zinc-600">
      <button>
        <i
          class="ph-faders text-zinc-900 font-normal pr-2"
          style="font-size: 32px"
        >
        </i>
      </button>
      <ProductCategories></ProductCategories>
    </div>
    <div><ProductOverView></ProductOverView></div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

import ProductCategories from "./ProductCategories.vue";
import ProductOverView from "@/components/ProductOverview.vue";

import useProductStore from "@/stores/useProductStore";
export default defineComponent({
  setup() {
    const productStore = useProductStore();
  },
  components: {
    ProductCategories,
    ProductOverView,
  },
});
</script>
<style lang=""></style>
