<template>
  <div
    class="border-l-[1px] border-zinc-900 p-8"
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
        <button>
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
          v-model:selectedTap="updateOptions.applyingTime"
          :tapOptions="applyingTimeArr"
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
      <li class="text-zinc-600 flex justify-between text-base font-medium">
        <p>Status:</p>
        <p>{{ selectedProduct?.amount }}</p>
      </li>
      <li
        class="text-zinc-600 flex items-center justify-between text-base font-medium"
      >
        <p>expense:</p>
        <LunarInput
          :disabled="!isEditing"
          v-model:given-value="updateOptions.expense"
          class="w-1/2"
        >
        </LunarInput>
      </li>
    </ul>
    <div class="w-full h-[1px] border-b-[1px] border-zinc-900 my-2"></div>
    <div class="flex justify-center mt-4">
      <ProductOverview v-bind="selectedProduct?.product"></ProductOverview>
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  watch,
  type PropType,
  toRefs,
  inject,
} from "vue";

import ProductOverview from "@/components/ProductOverview.vue";
import LunarCounter from "@/components/LunarCounter.vue";
import LunarSelector from "@/components/LunarSelector.vue";
import LunarCalendar from "@/components/LunarCalendar.vue";
import LunarInput from "@/components/LunarInput.vue";

import type { IStoreItem, IStoreItemUpdateOptions } from "@/types/storeItem";

import { applyingTime, applyingTimeArr } from "@/types/applyingTime";
import useStoreItemStore from "@/stores/useStoreItemStore";

import { showTooltipKey } from "@/symbols/tooltip";

export default defineComponent({
  components: {
    ProductOverview,
    LunarCounter,
    LunarSelector,
    LunarCalendar,
    LunarInput,
  },
  props: {
    selectedProduct: {
      type: Object as PropType<IStoreItem>,
      required: true,
    },
    showingProductDetail: {
      type: Boolean,
      required: true,
    },
    closeStoreItemDetail: {
      type: Function as PropType<() => void>,
      required: true,
    },
  },
  setup(props) {
    const isEditing = ref(false);
    const toggleIsEditing = (flag: boolean) => {
      isEditing.value = flag;
    };

    const { selectedProduct } = toRefs(props);
    const updateOptions = reactive<IStoreItemUpdateOptions>({});

    watch(
      () => props.selectedProduct,
      (newVal) => {
        console.log({ newVal });
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

    const storeItemStore = useStoreItemStore();

    const showTooltip = inject(showTooltipKey);

    const submitUpdateOptions = async () => {
      const data: any = {};
      if (selectedProduct.value) {
        for (let i in selectedProduct.value) {
          if (updateOptions[i as keyof IStoreItemUpdateOptions]) {
            if (
              updateOptions[i as keyof IStoreItemUpdateOptions] !=
              selectedProduct.value[i as keyof IStoreItem]
            )
              // console.log(i);
              data[i] = updateOptions[i as keyof IStoreItemUpdateOptions];
          }
        }
        const res = await storeItemStore.updateById(
          selectedProduct.value.id,
          data
        );
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
      updateOptions.productionTime =
        selectedProduct.value?.productionTime || "";

      toggleIsEditing(false);
    };

    return {
      isEditing,
      toggleIsEditing,
      submitUpdateOptions,
      resetAndExit,
      updateOptions,
      applyingTimeArr,
    };
  },
});
</script>
<style></style>
