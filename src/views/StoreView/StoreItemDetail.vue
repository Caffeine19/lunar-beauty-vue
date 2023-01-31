<template>
  <div
    class="border-l-[1px] border-zinc-900 p-8 overflow-y-auto hide-scrollbar"
    :class="showingProductDetail ? 'basis-1/2 xl:basis-1/4 ' : 'basis-0 hidden'"
  >
    <div class="flex justify-between">
      <button @click="closeStoreItemDetail">
        <i class="ph-x text-zinc-900" style="font-size: 28px"></i>
      </button>
      <div class="space-x-2">
        <button v-show="!isEditing" @click="toggleIsEditing(true)">
          <i class="ph-note-pencil text-zinc-900" style="font-size: 28px"></i>
        </button>
        <button v-show="isEditing" @click="submitUpdateOptions">
          <i class="ph-upload-simple text-zinc-900" style="font-size: 28px">
          </i>
        </button>
        <button v-show="isEditing" @click="resetAndExit">
          <i class="ph-eraser text-zinc-900" style="font-size: 28px"></i>
        </button>
        <button @click="deleteStoreItem">
          <i class="ph-trash text-zinc-900" style="font-size: 28px"></i>
        </button>
      </div>
    </div>
    <div class="w-full h-[1px] border-b-[1px] border-zinc-900 my-2"></div>
    <ul class="space-y-3">
      <li class="text-zinc-600 flex justify-between text-base font-medium">
        <p>Amount:</p>
        <LunarCounter
          v-model="updateOptions.amount"
          :disabled="!isEditing"
        ></LunarCounter>
      </li>
      <li class="text-zinc-600 flex justify-between text-base font-medium">
        <p>applyingTime:</p>
        <!-- <p>{{ selectedProduct?.applyingTime }}</p> -->
        <LunarSelector
          v-if="updateOptions.applyingTime"
          v-model:selectedTab="updateOptions.applyingTime"
          :tabOptions="applyingTimeArr"
          class="w-24"
          :disabled="!isEditing"
        ></LunarSelector>
      </li>
      <li class="text-zinc-600 flex justify-between text-base font-medium">
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
          v-model:givenDate="updateOptions.openedTime"
          :disabled="!isEditing"
        ></LunarCalendar>
      </li>
      <li class="text-zinc-600 flex justify-between text-base font-medium">
        <p>ProductionTime:</p>
        <!-- <p>
            {{ selectedProduct?.productionTime.slice(0, 10) }}
          </p> -->
        <LunarCalendar
          class="w-36"
          v-model:givenDate="updateOptions.productionTime"
          :disabled="!isEditing"
        ></LunarCalendar>
      </li>
      <li class="text-zinc-600 flex justify-between text-base font-medium">
        <p>ShelfTime:</p>
        <p>{{ selectedProduct?.shelfTime + "months" }}</p>
      </li>
      <li
        class="text-zinc-600 flex items-center justify-between text-base font-medium"
      >
        <p>expense:</p>
        <LunarInput
          :disabled="!isEditing"
          v-model:givenValue="updateOptions.expense"
          class="w-1/2"
        >
        </LunarInput>
      </li>
      <li
        class="text-zinc-600 flex items-center justify-between text-base font-medium"
      >
        <p>Runout:</p>
        <LunarCheckbox
          :disabled="!isEditing"
          :check-box-style="checkBoxStyle"
          label="status"
          v-model:checked="updateOptions.isRunout"
        ></LunarCheckbox>
      </li>
      <li
        class="text-zinc-600 flex flex-col justify-between space-y-2 text-base font-medium"
      >
        <p>Status:</p>
        <div
          class="bg-zinc-900 px-1 py-2 grid grid-cols-3 hover:bg-zinc-900/90 transition-colors divide-zinc-600 justify-between items-center rounded divide-x-[1px]"
        >
          <div class="flex flex-col items-center space-y-2">
            <p class="text-zinc-50">Opened</p>
            <i
              v-if="selectedProduct.isOpened"
              class="ph-check-circle-fill text-bean-800"
              style="font-size: 28px"
            ></i>
            <i
              v-else
              class="ph-prohibit-inset-fill text-moonlight-800"
              style="font-size: 28px"
            ></i>
          </div>
          <div class="flex flex-col items-center space-y-2">
            <p class="text-zinc-50">Expired</p>
            <i
              v-if="selectedProduct.isExpired"
              class="ph-check-circle-fill text-bean-800"
              style="font-size: 28px"
            ></i>
            <i
              v-else
              class="ph-prohibit-inset-fill text-moonlight-800"
              style="font-size: 28px"
            ></i>
          </div>
          <div class="flex flex-col items-center space-y-2">
            <p class="text-zinc-50">Runout</p>
            <i
              v-if="selectedProduct.isRunout"
              class="ph-check-circle-fill text-bean-800"
              style="font-size: 28px"
            ></i>
            <i
              v-else
              class="ph-prohibit-inset-fill text-moonlight-800"
              style="font-size: 28px"
            ></i>
          </div>
        </div>
      </li>
    </ul>
    <div class="w-full h-[1px] border-b-[1px] border-zinc-900 my-2"></div>
    <div class="flex justify-center mt-4">
      <ProductOverview v-bind="selectedProduct?.product"></ProductOverview>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, watch, toRefs, inject } from "vue";

import ProductOverview from "@/components/ProductOverview.vue";
import LunarCounter from "@/components/LunarCounter.vue";
import LunarSelector from "@/components/LunarSelector.vue";
import LunarCalendar from "@/components/LunarCalendar.vue";
import LunarInput from "@/components/LunarInput.vue";
import LunarCheckbox, {
  type CheckBoxStyle,
} from "@/components/LunarCheckbox.vue";

import type { StoreItem, StoreItemUpdateOptions } from "@/types/storeItem";

import { applyingTime, applyingTimeArr } from "@/types/applyingTime";
import useStoreItemStore from "@/stores/useStoreItemStore";

import { showTooltipKey } from "@/symbols/tooltip";
import { showDialogKey } from "@/symbols/dialog";

const props = defineProps<{
  selectedProduct: StoreItem;
  showingProductDetail: boolean;
  closeStoreItemDetail: () => void;
}>();

const isEditing = ref(false);
const toggleIsEditing = (flag: boolean) => {
  isEditing.value = flag;
};

const updateOptions = reactive<StoreItemUpdateOptions>({
  amount: 0,
  applyingTime: applyingTime.ALL,
  expense: 0,
  openedTime: null,
  productionTime: "",
  shelfTime: 0,
  isRunout: false,
});

const { selectedProduct } = toRefs(props);
watch(
  () => props.selectedProduct,
  (newVal) => {
    console.log({ newVal: newVal });
    updateOptions.amount = newVal.amount;
    updateOptions.applyingTime = newVal.applyingTime;
    updateOptions.expense = newVal.expense;
    updateOptions.openedTime = newVal.openedTime;
    updateOptions.productionTime = newVal.productionTime;
    updateOptions.shelfTime = newVal.shelfTime;
    updateOptions.isRunout = newVal.isRunout;
    // console.log(selectedProduct.value);
    isEditing.value = false;
  },
  { immediate: true }
);

const checkBoxStyle: CheckBoxStyle = {
  groupStyle: {
    gap: "space-x-2",
  },
  textStyle: "text-zinc-900 text-base font-medium",
  pathStyle: "stroke-zinc-50",
  buttonStyle: {
    checked: "bg-zinc-900 hover:bg-zinc-900/90",
    unchecked: "hover:bg-zinc-900/10",
    basic: "border-zinc-900",
    size: "w-4 h-4",
  },
};

const storeItemStore = useStoreItemStore();
const showTooltip = inject(showTooltipKey);
const submitUpdateOptions = async () => {
  const data: any = {};
  if (selectedProduct.value) {
    for (let i in selectedProduct.value) {
      if (
        updateOptions[i as keyof StoreItemUpdateOptions] !==
        selectedProduct.value[i as keyof StoreItem]
      )
        // console.log(i);
        data[i] = updateOptions[i as keyof StoreItemUpdateOptions];
    }
    const res = await storeItemStore.updateById(selectedProduct.value.id, data);
    if (res && showTooltip) {
      showTooltip(res);
    }
    toggleIsEditing(false);
  }
};
const resetAndExit = () => {
  updateOptions.amount = selectedProduct.value?.amount || 0;
  updateOptions.applyingTime =
    selectedProduct.value?.applyingTime || applyingTime.ALL;
  updateOptions.openedTime = selectedProduct.value?.openedTime || null;
  updateOptions.productionTime = selectedProduct.value?.productionTime || "";

  toggleIsEditing(false);
};

const showDialog = inject(showDialogKey);
const deleteStoreItem = async () => {
  if (showDialog) {
    showDialog(
      "Are you sure you want to delete this store item?",
      "this may never came back",
      async () => {
        const res = await storeItemStore.deleteById(selectedProduct.value.id);
        if (showTooltip) showTooltip(res);
      }
    );
  }
};
</script>
<style></style>
