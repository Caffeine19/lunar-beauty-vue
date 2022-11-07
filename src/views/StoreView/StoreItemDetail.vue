<template>
  <div
    class="border-l-[1px] border-zinc-900 p-6"
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
        <LunarCounter v-model="updateOptions.amount"></LunarCounter>
      </li>
      <li class="text-zinc-600 flex justify-between text-base font-medium">
        <p>applyingTime:</p>
        <!-- <p>{{ selectedProduct?.applyingTime }}</p> -->
        <LunarSelector
          v-model:selectedTap="updateOptions.applyingTime"
          :tapOptions="applyingTimeArr"
          class="w-24"
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
      <li class="text-zinc-600 flex justify-between text-base font-medium">
        <p>expense:</p>
        <p>{{ selectedProduct?.expense }}</p>
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
} from "vue";

import ProductOverview from "@/components/ProductOverview.vue";
import LunarCounter from "@/components/LunarCounter.vue";
import LunarSelector from "@/components/LunarSelector.vue";
import LunarCalendar from "@/components/LunarCalendar.vue";

import type { IStoreItem, IStoreItemUpdateOptions } from "@/types/storeItem";

import { applyingTime, applyingTimeArr } from "@/types/applyingTime";
import useStoreItemStore from "@/stores/useStoreItemStore";

export default defineComponent({
  components: { ProductOverview, LunarCounter, LunarSelector, LunarCalendar },
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
        updateOptions.amount = newVal.amount;
        updateOptions.applyingTime = newVal.applyingTime;
        updateOptions.expense = newVal.expense;
        updateOptions.openedTime = newVal.openedTime;
        updateOptions.productionTime = newVal.productionTime;
        updateOptions.shelfTime = newVal.shelfTime;
        updateOptions.isRunout = newVal.isRunout;
        console.log(selectedProduct.value);
      },
      { immediate: true }
    );

    const storeItemStore = useStoreItemStore();

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
        await storeItemStore.updateById(selectedProduct.value.id, data);

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
