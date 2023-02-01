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
        <button v-show="isEditing" @click="onSubmitButtonClick">
          <i class="ph-upload-simple text-zinc-900" style="font-size: 28px">
          </i>
        </button>
        <button v-show="isEditing" @click="onEraseButtonClick">
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
    <div class="flex justify-center mt-4" v-if="!creating">
      <ProductOverview v-bind="selectedProduct?.product"></ProductOverview>
    </div>
    <div
      class="relative flex flex-col items-center justify-center w-4/5 w-full p-4 mx-auto mt-4 space-y-3"
      v-else
    >
      <i
        class="ph-arrow-up-left absolute top-0 left-0"
        style="font-size: 32px"
      ></i>
      <i
        class="ph-arrow-up-right absolute top-0 right-0"
        style="font-size: 32px"
      ></i>
      <i
        class="ph-arrow-down-left absolute bottom-0 left-0"
        style="font-size: 32px"
      ></i>
      <i
        class="ph-arrow-down-right absolute bottom-0 right-0"
        style="font-size: 32px"
      ></i>
      <i class="ph-books-fill" style="font-size: 40px"></i>
      <p class="libertinus-semibold text-zinc-600 text-2xl text-center">
        Please Pick One <br />From <br />The Library
      </p>
      <button class="text-zinc-900 libertinus-semibold group relative text-5xl">
        <svg
          width="243"
          height="106"
          viewBox="0 0 243 106"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="w-36 overflow-visible"
        >
          <path
            d="M219.878 48C219.878 54.4612 216.874 60.6565 211.36 66.3355C205.844 72.0168 197.838 77.1559 187.905 81.4827C168.041 90.1356 140.565 95.5 110.189 95.5C79.8133 95.5 52.337 90.1356 32.4734 81.4827C22.5408 77.1559 14.5342 72.0168 9.01794 66.3355C3.50391 60.6565 0.5 54.4612 0.5 48C0.5 41.5388 3.50391 35.3435 9.01794 29.6645C14.5342 23.9832 22.5408 18.8441 32.4734 14.5173C52.337 5.86438 79.8133 0.5 110.189 0.5C140.565 0.5 168.041 5.86438 187.905 14.5173C197.838 18.8441 205.844 23.9832 211.36 29.6645C216.874 35.3435 219.878 41.5388 219.878 48Z"
            stroke="#18181b"
            class="group-hover:-translate-x-1 group-hover:-translate-y-1 transition-transform"
          />
          <path
            d="M242.5 58C242.5 64.4612 239.496 70.6565 233.982 76.3355C228.466 82.0168 220.459 87.1559 210.527 91.4827C190.663 100.136 163.187 105.5 132.811 105.5C102.435 105.5 74.9586 100.136 55.095 91.4827C45.1624 87.1559 37.1559 82.0168 31.6396 76.3355C26.1255 70.6565 23.1216 64.4612 23.1216 58C23.1216 51.5388 26.1255 45.3435 31.6396 39.6645C37.1559 33.9832 45.1624 28.8441 55.095 24.5173C74.9586 15.8644 102.435 10.5 132.811 10.5C163.187 10.5 190.663 15.8644 210.527 24.5173C220.459 28.8441 228.466 33.9832 233.982 39.6645C239.496 45.3435 242.5 51.5388 242.5 58Z"
            stroke="#18181b"
            class="group-hover:translate-x-1 group-hover:translate-y-1 transition-transform"
          />
        </svg>
        <p class="top-1/2 left-1/2 absolute -translate-x-1/2 -translate-y-1/2">
          Go
        </p>
      </button>
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
  creating: boolean;
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
    // console.log({ newVal: newVal });
    updateOptions.amount = newVal.amount;
    updateOptions.applyingTime = newVal.applyingTime;
    updateOptions.expense = newVal.expense;
    updateOptions.openedTime = newVal.openedTime;
    updateOptions.productionTime = newVal.productionTime;
    updateOptions.shelfTime = newVal.shelfTime;
    updateOptions.isRunout = newVal.isRunout;
    // console.log(selectedProduct.value);

    if (props.creating) {
      isEditing.value = true;
    } else {
      isEditing.value = false;
    }
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
  }
};
const reset = () => {
  updateOptions.amount = selectedProduct.value?.amount || 0;
  updateOptions.applyingTime =
    selectedProduct.value?.applyingTime || applyingTime.ALL;
  updateOptions.expense = selectedProduct.value?.expense || 0;
  updateOptions.openedTime = selectedProduct.value?.openedTime || null;
  updateOptions.productionTime = selectedProduct.value?.productionTime || "";
  updateOptions.shelfTime = selectedProduct.value.shelfTime || 0;
  updateOptions.isRunout = selectedProduct.value.isRunout;
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

const onSubmitButtonClick = () => {
  if (!props.creating) {
    submitUpdateOptions();
  }
  toggleIsEditing(false);
};
const onEraseButtonClick = () => {
  reset();
  if (!props.creating) {
    toggleIsEditing(false);
  }
};
const onTrashButtonClick = () => {};
</script>
<style></style>
