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
      <p class="text-zinc-900 text-base font-medium">{{ selectedTap }}</p>
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
      class="bg-zinc-900 absolute z-30 flex flex-col justify-center w-full py-1 mt-2 space-y-1 shadow-2xl"
      @mouseleave="closeDropMenu"
      v-show="openingDropMenu"
    >
      <button
        class="w-full py-0.5 px-1 font-base text-normal text-zinc-50 hover:bg-zinc-700 transition-colors flex space-x-1 items-center justify-around"
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
import { onMounted, ref, computed } from "vue";
import type { PropType } from "vue";

export default {
  props: {
    selectedTap: {
      type: String,
    },
    tapOptions: {
      type: Array as PropType<string[]>,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:selectedTap"],
  setup(props, { emit }) {
    const openingDropMenu = ref<boolean>(false);

    const openDropMenu = () => {
      if (!props.disabled) {
        console.log(props.disabled);
        openingDropMenu.value = true;
      }
    };

    const closeDropMenu = () => {
      openingDropMenu.value = false;
    };

    const setSelectedTab = (tab: string) => {
      emit("update:selectedTap", tab);
    };

    const selectorHeader = ref<null | HTMLElement>(null);

    onMounted(() => {
      console.log(selectorHeader.value?.getBoundingClientRect());
      console.dir(selectorHeader.value);
    });

    const selectorBodyWidth = computed(() => {
      return selectorHeader.value?.clientWidth;
    });
    const selectorBodyX = computed(() => {
      return selectorHeader.value?.offsetLeft;
    });
    const selectorBodyY = computed(() => {
      if (
        selectorHeader.value?.offsetTop &&
        selectorHeader.value?.clientHeight
      ) {
        return (
          selectorHeader.value.offsetTop + selectorHeader.value.clientHeight
        );
      } else {
        return 0;
      }
    });
    return {
      openingDropMenu,
      openDropMenu,
      closeDropMenu,
      setSelectedTab,
      selectorHeader,
      selectorBodyWidth,
      selectorBodyX,
      selectorBodyY,
    };
  },
};
</script>
<style></style>
