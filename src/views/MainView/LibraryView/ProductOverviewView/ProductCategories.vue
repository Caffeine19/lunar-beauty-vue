<template>
  <div
    class="grow test product-categories-container flex items-center pl-2 space-x-6 overflow-auto"
  >
    <button
      @click="
        changeProductCategory(category),
          $emit('clickCategory', selectedProductCategory)
      "
      v-for="(category, index) in productCategoryOption"
      :key="index"
      class="border-zinc-900 flex flex-row items-center px-4 py-1 transition-colors border rounded-full"
      :class="
        selectedProductCategory == category
          ? 'bg-zinc-900 text-zinc-50  hover:bg-zinc-900/80'
          : 'text-zinc-900 bg-transparent  hover:bg-zinc-900/10'
      "
    >
      <i
        class="ph-star-four-fill text-zinc-50 mr-2"
        style="font-size: 18px"
        v-show="selectedProductCategory == category"
      ></i>
      <p class="text-lg font-normal">{{ category }}</p>
    </button>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
  emits: ["clickCategory"],
  setup() {
    const productCategoryOption = reactive([
      "All",
      "Sunscreen",
      "Lotion",
      "Cream",
      "Cleanser",
      "Serum",
      "Shampoo",
      "BodyWash",
      "Mask",
      "LipStick",
    ]);
    const selectedProductCategory = ref("All");

    const changeProductCategory = (target: string) => {
      selectedProductCategory.value = target;
    };
    return {
      productCategoryOption,
      changeProductCategory,
      selectedProductCategory,
    };
  },
});
</script>
<style>
.product-categories-container::-webkit-scrollbar {
  display: none;
}
</style>
