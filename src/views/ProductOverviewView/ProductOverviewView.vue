<template>
  <div class="grow relative flex flex-col px-8 pb-8 space-y-8 overflow-hidden">
    <div class="backdrop-blur-2xl absolute top-0 left-0 w-full p-6">
      <div
        class="divide-zinc-600 shrink-0 flex items-center overflow-hidden divide-x"
      >
        <button>
          <i
            class="ph-faders text-zinc-900 pr-2 font-normal"
            style="font-size: 32px"
          >
          </i>
        </button>
        <ProductCategories @click-category="changeCategory"></ProductCategories>
      </div>
    </div>

    <div
      class="pt-16 justify-between gap-x-4 gap-y-4 grid test grid-cols-[repeat(auto-fill,230px)] overflow-y-scroll product-overview-container"
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
import { defineComponent, onMounted } from "vue";

import ProductCategories from "./ProductCategories.vue";
import ProductOverView from "@/components/ProductOverview.vue";

import { storeToRefs } from "pinia";
import useProductStore from "@/stores/useProductStore";

export default defineComponent({
  setup() {
    const productStore = useProductStore();
    const { productOverviewList } = storeToRefs(productStore);
    onMounted(async () => {
      if (productOverviewList.value.length == 0)
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
