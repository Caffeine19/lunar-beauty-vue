<template>
  <div
    class="xl:overflow-y-hidden hide-scrollbar grid w-full grid-cols-3 overflow-y-auto"
  >
    <div
      class="hide-scrollbar xl:col-span-2 xl:overflow-y-auto relative col-span-3"
    >
      <div id="product-basic-info" class="flex px-8 pt-8 space-x-12">
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
                (from {{ productRelatedCommentList.length }} comments)
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
      <div id="product-related-products" class="px-8 mt-16 space-y-4">
        <div class="flex items-center space-x-2">
          <i
            class="ph-link-simple-fill text-zinc-900"
            style="font-size: 32px"
          ></i>
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
      <div id="product-related-comments" class="my-4 space-y-4">
        <div
          id="comment-header"
          class="backdrop-blur-2xl sticky top-0 flex items-center justify-between px-8 py-2"
        >
          <div class="flex items-end space-x-6">
            <div class="text-zinc-900 flex items-center space-x-2">
              <i class="ph-chat-teardrop-text-fill" style="font-size: 32px"></i>
              <p class="text-2xl font-semibold">Comments</p>
            </div>
            <LunarCheckbox
              v-model:checked="displayUserOnly"
              label="me only"
              :checkBoxStyle="checkBoxStyle"
            ></LunarCheckbox>
          </div>
          <button
            @click="openCommentEditor"
            class="hover:bg-zinc-900/10 flex items-center justify-center p-1 transition-colors rounded"
          >
            <i class="ph-plus text-zinc-900" style="font-size: 24px"></i>
          </button>
        </div>
        <div
          id="comment-list"
          class="border-zinc-900/60 hover:bg-zinc-900/10 p-4 mx-8 space-y-6 transition-colors border rounded"
          v-for="comment in displayedCommentList"
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
                {{ dayjs(comment.created_time).format("YYYY/MM/DD") }}
              </p>
            </div>

            <p class="text-zinc-700 text-base font-normal">
              {{ comment.content }}
            </p>
            <div class="flex items-center justify-between">
              <LunarMarkStar :mark="comment.mark"></LunarMarkStar>
              <button
                @click="deleteComment(comment.id)"
                v-if="comment.userId === userInfo?.id"
                class="hover:bg-zinc-900/10 text-zinc-900 hover:border-zinc-900 border-zinc-400 flex items-center justify-center p-1 border rounded"
              >
                <i class="ph-trash" style="font-size: 24px"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="mx-8">
          <EmptyBox v-if="displayedCommentList.length === 0"></EmptyBox>
        </div>

        <div
          id="comment-editor"
          v-if="openingCommentEditor"
          class="bg-zinc-50/50 overflow-y-hidden backdrop-blur-2xl border-t-[1px] border-zinc-500 sticky bottom-0 left-0 w-full h-[50vh] justify-between flex flex-col"
        >
          <div class="flex items-center justify-between px-8 py-3">
            <div class="flex items-center space-x-4">
              <img src="@/assets/images/Avatar.png" alt="user_avatar" />
              <p class="text-zinc-900 libertinus-regular text-2xl">LazyFish</p>
            </div>
            <LunarMarkStar
              v-model:mark="commentCreateOptions.mark"
            ></LunarMarkStar>
          </div>
          <div class="mx-8 py-3 border-y-[1px] border-zinc-400 flex-1">
            <textarea
              name="comment-content"
              id="comment-content"
              v-model="commentCreateOptions.content"
              class="outline-0 text-zinc-900 hide-scrollbar w-full h-full text-base bg-transparent"
            ></textarea>
          </div>
          <div class="flex items-center justify-between px-8">
            <p class="text-zinc-600 text-lg italic">
              <span class="text-xl underline">
                {{ commentCreateOptions.content.length }}
              </span>
              words in total
            </p>
            <div class="flex space-x-3">
              <button
                @click="createComment"
                class="text-zinc-900 flex items-center p-3 space-x-3 text-lg border-l-[1px] border-zinc-400"
              >
                <i class="ph-paper-plane"></i>
                <p>Submit</p>
              </button>
              <button
                @click="closeCommentEditor"
                class="text-zinc-900 flex items-center p-3 space-x-3 text-lg border-l-[1px] border-zinc-400"
              >
                <i class="ph-x"></i>
                <p>Close</p>
              </button>
            </div>
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
      <div class="xl:mt-0 flex flex-col pt-8 mt-8 space-y-4 overflow-hidden">
        <div class="text-zinc-900 flex items-center space-x-2">
          <i class="ph-flask-fill" style="font-size: 32px"></i>
          <p class="text-2xl font-semibold">Ingredients</p>
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
import { onMounted, computed, ref, inject, reactive } from "vue";

import { storeToRefs } from "pinia";
import useIngredientStore from "@/stores/useIngredientStore";
import useProductStore from "@/stores/useProductStore";
import useCommentStore from "@/stores/useCommentStore";

import { useRoute, useRouter } from "vue-router";

import ProductOverView from "@/components/ProductOverview.vue";
import LunarMarkStar from "@/components/LunarMarkStar.vue";
import LunarCheckbox, {
  type CheckBoxStyle,
} from "@/components/LunarCheckbox.vue";
import EmptyBox from "@/components/EmptyBox.vue";

import { userInfoKey } from "@/symbols/userInfo";

import type { Comment, CommentCreateOptions } from "@/types/comment";
import dayjs from "dayjs";
const route = useRoute();
/*product stuff*/
const productStore = useProductStore();
const { relatedProductList } = storeToRefs(productStore);
const selectedProduct = computed(() => {
  const sP = relatedProductList.value.find((p) => {
    if (route.query.productId) {
      return p.id == parseInt(route?.query?.productId.toString());
    }
  });
  return sP;
});
onMounted(() => {
  if (route.query.productBrand) {
    productStore.getBrandRelatedProduct(route.query.productBrand.toString());
  }
});

/*comment stuff*/
const commentStore = useCommentStore();
const { productRelatedCommentList } = storeToRefs(commentStore);

const averageMark = ref(0);
onMounted(async () => {
  if (route.query.productId) {
    await commentStore.getProductRelatedCommentList(
      parseInt(route.query.productId.toString())
    );
    let totalMark = 0;
    productRelatedCommentList.value.forEach((comment) => {
      totalMark += comment.mark;
    });
    if (productRelatedCommentList.value.length > 0)
      averageMark.value = totalMark / productRelatedCommentList.value.length;
  }
});

const displayUserOnly = ref(false);
const checkBoxStyle: CheckBoxStyle = {
  textStyle: "text-zinc-900 text-base font-medium",
  pathStyle: "stroke-zinc-50",
  groupStyle: { gap: "space-x-2" },
  buttonStyle: {
    checked: "bg-zinc-900 hover:bg-zinc-900/90",
    unchecked: "hover:bg-zinc-900/10",
    basic: "border-zinc-900",
    size: "w-4 h-4",
  },
};

const userInfo = inject(userInfoKey);
const displayedCommentList = computed<Comment[]>(() => {
  if (!displayUserOnly.value) {
    return productRelatedCommentList.value;
  } else {
    return productRelatedCommentList.value.filter((comment) => {
      return comment.user.id === userInfo?.value.id;
    });
  }
});

const openingCommentEditor = ref(false);
const openCommentEditor = () => {
  openingCommentEditor.value = true;
};
const closeCommentEditor = () => {
  openingCommentEditor.value = false;
};

const commentCreateOptions = reactive<CommentCreateOptions>({
  content: "",
  mark: 0,
  userId: userInfo?.value.id,
  productId: selectedProduct.value?.id,
});

const createComment = () => {
  if (commentCreateOptions.userId && commentCreateOptions.productId)
    commentStore.createByUser(commentCreateOptions);
};

const deleteComment = (commentId: number) => {
  commentStore.deleteById(commentId);
};

/*ingredient stuff*/
const ingredientStore = useIngredientStore();
const { ingredientList } = storeToRefs(ingredientStore);
onMounted(() => {
  if (route.query.productId)
    ingredientStore.getIngredientList(
      parseInt(route.query.productId.toString())
    );
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
