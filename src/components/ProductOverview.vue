<template>
  <div class="group w-fit col-span-1">
    <img
      src="@/assets/images/Product/Frame 1.png"
      alt="productImg"
      class="rounded"
    />
    <div class="space-y-2 my-4">
      <p class="text-base font-normal text-zinc-700">{{ brand }}</p>
      <h1
        class="text-zinc-900 font-medium text-lg group-hover:underline group-hover:underline-offset-2 group-hover:decoration-zinc-600"
      >
        {{ name }}
      </h1>
      <p class="text-zinc-700 font-normal text-base">
        {{ capacity }} | {{ price }}
      </p>
    </div>
    <button
      class="opacity-0 rounded text-zinc-50 bg-gradient-to-r from-[#E3E5ED] to-[#B0B6C4] py-0.5 px-2 items-center flex group-hover:opacity-100 transition-opacity"
    >
      <p class="font-medium text-base">Detail</p>
      <i class="ph-arrow-right" style="font-size: 32px"></i>
    </button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    id: Number,
    name: String,
    brand: String,
    price: String,
    images: String,
    category: String,
    capacity: String,
    mark: Number,
  },
});
</script>
<style lang=""></style>
