<template>
  <div class="space-y-3">
    <button
      class="bg-gradient-to-r to-moonlight-800 from-moonlight-900 flex items-center px-3 py-1 space-x-2 rounded-full"
    >
      <i class="text-zinc-50" style="font-size: 24px" :class="tagIconClass"></i>
      <p class="text-zinc-50 text-lg font-medium">{{ tag }}</p>
    </button>
    <ul class="w-[320px] space-y-3">
      <li
        v-for="product in productList"
        :key="product.id"
        @click="$emit('productBoardItemClick', product.id)"
        :class="
          selectedProduct?.product.id == product.id
            ? 'bg-zinc-900 text-zinc-50 hover:bg-zinc-800/90'
            : 'text-zinc-900   hover:bg-zinc-900/10 border-zinc-600'
        "
        class="border-[1px] flex justify-between items-center transition-all text-base font-normal p-1.5 space-x-2 cursor-pointer"
      >
        <p class="w-11/12 transition-colors">{{ product.product.name }}</p>
        <p
          class="w-1/12 border-l-[1px] border-zinc-900 text-right transition-colors"
          :class="
            selectedProduct?.product.id == product.id
              ? ' border-zinc-50'
              : ' border-zinc-900 '
          "
        >
          {{ product.amount }}
        </p>
      </li>
    </ul>
    <button class="text-zinc-600 flex items-center space-x-3">
      <i class="ph-plus" style="font-size: 28px"></i>
      <p class="text-lg font-light">Add new</p>
    </button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import type { IStoreItem } from "@/types/storeItem";
import type { IRoutineItem } from "@/types/routineItem";
export default defineComponent({
  props: {
    productList: Array as PropType<IStoreItem[] | IRoutineItem[]>,
    tag: String,
    tagIconClass: String,
    selectedProduct: Object as PropType<IStoreItem | IRoutineItem>,
  },
  emits: ["productBoardItemClick"],
  setup() {},
});
</script>
<style scoped></style>
