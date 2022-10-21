<template>
  <div class="grid w-full grid-cols-3 p-6">
    <div class="hide-scrollbar col-span-2 pr-6 overflow-y-auto">
      <div class="flex space-x-12" id="product-basic-info">
        <div class="flex space-x-6">
          <div class="flex flex-col justify-between">
            <div class="bg-zinc-50 w-16 h-16">
              <img
                src="@/assets/images/Product/mas-nid-survival-0-lifestyle 1.png"
                class="w-full h-full rounded"
                alt="productDetailImg"
              />
            </div>
            <div class="bg-zinc-50 w-16 h-16">
              <img
                src="@/assets/images/Product/nid-survival-0-30ml 1.png"
                class="w-full h-full rounded"
                alt="productDetailImg"
              />
            </div>
            <div class="bg-zinc-50 w-16 h-16">
              <img
                src="@/assets/images/Product/nid-survival-0-30ml-swatch 1.png"
                class="w-full h-full rounded"
                alt="productDetailImg"
              />
            </div>
          </div>
          <img
            src="@/assets/images/Product/Frame 1.png"
            alt="productDetailImg"
            class="rounded"
          />
        </div>
        <div class="flex items-center">
          <div class="w-[1px] border-l-[1px] border-zinc-900 h-4/5"></div>
        </div>

        <div class="flex flex-col justify-between">
          <div class="space-y-4">
            <p class="text-zinc-600 text-xl font-medium">NIOD</p>
            <p class="text-zinc-900 text-2xl font-semibold">
              SURVIVAL 0 (S0)SURVIVAL 0 (S0)
            </p>
            <p class="text-zinc-600 text-xl font-medium">30ml | $60</p>
          </div>
          <button
            class="hover:opacity-90 bg-zinc-900 text-zinc-50 w-fit flex items-center px-4 py-2 space-x-2 rounded-full"
          >
            <i class="ph-download-simple-fill" style="font-size: 28px"></i>
            <p class="text-xl font-semibold">Add to</p>
          </button>
        </div>
      </div>
      <div class="mt-16 space-y-4" id="product-related-products">
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
          class="bg-zinc-50 p-4 space-y-6 rounded border-[1px] border-zinc-100"
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
          </div>
        </div>
      </div>
    </div>
    <div class="flex col-span-1 space-x-6 overflow-hidden">
      <div class="flex items-center">
        <div class="w-[1px] border-l-[1px] border-zinc-900 h-full"></div>
      </div>
      <div class="flex flex-col space-y-4 overflow-hidden">
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
            class="hover:underline hover:decoration-zinc-600"
          >
            {{ i.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";

import { storeToRefs } from "pinia";
import useIngredientStore from "@/stores/useIngredientStore";
import useProductStore from "@/stores/useProductStore";
import useCommentStore from "@/stores/useCommentStore";

import { useRoute } from "vue-router";

import ProductOverView from "@/components/ProductOverview.vue";

export default defineComponent({
  components: {
    ProductOverView,
  },

  setup() {
    const ingredientStore = useIngredientStore();
    const { ingredientList } = storeToRefs(ingredientStore);

    const currentRoute = useRoute();

    const productStore = useProductStore();
    const { relatedProductList } = storeToRefs(productStore);

    const commentStore = useCommentStore();
    const { productRelatedCommentList } = storeToRefs(commentStore);

    onMounted(() => {
      if (currentRoute.query.productId) {
        ingredientStore.getIngredientList(
          parseInt(currentRoute.query.productId.toString())
        );
        commentStore.getProductRelatedCommentList(
          parseInt(currentRoute.query.productId.toString())
        );
      }
      if (currentRoute.query.productBrand) {
        productStore.getRelatedProduct(
          currentRoute.query.productBrand.toString()
        );
      }
    });
    return {
      ingredientList,
      relatedProductList,
      productRelatedCommentList,
    };
  },
});
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
