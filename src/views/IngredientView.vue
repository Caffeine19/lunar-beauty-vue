<template>
  <div class="p-6">
    <p class="font-zinc-900 text-4xl font-medium">
      {{ route.query.ingredientName }}
    </p>
    <div class="flex items-center">
      <div class="bg-zinc-900/10 w-8 h-full my-4"></div>
      <p class="text-zinc-700 text-lg font-normal">
        The second argument is the callback that will be called when the source
        changes. The callback receives three arguments: the new value, the old
        value, and a function for registering a side effect cleanup callback.
        The cleanup callback will be called right before the next time the
        effect is re-run, and can be used to clean up invalidated side effects,
        e.g. a pending async request.
      </p>
    </div>
    <div
      class="pt-16 justify-between gap-x-4 gap-y-4 grid test grid-cols-[repeat(auto-fill,230px)] overflow-y-scroll product-overview-container"
    >
      <ProductOverView
        v-for="product in relatedProductList"
        :key="product.id"
        v-bind="product"
      >
      </ProductOverView>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useRoute } from "vue-router";

import ProductOverView from "@/components/ProductOverview.vue";

import { storeToRefs } from "pinia";
import useProductStore from "@/stores/useProductStore";
export default defineComponent({
  setup() {
    const route = useRoute();
    const productStore = useProductStore();

    const { relatedProductList } = storeToRefs(productStore);
    onMounted(async () => {
      if (route.query.ingredientId) {
        console.log(123);
        await productStore.getIngredientRelatedProduct(
          parseInt(route.query.ingredientId.toString())
        );
      }
    });
    return {
      route,
      relatedProductList,
    };
  },
  components: {
    ProductOverView,
  },
});
</script>
<style></style>
