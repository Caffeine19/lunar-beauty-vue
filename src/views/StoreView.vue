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
          @product-board-item-click="openStoreItemDetail"
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
        <button @click="closeStoreItemDetail">
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
          <LunarCounter v-model="amount"></LunarCounter>
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
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
  toRefs,
} from "vue";

import { storeToRefs } from "pinia";
import useStoreItemStore from "@/stores/useStoreItemStore";

import { applyingTime } from "@/types/applyingTime";
import { preservationStatus } from "@/types/preservationStatus";

import ProductBoard from "@/components/ProductBoard.vue";
import ProductOverview from "@/components/ProductOverview.vue";
import LunarCounter from "@/components/LunarCounter.vue";

import type { IStoreItem } from "@/types/storeItem";
export default defineComponent({
  components: { ProductOverview, ProductBoard, LunarCounter },
  setup() {
    const productStore = useStoreItemStore();
    const { storeItemList } = storeToRefs(productStore);
    const userId = 1;
    onMounted(() => {
      productStore.getStoreItem(userId);
    });

    /*filtered by applyingTime*/
    const storeItemForAll = computed(() =>
      storeItemList.value.filter((storeItem) => {
        return storeItem.applyingTime == applyingTime.ALL;
      })
    );
    const storeItemForDay = computed(() =>
      storeItemList.value.filter((storeItem) => {
        return storeItem.applyingTime == applyingTime.DAY;
      })
    );
    const storeItemForNight = computed(() =>
      storeItemList.value.filter((storeItem) => {
        return storeItem.applyingTime == applyingTime.NIGHT;
      })
    );
    /*filtered by preservationStatus*/
    const unopenedStoreItem = computed(() =>
      storeItemList.value.filter((storeItem) => {
        return !storeItem.isRunout && storeItem.isOpened;
      })
    );
    const openedStoreItem = computed(() =>
      storeItemList.value.filter((storeItem) => {
        return !storeItem.isRunout && !storeItem.isOpened;
      })
    );
    const unexpiredStoreItem = computed(() =>
      storeItemList.value.filter((storeItem) => {
        return !storeItem.isRunout && !storeItem.isExpired;
      })
    );
    const expiredStoreItem = computed(() =>
      storeItemList.value.filter((storeItem) => {
        return !storeItem.isRunout && storeItem.isExpired;
      })
    );
    const runoutStoreItem = computed(() =>
      storeItemList.value.filter((storeItem) => {
        return storeItem.isRunout;
      })
    );

    const groupOptions = reactive({
      applyingTime: [
        {
          value: storeItemForAll,
          tag: applyingTime.ALL,
          tagIconClass: "ph-alarm-fill",
        },
        {
          value: storeItemForDay,
          tag: applyingTime.DAY,
          tagIconClass: "ph-sun-fill",
        },
        {
          value: storeItemForNight,
          tag: applyingTime.NIGHT,
          tagIconClass: "ph-moon-stars-fill",
        },
      ],
      preservationStatus: [
        {
          value: unopenedStoreItem,
          tag: preservationStatus.unopened,
          tagIconClass: "ph-moon-stars-fill",
        },
        {
          value: openedStoreItem,
          tag: preservationStatus.opened,
          tagIconClass: "ph-moon-stars-fill",
        },
        {
          value: unexpiredStoreItem,
          tag: preservationStatus.unexpired,
          tagIconClass: "ph-moon-stars-fill",
        },
        {
          value: expiredStoreItem,
          tag: preservationStatus.expired,
          tagIconClass: "ph-moon-stars-fill",
        },
        {
          value: runoutStoreItem,
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

    /*控制显示storeItem的详情*/
    const showingProductDetail = ref(false);

    const selectedProduct = ref<IStoreItem>();
    // const selectedIndex = ref<number>(0);

    const updateOptions = reactive({
      amount: 0,
    });

    const openStoreItemDetail = (productId: IStoreItem["id"]) => {
      showingProductDetail.value = true;

      selectedProduct.value = storeItemList.value.find((product) => {
        return product.id == productId;
      });

      updateOptions.amount = selectedProduct.value?.amount || 0;
    };

    const closeStoreItemDetail = () => {
      selectedProduct.value = undefined;
      showingProductDetail.value = false;
    };

    // const computedAmount = computed({
    //   get: () => {
    //     return selectedProduct.value?.amount || 0;
    //   },
    //   set: (newVal) => {
    //     console.log(newVal);
    //     if (selectedProduct.value)
    //       productStore.updateTest(selectedProduct.value?.id, newVal);
    //   },
    // });

    return {
      storeItemList,
      storeItemForAll,
      storeItemForDay,
      storeItemForNight,
      showingProductDetail,
      openStoreItemDetail,
      closeStoreItemDetail,
      selectedProduct,
      unopenedStoreItem,
      unexpiredStoreItem,
      openedStoreItem,
      expiredStoreItem,
      runoutStoreItem,
      currentGroupOption,
      groupOptions,
      toggleGroupOption,
      // computedAmount,
      ...toRefs(updateOptions),
    };
  },
});
</script>
<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
