<template>
  <div class="group w-[230px] col-span-1 mb-4">
    <img
      :src="'data:image/png;base64,' + images"
      alt="productImg"
      class="rounded w-[230px] h-[260px] cover-image object-cover object-center"
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
      class="opacity-0 rounded text-zinc-50 bg-gradient-to-r to-moonlight-800 from-moonlight-900 py-0.5 px-2 items-center flex group-hover:opacity-100 transition-opacity"
      @click="goProductDetail(id, brand || '')"
    >
      <p class="text-base font-medium">Detail</p>
      <i class="ph-arrow-right" style="font-size: 24px"></i>
    </button>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";

interface IProduct {
  id: number;
  name: string;
  brand: string;
  price: number;
  images: string;
  category: string;
  capacity: string;
}
defineProps<IProduct>();

const router = useRouter();
// console.log(props.id, props.brand);
const goProductDetail = (id: number, brand: string) => {
  router.push({
    name: "productDetail",
    query: { productId: id, productBrand: brand },
  });
};
</script>
<style lang=""></style>
