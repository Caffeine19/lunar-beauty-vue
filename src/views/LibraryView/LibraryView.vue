<template>
  <div class="px-6 pb-6 grow overflow-hidden space-y-8 flex flex-col relative">
    <div class="top-0 left-0 w-full absolute p-6 backdrop-blur-2xl">
      <div
        class="flex items-center overflow-hidden divide-x divide-zinc-600 shrink-0"
      >
        <button>
          <i
            class="ph-faders text-zinc-900 font-normal pr-2"
            style="font-size: 32px"
          >
          </i>
        </button>
        <ProductCategories @click-category="changeCategory"></ProductCategories>
      </div>
    </div>

    <div
      class="pt-16 justify-between gap-x-4 gap-y-4 grid test grid-cols-[repeat(auto-fill,250px)] overflow-y-scroll product-overview-container"
    >
      <ProductOverView
        v-for="product in productOverviewList"
        :key="product.id"
        v-bind="product"
      >
      </ProductOverView>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

import ProductCategories from "./ProductCategories.vue";
import ProductOverView from "@/components/ProductOverview.vue";

import { storeToRefs } from "pinia";
import useProductStore from "@/stores/useProductStore";
export default defineComponent({
  setup() {
    const productStore = useProductStore();
    const { productOverviewList } = storeToRefs(productStore);
    onMounted(async () => {
      await productStore.getProductOverviewList("All");
    });

    const changeCategory = async (category: string) => {
      await productStore.getProductOverviewList(category);
    };

    return {
      productOverviewList,
      changeCategory,
    };
  },
  components: {
    ProductCategories,
    ProductOverView,
  },
});
</script>
<style scoped>
.product-overview-container::-webkit-scrollbar {
  display: none;
}
</style>
