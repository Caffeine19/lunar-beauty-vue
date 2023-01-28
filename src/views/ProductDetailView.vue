<template>
  <div
    class="xl:overflow-y-hidden hide-scrollbar grid w-full grid-cols-3 p-8 overflow-y-auto"
  >
    <div
      class="hide-scrollbar xl:col-span-2 xl:overflow-y-auto col-span-3 pr-6"
    >
      <div id="product-basic-info" class="flex space-x-12">
        <div id="product-image-preview" class="flex space-x-6">
          <div class="flex flex-col justify-between">
            <div class="bg-zinc-50 w-16 h-16">
              <img
                src="@/assets/images/Product/mas-nid-survival-0-lifestyle1.png"
                class="w-full h-full rounded"
                alt="productDetailImg"
              />
            </div>
            <div class="bg-zinc-50 w-16 h-16">
              <img
                src="@/assets/images/Product/nid-survival-0-30ml1.png"
                class="w-full h-full rounded"
                alt="productDetailImg"
              />
            </div>
            <div class="bg-zinc-50 w-16 h-16">
              <img
                src="@/assets/images/Product/nid-survival-0-30ml-swatch1.png"
                class="w-full h-full rounded"
                alt="productDetailImg"
              />
            </div>
          </div>
          <img
            :src="'data:image/png;base64,' + selectedProduct?.images"
            alt="productDetailImg"
            class="rounded w-[230px] h-[260px]"
          />
        </div>
        <div name="divider" class="flex items-center">
          <div class="w-[1px] border-l-[1px] border-zinc-900 h-4/5"></div>
        </div>
        <div id="product-text-info" class="flex flex-col justify-between">
          <div class="space-y-4">
            <p class="text-zinc-600 text-xl font-medium">
              {{ selectedProduct?.brand }}
            </p>
            <p class="text-zinc-900 text-2xl font-semibold">
              {{ selectedProduct?.name }}
            </p>
            <p class="text-zinc-600 text-xl font-medium">
              {{ selectedProduct?.capacity }} | {{ selectedProduct?.price }}
            </p>
            <div class="flex items-end space-x-3">
              <LunarMarkStar :mark="averageMark"></LunarMarkStar>
              <p class="text-zinc-600 text-sm">
                ({{ productRelatedCommentList.length }})
              </p>
            </div>
          </div>
          <button
            class="hover:opacity-90 bg-zinc-900 text-zinc-50 w-fit flex items-center px-4 py-2 space-x-2 rounded-full"
          >
            <i class="ph-download-simple-fill" style="font-size: 28px"></i>
            <p class="text-xl font-semibold">Add to</p>
          </button>
        </div>
      </div>
      <div id="product-related-products" class="mt-16 space-y-4">
        <div class="flex items-center space-x-2">
          <i class="ph-link-simple-fill" style="font-size: 32px"></i>
          <p class="text-zinc-900 text-2xl font-semibold">Related Products</p>
        </div>
        <div class="hide-scrollbar overflow-x-auto">
          <div class="w-fit flex space-x-6">
            <ProductOverView
              v-for="relatedProduct in relatedProductList"
              :key="relatedProduct.id"
              v-bind="relatedProduct"
            ></ProductOverView>
          </div>
        </div>
      </div>
      <div id="product-related-comments" class="mt-4 space-y-4">
        <div class="flex items-center space-x-2">
          <i class="ph-chat-teardrop-text-fill" style="font-size: 32px"></i>
          <p class="text-zinc-900 text-2xl font-semibold">Comments</p>
        </div>
        <div
          class="p-4 space-y-6 rounded border-[1px] border-zinc-900/60 hover:bg-zinc-900/10 transition-colors"
          v-for="comment in productRelatedCommentList"
          :key="comment.id"
        >
          <div class="space-y-6">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <img src="@/assets/images/Avatar.png" alt="user_avatar" />
                <p class="text-zinc-900 libertinus-regular text-2xl">
                  {{ comment.user.name }}
                </p>
              </div>
              <p class="text-zinc-700 text-sm font-light">
                {{ comment.created_time }}
              </p>
            </div>

            <p class="text-zinc-700 text-base font-normal">
              {{ comment.content }}
            </p>
            <LunarMarkStar :mark="comment.mark"></LunarMarkStar>
          </div>
        </div>
      </div>
    </div>
    <div
      id="product-ingredient-list"
      class="xl:col-span-1 xl:overflow-hidden xl:space-x-6 flex col-span-3"
    >
      <div class="xl:flex items-center hidden">
        <div class="w-[1px] border-l-[1px] border-zinc-900 h-full"></div>
      </div>
      <div class="xl:mt-0 flex flex-col mt-8 space-y-4 overflow-hidden">
        <div class="flex items-center space-x-2">
          <i class="ph-flask-fill" style="font-size: 32px"></i>
          <p class="text-zinc-900 text-2xl font-semibold">Ingredients</p>
        </div>
        <ul
          class="text-zinc-800 hide-scrollbar ml-3 space-y-4 overflow-y-scroll text-base font-normal list-disc list-inside"
        >
          <li
            v-for="i in ingredientList"
            :key="i.id"
            class="hover:underline hover:decoration-zinc-600 cursor-pointer"
            @click="goIngredient(i.id, i.name)"
          >
            {{ i.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from "vue";

import { storeToRefs } from "pinia";
import useIngredientStore from "@/stores/useIngredientStore";
import useProductStore from "@/stores/useProductStore";
import useCommentStore from "@/stores/useCommentStore";

import { useRoute, useRouter } from "vue-router";

import ProductOverView from "@/components/ProductOverview.vue";
import LunarMarkStar from "@/components/LunarMarkStar.vue";

const ingredientStore = useIngredientStore();
const { ingredientList } = storeToRefs(ingredientStore);

const route = useRoute();

const productStore = useProductStore();
const { relatedProductList } = storeToRefs(productStore);

const commentStore = useCommentStore();
const { productRelatedCommentList } = storeToRefs(commentStore);
const averageMark = ref(0);

onMounted(async () => {
  if (route.query.productId) {
    ingredientStore.getIngredientList(
      parseInt(route.query.productId.toString())
    );
    await commentStore.getProductRelatedCommentList(
      parseInt(route.query.productId.toString())
    );
    let totalMark = 0;
    productRelatedCommentList.value.forEach((comment, index) => {
      totalMark += comment.mark;
    });
    if (productRelatedCommentList.value.length > 0)
      averageMark.value = totalMark / productRelatedCommentList.value.length;
  }
  if (route.query.productBrand) {
    productStore.getBrandRelatedProduct(route.query.productBrand.toString());
  }
});

const selectedProduct = computed(() => {
  const sP = relatedProductList.value.find((p) => {
    if (route.query.productId) {
      return p.id == parseInt(route?.query?.productId.toString());
    }
  });
  return sP;
});

const router = useRouter();
const goIngredient = (ingredientId: number, ingredientName: string) => {
  router.push({
    name: "ingredient",
    query: {
      ingredientId,
      ingredientName,
    },
  });
};
</script>

<style scoped></style>
