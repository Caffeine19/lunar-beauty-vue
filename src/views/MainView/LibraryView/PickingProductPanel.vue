<script setup lang="ts">
import ProductOverview from "@/components/ProductOverview.vue";
import { togglePickingProductPanelKey } from "@/symbols/pickingProductPanel";
import { applyingTime } from "@/types/applyingTime";
import type { IProduct } from "@/types/product";
import type { StoreItemCreateOptions } from "@/types/storeItem";
import { inject, reactive, ref, watch, type Ref } from "vue";

import LunarCalendar from "@/components/LunarCalendar.vue";
import LunarCheckbox, {
  type CheckBoxStyle,
} from "@/components/LunarCheckbox.vue";
import LunarCounter from "@/components/LunarCounter.vue";
import LunarSelector from "@/components/LunarSelector.vue";
import LunarInput from "@/components/LunarInput.vue";

import useStoreItemStore from "@/stores/useStoreItemStore";
import useUserStore from "@/stores/useUserStore";
import { storeToRefs } from "pinia";
import { showTooltipKey } from "@/symbols/tooltip";
import { onClickOutside } from "@vueuse/core";

const showingPickingProductPanel =
  inject<Ref<boolean>>("showingPickingProductPanel") || ref(false);
const togglePickingProductPanel =
  inject(togglePickingProductPanelKey) ||
  (() => {
    console.log("missing togglePickingProductPanelKey");
  });

const PickingProductPanelRef = ref<null | HTMLElement>(null);
onClickOutside(PickingProductPanelRef, () => {
  togglePickingProductPanel(false);
});

const pickedProduct = inject<Ref<IProduct | null>>("pickedProduct");

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

const storeItemCreateOptions: StoreItemCreateOptions = reactive({
  amount: 0,
  applyingTime: applyingTime.ALL,
  expense: 0,
  openedTime: null,
  productionTime: null,
  shelfTime: 0,
  isRunout: false,
  productId: pickedProduct?.value?.id || -1,
});

watch(showingPickingProductPanel, () => {
  storeItemCreateOptions.amount = 0;
  storeItemCreateOptions.applyingTime = applyingTime.ALL;
  storeItemCreateOptions.expense = 0;
  storeItemCreateOptions.openedTime = null;
  storeItemCreateOptions.productionTime = null;
  storeItemCreateOptions.shelfTime = 0;
  storeItemCreateOptions.isRunout = false;
  storeItemCreateOptions.productId = pickedProduct?.value?.id || -1;
});

const storeItemStore = useStoreItemStore();
const { userInfo } = storeToRefs(useUserStore());
const showTooltip = inject(showTooltipKey);
const createStoreItem = async () => {
  const res = await storeItemStore.createByUser(
    storeItemCreateOptions,
    userInfo.value.id
  );
  if (showTooltip) {
    showTooltip(res);
  }
};
</script>

<template>
  <transition name="fade">
    <div
      class="top-1/3 left-1/2 bg-zinc-50/70 backdrop-blur-xl border-zinc-200 fixed flex flex-col p-6 space-y-6 -translate-x-1/2 border rounded shadow-2xl"
      v-if="showingPickingProductPanel"
      ref="PickingProductPanelRef"
    >
      <div
        class="flex items-center justify-between border-b-[1px] border-zinc-500 pb-3"
      >
        <div class="font-zinc-900 flex items-center space-x-3">
          <i class="ph-book-bookmark-fill" style="font-size: 32px"></i>
          <p class="libertinus-semibold text-2xl">Picking Product</p>
        </div>
        <button @click="togglePickingProductPanel(false)">
          <i class="text-zinc-900 ph-x" style="font-size: 32px"></i>
        </button>
      </div>
      <div class="flex space-x-12">
        <div class="flex flex-col items-center justify-between space-y-4">
          <ul class="w-full space-y-3">
            <li
              class="text-zinc-600 flex justify-between text-base font-medium"
            >
              <p>Amount:</p>
              <LunarCounter
                v-model="storeItemCreateOptions.amount"
              ></LunarCounter>
            </li>
            <li
              class="text-zinc-600 flex justify-between text-base font-medium"
            >
              <p>applyingTime:</p>
              <!-- <p>{{ selectedProduct?.applyingTime }}</p> -->
              <LunarSelector
                v-if="storeItemCreateOptions.applyingTime"
                v-model:selectedTab="storeItemCreateOptions.applyingTime"
                :tabOptions="[
                  applyingTime.ALL,
                  applyingTime.DAY,
                  applyingTime.NIGHT,
                ]"
                class="w-24"
              ></LunarSelector>
            </li>
            <li
              class="text-zinc-600 flex justify-between space-x-6 text-base font-medium"
            >
              <p>OpenedTime:</p>
              <!-- <p>
            {{
              selectedProduct?.openedTime
                ? selectedProduct.openedTime.slice(0, 10)
                : "unOpened"
            }}
          </p> -->
              <LunarCalendar
                class="w-36"
                v-model:givenDate="storeItemCreateOptions.openedTime"
                :disabled="false"
              ></LunarCalendar>
            </li>
            <li
              class="text-zinc-600 flex justify-between space-x-6 text-base font-medium"
            >
              <p>ProductionTime:</p>
              <!-- <p>
            {{ selectedProduct?.productionTime.slice(0, 10) }}
          </p> -->
              <LunarCalendar
                class="w-36"
                v-model:givenDate="storeItemCreateOptions.productionTime"
                :disabled="false"
              ></LunarCalendar>
            </li>
            <li
              class="text-zinc-600 flex justify-between text-base font-medium"
            >
              <p>ShelfTime:</p>
              <p>{{ storeItemCreateOptions?.shelfTime + "months" }}</p>
            </li>
            <li
              class="text-zinc-600 flex items-center justify-between text-base font-medium"
            >
              <p>expense:</p>
              <LunarInput
                v-model:givenValue="storeItemCreateOptions.expense"
                class="w-1/2"
              >
              </LunarInput>
            </li>
            <li
              class="text-zinc-600 flex items-center justify-between text-base font-medium"
            >
              <p>Runout:</p>
              <LunarCheckbox
                label="status"
                :checkBoxStyle="checkBoxStyle"
                v-model:checked="storeItemCreateOptions.isRunout"
              ></LunarCheckbox>
            </li>
          </ul>
          <button
            @click="createStoreItem"
            class="text-zinc-900 border-zinc-900 flex items-center px-4 py-1 space-x-2 border rounded-full"
          >
            <i class="ph-upload-simple" style="font-size: 32px"></i>
            <p class="text-lg font-medium">submit</p>
          </button>
        </div>
        <div>
          <ProductOverview
            v-if="pickedProduct"
            :id="pickedProduct.id"
            :name="pickedProduct.name"
            :brand="pickedProduct.brand"
            :price="pickedProduct.price"
            :images="pickedProduct.images"
            :category="pickedProduct.category"
            :capacity="pickedProduct.capacity"
            :showingAddButton="false"
            :showingDetailButton="false"
          >
          </ProductOverview>
        </div>
      </div>
    </div>
  </transition>
</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease-in;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to {
  opacity: 1;
}
.fade-leave-from {
  opacity: 1;
}
</style>
