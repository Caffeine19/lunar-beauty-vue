<template>
  <div class="grow relative flex flex-col justify-between overflow-hidden">
    <div class="backdrop-blur-2xl absolute top-0 left-0 w-full px-6 py-3">
      <div
        class="shrink-0 divide-zinc-600 flex items-center space-x-2 overflow-hidden divide-x"
      >
        <div class="flex items-center space-x-1">
          <button
            class="hover:bg-zinc-900/10 flex items-center justify-center p-1 transition-colors rounded"
          >
            <i
              class="ph-faders text-zinc-900 font-normal"
              style="font-size: 28px"
            >
            </i>
          </button>
        </div>
        <ProductCategories @click-category="changeCategory"></ProductCategories>
      </div>
    </div>

    <div
      class="pt-20 px-8 justify-between gap-x-4 gap-y-4 grid test grid-cols-[repeat(auto-fill,230px)] overflow-y-scroll product-overview-container"
    >
      <ProductOverView
        v-for="product in productOverviewList"
        :key="product.id"
        v-bind="product"
        class="col-span-1 mb-4"
      >
      </ProductOverView>
    </div>
    <LunarPagination
      v-model:itemPerPage="queryOption.itemPerPage"
      :itemPerPageOption="queryOption.itemPerPageOption"
      v-model:currentPage="queryOption.currentPage"
      :pageOption="queryOption.pageOption"
      :itemAmount="queryOption.itemAmount"
    ></LunarPagination>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, watchEffect } from "vue";

import ProductCategories from "./ProductCategories.vue";
import ProductOverView from "@/components/ProductOverview.vue";

import { storeToRefs } from "pinia";
import useProductStore from "@/stores/useProductStore";

import LunarPagination from "@/components/LunarPagination.vue";
const productStore = useProductStore();
const { productOverviewList, productCount } = storeToRefs(productStore);

const queryOption = reactive({
  category: "All",
  currentPage: 1,
  pageOption: [0],
  itemPerPage: 8,
  itemPerPageOption: [8, 12, 16, 20, 24],
  itemAmount: 107,
});

const getProductOverviewList = async () => {
  await productStore.getProductOverviewList(
    queryOption.category,
    (queryOption.currentPage - 1) * queryOption.itemPerPage,
    queryOption.itemPerPage
  );
  queryOption.itemAmount = productCount.value;
  const pageNum = Math.ceil(productCount.value / queryOption.itemPerPage);
  console.log({ pageNum });

  queryOption.pageOption.length = 0;
  for (let i = 0; i < pageNum; i++) {
    queryOption.pageOption.push(i + 1);
  }

  // let index = 1;
  // const arr = [];
  // do {
  //   arr.push(index);
  //   index += 1;
  // } while (index <= pageNum);

  // queryOption.pageOption = arr;
  console.log(queryOption.pageOption);
};

onMounted(async () => {
  if (productOverviewList.value.length == 0) {
    await getProductOverviewList();
  }
});

const changeCategory = async (category: string) => {
  queryOption.currentPage = 1;
  queryOption.category = category;
};

watchEffect(() => {
  getProductOverviewList();
});
</script>
<style scoped>
.product-overview-container::-webkit-scrollbar {
  display: none;
}
</style>
