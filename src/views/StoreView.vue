<template>
  <div class="grow flex overflow-x-hidden">
    <div
      class="p-6 overflow-x-hidden"
      :class="showingProductDetail ? 'basis-3/4' : 'basis-full'"
    >
      <div class="flex items-center justify-between">
        <p class="text-zinc-900 text-2xl font-semibold">Store</p>
        <div class="flex space-x-2">
          <div class="flex items-center">
            <div class="w-[1px] border-l-[1px] border-zinc-900 h-4/5"></div>
          </div>
          <button
            class="text-zinc-900"
            @click="toggleGroupOption('preservationStatus')"
          >
            <i class="ph-faders" style="font-size: 28px"></i>
          </button>
          <button class="text-zinc-900">
            <i class="ph-sort-ascending" style="font-size: 28px"></i>
          </button>
        </div>
      </div>
      <div class="h-[1px] w-full border-t-[1px] border-zinc-900 my-2"></div>
      <div
        class="hide-scrollbar flex justify-between w-full mt-4 space-x-6 overflow-x-auto"
      >
        <ProductBoard
          v-for="(group, index) in groupOptions[currentGroupOption]"
          :key="index"
          :product-list="group.value"
          :tagIconClass="group.tagIconClass"
          :tag="group.tag"
          @product-board-item-click="openStoreProductDetail"
          :selectedProduct="selectedProduct"
        >
        </ProductBoard>
      </div>
    </div>
    <div
      class="border-l-[1px] border-zinc-900 p-6"
      :class="showingProductDetail ? 'basis-1/4' : 'basis-0 hidden'"
    >
      <div class="flex justify-between">
        <button @click="closeStoreProductDetail">
          <i class="ph-x text-zinc-900" style="font-size: 28px"></i>
        </button>
        <button>
          <i class="ph-trash text-zinc-900" style="font-size: 28px"></i>
        </button>
      </div>
      <div class="w-full h-[1px] border-b-[1px] border-zinc-900 my-2"></div>
      <ul class="space-y-3">
        <li class="text-zinc-600 flex justify-between text-base font-medium">
          <p>Amount:</p>
          <LunarCounter v-model="computedAmount"></LunarCounter>
        </li>
        <li class="text-zinc-600 flex justify-between text-base font-medium">
          <p>Status:</p>
          <p>{{ selectedProduct?.amount }}</p>
        </li>
        <li class="text-zinc-600 flex justify-between text-base font-medium">
          <p>applyingTime:</p>
          <p>{{ selectedProduct?.applyingTime }}</p>
        </li>
        <li class="text-zinc-600 flex justify-between text-base font-medium">
          <p>OpenedTime:</p>
          <p>
            {{
              selectedProduct?.openedTime
                ? selectedProduct.openedTime.slice(0, 10)
                : "unOpened"
            }}
          </p>
        </li>
        <li class="text-zinc-600 flex justify-between text-base font-medium">
          <p>ProductionTime:</p>
          <p>
            {{ selectedProduct?.productionTime.slice(0, 10) }}
          </p>
        </li>
        <li class="text-zinc-600 flex justify-between text-base font-medium">
          <p>ShelfTime:</p>
          <p>{{ selectedProduct?.shelfTime + "months" }}</p>
        </li>
        <li class="text-zinc-600 flex justify-between text-base font-medium">
          <p>expense:</p>
          <p>{{ selectedProduct?.expense }}</p>
        </li>
      </ul>
      <div class="w-full h-[1px] border-b-[1px] border-zinc-900 my-2"></div>
      <div class="flex justify-center mt-4">
        <ProductOverview
          :id="selectedProduct?.product.id || 0"
          v-bind="selectedProduct?.product"
        ></ProductOverview>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref } from "vue";

import { storeToRefs } from "pinia";
import useStoreProductStore from "@/stores/useStoreProductStore";

import { applyingTime } from "@/types/applyingTime";
import { preservationStatus } from "@/types/preservationStatus";

import ProductBoard from "@/components/ProductBoard.vue";
import ProductOverview from "@/components/ProductOverview.vue";
import LunarCounter from "@/components/LunarCounter.vue";

import type { IStoreProduct } from "@/types/storeProduct";
export default defineComponent({
  components: { ProductOverview, ProductBoard, LunarCounter },
  setup() {
    const productStore = useStoreProductStore();
    const { storeProductList } = storeToRefs(productStore);
    const userId = 1;
    onMounted(() => {
      productStore.getStoreProduct(userId);
    });

    /*filtered by applyingTime*/
    const storeProductForAll = computed(() =>
      storeProductList.value.filter((storeProduct) => {
        return storeProduct.applyingTime == applyingTime.ALL;
      })
    );
    const storeProductForDay = computed(() =>
      storeProductList.value.filter((storeProduct) => {
        return storeProduct.applyingTime == applyingTime.DAY;
      })
    );
    const storeProductForNight = computed(() =>
      storeProductList.value.filter((storeProduct) => {
        return storeProduct.applyingTime == applyingTime.NIGHT;
      })
    );
    /*filtered by preservationStatus*/
    const unopenedStoreProduct = computed(() =>
      storeProductList.value.filter((storeProduct) => {
        return !storeProduct.isRunout && storeProduct.isOpened;
      })
    );
    const openedStoreProduct = computed(() =>
      storeProductList.value.filter((storeProduct) => {
        return !storeProduct.isRunout && !storeProduct.isOpened;
      })
    );
    const unexpiredStoreProduct = computed(() =>
      storeProductList.value.filter((storeProduct) => {
        return !storeProduct.isRunout && !storeProduct.isExpired;
      })
    );
    const expiredStoreProduct = computed(() =>
      storeProductList.value.filter((storeProduct) => {
        return !storeProduct.isRunout && storeProduct.isExpired;
      })
    );
    const runoutStoreProduct = computed(() =>
      storeProductList.value.filter((storeProduct) => {
        return storeProduct.isRunout;
      })
    );

    const groupOptions = reactive({
      applyingTime: [
        {
          value: storeProductForAll,
          tag: applyingTime.ALL,
          tagIconClass: "ph-alarm-fill",
        },
        {
          value: storeProductForDay,
          tag: applyingTime.DAY,
          tagIconClass: "ph-sun-fill",
        },
        {
          value: storeProductForNight,
          tag: applyingTime.NIGHT,
          tagIconClass: "ph-moon-stars-fill",
        },
      ],
      preservationStatus: [
        {
          value: unopenedStoreProduct,
          tag: preservationStatus.unopened,
          tagIconClass: "ph-moon-stars-fill",
        },
        {
          value: openedStoreProduct,
          tag: preservationStatus.opened,
          tagIconClass: "ph-moon-stars-fill",
        },
        {
          value: unexpiredStoreProduct,
          tag: preservationStatus.unexpired,
          tagIconClass: "ph-moon-stars-fill",
        },
        {
          value: expiredStoreProduct,
          tag: preservationStatus.expired,
          tagIconClass: "ph-moon-stars-fill",
        },
        {
          value: runoutStoreProduct,
          tag: preservationStatus.runout,
          tagIconClass: "ph-moon-stars-fill",
        },
      ],
    });

    let currentGroupOption = ref<"applyingTime" | "preservationStatus">(
      "applyingTime"
    );
    const toggleGroupOption = (
      newOption: "applyingTime" | "preservationStatus"
    ) => {
      currentGroupOption.value = newOption;
    };
    console.log({ currentGroupOption });
    /*控制storeProduct的详情*/
    const showingProductDetail = ref(false);

    const selectedProduct = ref<IStoreProduct>();
    const selectedIndex = ref<number>(0);

    const openStoreProductDetail = (productId: IStoreProduct["id"]) => {
      showingProductDetail.value = true;

      selectedProduct.value = storeProductList.value.find((product) => {
        return product.id == productId;
      });
    };
    const closeStoreProductDetail = () => {
      selectedProduct.value = undefined;
      showingProductDetail.value = false;
    };

    const computedAmount = computed({
      get: () => {
        return selectedProduct.value?.amount || 0;
      },
      set: (newVal) => {
        console.log(newVal);
        if (selectedProduct.value)
          productStore.updateTest(selectedProduct.value?.id, newVal);
      },
    });
    return {
      storeProductList,
      storeProductForAll,
      storeProductForDay,
      storeProductForNight,
      showingProductDetail,
      openStoreProductDetail,
      closeStoreProductDetail,
      selectedProduct,
      unopenedStoreProduct,
      unexpiredStoreProduct,
      openedStoreProduct,
      expiredStoreProduct,
      runoutStoreProduct,
      currentGroupOption,
      groupOptions,
      toggleGroupOption,
      computedAmount,
    };
  },
});
</script>
<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
