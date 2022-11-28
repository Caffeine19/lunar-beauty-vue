<template>
  <div @click="openDropMenu" class="relative">
    <div
      class="hover:border-zinc-900 border-[1px] py-0.5 px-2 space-x-3 flex items-center justify-between hover:bg-zinc-900/10 group"
      :class="[
        openingDropMenu ? 'bg-zinc-900/10 border-zinc-900' : 'border-zinc-300',
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
      ]"
      ref="selectorHeader"
    >
      <p class="text-zinc-900 text-base font-medium">{{ selectedTab }}</p>
      <i
        class="text-zinc-900 ph-caret-up rotate-180"
        style="font-size: 20px"
        :class="
          openingDropMenu
            ? 'text-zinc-900'
            : 'text-zinc-300 group-hover:text-zinc-900'
        "
      >
      </i>
    </div>
    <div
      class="bg-zinc-900 absolute z-30 flex flex-col justify-center w-full py-1 space-y-1 shadow-2xl"
      :class="selectorBodyPosition"
      @mouseleave="closeDropMenu"
      v-show="openingDropMenu"
      ref="selectorBody"
    >
      <button
        class="w-full py-0.5 px-1 font-base text-normal text-zinc-50 hover:bg-zinc-700 transition-colors flex space-x-1 items-center justify-around"
        v-for="tab in tabs"
        :key="tab"
        @click.stop="setSelectedTab(tab)"
      >
        <i
          class="ph-arrow-right-light"
          style="font-size: 20px"
          :class="selectedTab == tab ? 'opacity-100' : 'opacity-0'"
        ></i>
        <p>{{ tab }}</p>

        <i
          class="ph-arrow-left-light"
          style="font-size: 20px"
          :class="selectedTab == tab ? 'opacity-100' : 'opacity-0'"
        ></i>
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { ref, nextTick, toRefs } from "vue";
import type { PropType } from "vue";

export default {
  props: {
    selectedTab: {
      type: String,
    },
    tabOptions: {
      type: Array as PropType<string[]>,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:selectedTab"],
  setup(props, { emit }) {
    let tabs = ref(props.tabOptions);

    const selectorHeader = ref<null | HTMLElement>(null);
    const selectorBody = ref<null | HTMLElement>(null);
    const selectorBodyPosition = ref<"top-0 mt-10" | "bottom-0 mb-10">(
      "top-0 mt-10"
    );

    let bodyReversed = false;
    let dataReversed = false;
    const calculatePosition = () => {
      if (selectorHeader.value && selectorBody.value) {
        const header = selectorHeader.value;
        const body = selectorBody.value;
        const { bottom } = header.getBoundingClientRect();
        const { height } = body.getBoundingClientRect();
        console.log({ bottom, height, window: window.innerHeight });

        if (bottom + height > window.innerHeight || bodyReversed) {
          if (bodyReversed) {
            selectorBodyPosition.value = "top-0 mt-10";
          } else {
            selectorBodyPosition.value = "bottom-0 mb-10";
          }
          bodyReversed = true;
          if (!dataReversed) {
            const arr: string[] = [];
            if (tabs.value) {
              tabs.value.forEach((tab) => {
                // console.log(tab);
                arr.unshift(tab);
                // console.log(arr);
              });
              tabs.value = arr;
              dataReversed = true;
            }
          }
        }
      }
    };

    const openingDropMenu = ref<boolean>(false);
    const openDropMenu = () => {
      if (!props.disabled && !openingDropMenu.value) {
        // console.log(props.disabled);
        openingDropMenu.value = true;
        nextTick(calculatePosition);
      }
    };
    const setSelectedTab = (tab: string) => {
      emit("update:selectedTab", tab);
    };
    const closeDropMenu = () => {
      openingDropMenu.value = false;
    };
    return {
      tabs,
      openingDropMenu,
      openDropMenu,
      closeDropMenu,
      setSelectedTab,
      selectorHeader,
      selectorBody,
      selectorBodyPosition,
    };
  },
};
</script>
<style></style>
