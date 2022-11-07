<template>
  <div class="grow flex overflow-x-hidden">
    <div
      class="p-6 overflow-x-hidden"
      :class="showingProductDetail ? 'basis-1/2 xl:basis-3/4' : 'basis-full'"
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
          :productList="group.value"
          :tagIconClass="group.tagIconClass"
          :tag="group.tag"
          @product-board-item-click="openStoreItemDetail"
          :selectedProduct="selectedProduct"
        >
        </ProductBoard>
      </div>
    </div>
    <StoreItemDetail
      v-if="selectedProduct"
      :close-store-item-detail="closeStoreItemDetail"
      :showing-product-detail="showingProductDetail"
      :selected-product="selectedProduct"
    >
    </StoreItemDetail>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref } from "vue";

import { storeToRefs } from "pinia";
import useStoreItemStore from "@/stores/useStoreItemStore";

import type { IStoreItem } from "@/types/storeItem";
import { applyingTime } from "@/types/applyingTime";
import { preservationStatus } from "@/types/preservationStatus";

import ProductBoard from "@/components/ProductBoard.vue";
import StoreItemDetail from "./StoreItemDetail.vue";
export default defineComponent({
  components: {
    ProductBoard,
    StoreItemDetail,
  },
  setup() {
    const storeItemStore = useStoreItemStore();
    const { storeItemList } = storeToRefs(storeItemStore);
    const userId = 1;
    onMounted(async () => {
      await storeItemStore.getStoreItem(userId);
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
        return !storeItem.isRunout && !storeItem.isOpened;
      })
    );
    const openedStoreItem = computed(() =>
      storeItemList.value.filter((storeItem) => {
        return !storeItem.isRunout && storeItem.isOpened;
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

    /*控制显示storeItem的详情面板的显示*/
    const showingProductDetail = ref(false);

    const selectedProduct = ref<IStoreItem>();
    // const selectedIndex = ref<number>(0);

    const openStoreItemDetail = (productId: IStoreItem["id"]) => {
      if (!showingProductDetail.value) showingProductDetail.value = true;

      selectedProduct.value = storeItemList.value.find((product) => {
        return product.id == productId;
      });
    };

    const closeStoreItemDetail = () => {
      showingProductDetail.value = false;
    };

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
    };
  },
});
</script>
<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
