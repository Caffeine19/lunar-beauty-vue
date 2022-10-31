<template>
  <div class="relative" @click="toggleOpeningDropMenu(true)">
    <div
      class="border-zinc-600 border-[1px] py-0.5 px-2 space-x-3 flex items-center justify-between hover:bg-zinc-900/10"
      :class="openingDropMenu ? 'bg-zinc-900/10' : ''"
    >
      <p class="text-zinc-900 text-base font-medium">{{ selectedTap }}</p>
      <i
        class="text-zinc-900 ph-caret-up rotate-180"
        style="font-size: 20px"
      ></i>
    </div>

    <div
      class="bg-zinc-900 absolute flex flex-col justify-center w-full py-1 mt-2 space-y-1 shadow-2xl"
      v-show="openingDropMenu"
      @mouseleave="toggleOpeningDropMenu(false)"
    >
      <button
        class="py-0.5 px-1 font-base text-normal text-zinc-50 hover:bg-zinc-700 transition-colors flex space-x-1 items-center justify-around"
        v-for="(tab, index) in tapOptions"
        :key="index"
        @click="setSelectedTab(tab)"
      >
        <i
          class="ph-arrow-right-light"
          style="font-size: 20px"
          v-show="selectedTap == tab"
        ></i>
        <p>{{ tab }}</p>
        <i
          class="ph-arrow-left-light"
          style="font-size: 20px"
          v-show="selectedTap == tab"
        ></i>
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { ref } from "vue";
import type { PropType } from "vue";
import type { applyingTime } from "@/types/applyingTime";
export default {
  props: {
    selectedTap: {
      type: String,
    },
    tapOptions: {
      type: Array as PropType<string[]>,
    },
  },
  emits: ["update:selectedTap"],
  setup(props, { emit }) {
    const openingDropMenu = ref<boolean>(true);
    const toggleOpeningDropMenu = (flag: boolean) => {
      openingDropMenu.value = flag;
    };
    const setSelectedTab = (tab: string) => {
      emit("update:selectedTap", tab);
    };
    return {
      openingDropMenu,
      toggleOpeningDropMenu,
      setSelectedTab,
    };
  },
};
</script>
<style></style>
