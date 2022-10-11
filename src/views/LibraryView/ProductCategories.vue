<template>
  <div class="space-x-6 pl-2 grow flex items-center overflow-auto test">
    <button
      @click="setProductCategory(category)"
      v-for="(category, index) in productCategoryOption"
      :key="index"
      class="rounded-full py-1 px-4 border-[1px] border-zinc-900 transition-all flex flex-row space-x-2 items-center"
      :class="
        selectedProductCategory == category
          ? 'bg-zinc-900 text-zinc-50  hover:bg-zinc-900/80'
          : 'text-zinc-900 bg-transparent  hover:bg-zinc-900/10'
      "
    >
      <i
        class="ph-star-four-fill"
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

    const setProductCategory = (target: string) => {
      selectedProductCategory.value = target;
    };
    return {
      productCategoryOption,
      setProductCategory,
      selectedProductCategory,
    };
  },
});
</script>
<style>
.test::-webkit-scrollbar {
  display: none;
}
</style>
