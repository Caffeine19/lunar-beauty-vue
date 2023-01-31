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
        class="border flex justify-between items-center transition-all text-base font-normal p-1.5 space-x-2 cursor-pointer"
      >
        <p class="w-11/12 transition-colors">{{ product.product.name }}</p>
        <p
          class="border-zinc-900 w-1/12 text-right transition-colors border-l"
          :class="
            selectedProduct?.product.id == product.id
              ? ' border-zinc-50'
              : ' border-zinc-900 '
          "
        >
          {{ product.amount }}
        </p>
      </li>
      <EmptyBox v-if="productList.length === 0"></EmptyBox>
    </ul>
    <button class="text-zinc-600 flex items-center space-x-3">
      <i class="ph-plus" style="font-size: 28px"></i>
      <p class="text-lg font-light">Add new</p>
    </button>
  </div>
</template>
<script setup lang="ts">
import type { StoreItem } from "@/types/storeItem";
import type { IRoutineItem } from "@/types/routineItem";

import EmptyBox from "@/components/EmptyBox.vue";

defineProps<{
  productList: StoreItem[] | IRoutineItem[];
  tag: string;
  tagIconClass: string;
  selectedProduct?: StoreItem | IRoutineItem;
}>();

defineEmits(["productBoardItemClick"]);
</script>
<style scoped></style>
