<template>
  <div class="relative" ref="selector">
    <div
      ref="selectorHeader"
      @click="handleSelectorHeaderClick"
      class="hover:border-zinc-900 border-[1px] py-0.5 px-2 space-x-3 flex items-center justify-between hover:bg-zinc-900/10 group"
      :class="[
        openingDropMenu ? 'bg-zinc-900/10 border-zinc-900' : 'border-zinc-300',
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
      ]"
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

    <transition name="fade">
      <div
        ref="selectorBody"
        v-show="openingDropMenu"
        class="bg-zinc-900 absolute z-30 flex flex-col justify-center w-full py-1 space-y-1 shadow-2xl"
        :class="selectorBodyPosition"
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
    </transition>
  </div>
</template>
<script setup lang="ts">
import { nextTick, ref, watch } from "vue";
import { onClickOutside } from "@vueuse/core";

type Props<T = number | string> = {
  selectedTab: T;
  tabOptions: T[];
  disabled?: boolean;
};

enum BodyPosition {
  top = "top-0 mt-10",
  bottom = "bottom-0 mb-10",
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});

const emit = defineEmits(["update:selectedTab", "update:tabOptions"]);

const tabs = ref(props.tabOptions);

const selector = ref<null | HTMLElement>(null);
const selectorHeader = ref<null | HTMLElement>(null);
const selectorBody = ref<null | HTMLElement>(null);

const selectorBodyPosition = ref<BodyPosition>(BodyPosition.top);

let dataReverser = false;
const calculatePosition = () => {
  if (selectorHeader.value && selectorBody.value) {
    const header = selectorHeader.value;
    const body = selectorBody.value;
    const { bottom } = header.getBoundingClientRect();
    const { height } = body.getBoundingClientRect();
    // console.log({ bottom, height, window: window.innerHeight });

    if (bottom + height > window.innerHeight) {
      selectorBodyPosition.value = BodyPosition.bottom;
      if (!dataReverser) {
        const arr: Props["selectedTab"][] = [];
        if (tabs.value) {
          tabs.value.forEach((tab) => {
            // console.log(tab);
            arr.unshift(tab);
            console.log(arr);
          });
          tabs.value = arr;
          // emit("update:tabOptions", arr);
          console.log("reversed tabs", tabs.value);
        }
        dataReverser = true;
      }
    } else {
      selectorBodyPosition.value = BodyPosition.top;
      tabs.value = props.tabOptions;
    }
  }
};

watch(
  () => props.tabOptions,
  (newVal) => {
    console.log({ newVal });

    tabs.value = newVal;
    dataReverser = false;
  }
);

const openingDropMenu = ref<boolean>(false);
const openDropMenu = () => {
  if (!props.disabled && !openingDropMenu.value) {
    // console.log(props.disabled);
    openingDropMenu.value = true;
    nextTick(calculatePosition);
  }
};
const setSelectedTab = (tab: Props["selectedTab"]) => {
  if (!props.disabled) emit("update:selectedTab", tab);
};
const closeDropMenu = () => {
  openingDropMenu.value = false;
};

const handleSelectorHeaderClick = () => {
  if (!openingDropMenu.value) {
    openDropMenu();
  } else {
    closeDropMenu();
  }
};

onClickOutside(selector, () => {
  if (openingDropMenu.value) {
    closeDropMenu();
    console.log("click out side");
  }
});
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
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
