<template>
  <div class="border-t-[1px] border-zinc-900 flex justify-end">
    <div
      class="text-zinc-900 flex items-center p-3 space-x-4 border-r-[1px] border-zinc-900"
    >
      <p class="text-lg font-normal">Items per page:</p>
      <LunarSelector
        class="w-20"
        v-model:selected-tab="selectedItemTab"
        v-model:tab-options="tabOptionItem"
      >
      </LunarSelector>
    </div>
    <div class="text-zinc-900 p-3 border-r-[1px] border-zinc-900 pr-8">
      <p class="text-lg font-normal">
        {{ (currentPage - 1) * itemPerPage + 1 }}-{{
          currentPage * itemPerPage > itemAmount
            ? itemAmount
            : currentPage * itemPerPage
        }}
        of {{ itemAmount }} items
      </p>
    </div>
    <div
      class="text-zinc-900 flex items-center p-3 space-x-4 border-r-[1px] border-zinc-900"
    >
      <LunarSelector
        class="w-20"
        v-model:selected-tab="selectedPageTab"
        v-model:tab-options="tabOptionPage"
      >
      </LunarSelector>
      <p class="text-lg font-normal">of {{ pageOption.length }} pages</p>
    </div>

    <button
      @click="prevPage"
      class="flex items-center border-r-[1px] border-zinc-900 p-3 text-zinc-900 hover:bg-zinc-900/10 transition-colors group"
    >
      <i
        class="ph-caret-left-fill group-hover:-translate-x-1 transition-transform"
        style="font-size: 28px"
      ></i>
    </button>
    <button
      @click="nextPage"
      class="text-zinc-900 hover:bg-zinc-900/10 group flex items-center p-3 transition-colors"
    >
      <i
        class="ph-caret-right-fill group-hover:translate-x-1 transition-transform"
        style="font-size: 28px"
      ></i>
    </button>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref, watch, type PropType } from "vue";

import LunarSelector from "./LunarSelector.vue";
export default defineComponent({
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    pageOption: {
      type: Array as PropType<number[]>,
      required: true,
    },
    itemPerPage: {
      type: Number,
      required: true,
    },
    itemAmount: {
      type: Number,
      required: true,
    },
    itemPerPageOption: {
      type: Array as PropType<number[]>,
      required: true,
    },
  },
  emits: ["update:itemPerPage", "update:currentPage"],
  components: {
    LunarSelector,
  },
  setup(props, { emit }) {
    const selectedItemTab = ref(props.itemPerPage);
    const selectedPageTab = ref(props.currentPage);
    const tabOptionPage = ref(props.pageOption);
    const tabOptionItem = ref(props.itemPerPageOption);

    watch(
      () => props.pageOption,
      (newVal) => {
        tabOptionPage.value = newVal;
      }
    );
    watch(
      () => props.itemPerPageOption,
      (newVal) => {
        tabOptionItem.value = newVal;
      }
    );
    watch(selectedItemTab, (newVal) => {
      emit("update:itemPerPage", newVal);
      selectedPageTab.value = 1;
    });
    watch(selectedPageTab, (newVal) => {
      emit("update:currentPage", newVal);
    });

    const prevPage = () => {
      if (selectedPageTab.value > 1) {
        emit("update:currentPage", selectedPageTab.value - 1);
        selectedPageTab.value -= 1;
      }
    };
    const nextPage = () => {
      if (selectedPageTab.value < props.pageOption.length) {
        emit("update:currentPage", selectedPageTab.value + 1);
        selectedPageTab.value += 1;
      }
    };
    return {
      selectedItemTab,
      selectedPageTab,
      prevPage,
      nextPage,
      tabOptionItem,
      tabOptionPage,
    };
  },
});
</script>
<style scoped></style>
