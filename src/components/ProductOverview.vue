<template>
  <div class="group w-fit col-span-1">
    <img
      src="@/assets/images/Product/Frame 1.png"
      alt="productImg"
      class="rounded"
    />
    <div class="my-4 space-y-2">
      <p class="text-zinc-700 text-base font-normal">{{ brand }}</p>
      <h1
        class="text-zinc-900 group-hover:underline group-hover:underline-offset-2 group-hover:decoration-zinc-600 text-lg font-medium"
      >
        {{ name }}
      </h1>
      <p class="text-zinc-700 text-base font-normal">
        {{ capacity }} | {{ price }}
      </p>
    </div>
    <button
      class="opacity-0 rounded text-zinc-50 bg-gradient-to-r to-[#E3E5ED] from-[#B0B6C4] py-0.5 px-2 items-center flex group-hover:opacity-100 transition-opacity"
      @click="goProductDetail(id)"
    >
      <p class="text-base font-medium">Detail</p>
      <i class="ph-arrow-right" style="font-size: 24px"></i>
    </button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
export default defineComponent({
  props: {
    id: {
      type: Number,
      required: true,
    },
    name: String,
    brand: String,
    price: String,
    images: String,
    category: String,
    capacity: String,
    mark: Number,
    goProductDetail: {
      type: Function as PropType<(productId: number) => void>,
      required: true,
    },
  },
});
</script>
<style lang=""></style>
