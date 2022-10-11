<template>
  <div class="group">
    <img
      src="@/assets/images/Product/Frame 1.png"
      alt="productImg"
      class="rounded"
    />
    <div class="space-y-2 my-4">
      <p class="text-base font-normal text-zinc-700">NIOD</p>
      <h1 class="text-zinc-900 font-medium text-lg">SURVIVAL 0</h1>
      <p class="text-zinc-700 font-normal text-base">30ml | 65$</p>
    </div>
    <button
      class="hidden rounded text-zinc-50 bg-gradient-to-r from-[#E3E5ED] to-[#B0B6C4] group-hover:flex py-0.5 px-2 items-center"
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
    brandName: String,
    productName: String,
    productCapacity: String,
    productPrice: String,
  },
});
</script>
<style lang=""></style>
