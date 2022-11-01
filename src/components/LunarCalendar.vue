<template>
  <div class="relative w-full" @click="toggleOpeningDropMenu(true)">
    <div
      class="border-[1px] py-0.5 px-2 space-x-3 flex items-center justify-between hover:bg-zinc-900/10 hover:border-zinc-900"
      :class="
        openingDropMenu ? 'bg-zinc-900/10 border-zinc-900' : 'border-zinc-300'
      "
    >
      <p class="text-zinc-900 text-base font-medium">2022-11</p>
      <i
        class="ph-calendar-blank rotate-180"
        style="font-size: 20px"
        :class="openingDropMenu ? 'text-zinc-900' : 'text-zinc-300'"
      ></i>
    </div>

    <div
      class="bg-zinc-900 absolute right-0 z-10 flex flex-col p-3 mt-2 shadow-2xl"
      v-show="openingDropMenu"
    >
      <div class="flex items-center justify-between w-full">
        <button class="flex items-center justify-center">
          <i
            class="ph-caret-double-left text-zinc-400"
            style="font-size: 20px"
          ></i>
        </button>
        <button class="flex items-center justify-center">
          <i class="ph-arrow-left text-zinc-400" style="font-size: 20px"></i>
        </button>
        <p class="text-zinc-50 text-lg font-medium">2022-11</p>
        <button class="flex items-center justify-center">
          <i class="ph-arrow-right text-zinc-400" style="font-size: 20px"></i>
        </button>
        <button class="flex items-center justify-center">
          <i
            class="ph-caret-double-right text-zinc-400"
            style="font-size: 20px"
          ></i>
        </button>
      </div>
      <div class="w-full border-zinc-700 border-b-[1px] h-[1px] my-3"></div>
      <table>
        <thead>
          <tr>
            <th
              v-for="(week, index) in weeks"
              :key="index"
              class="text-zinc-200 px-1 text-base font-normal text-center"
            >
              {{ week }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(w, index) in 6" :key="index">
            <td
              v-for="(d, index) in 7"
              :key="index"
              class="p-0.5 rounded text-zinc-50 text-base font-normal text-center"
            >
              {{ d }}
            </td>
          </tr>
        </tbody>
      </table>
      <div class="w-full border-zinc-700 border-b-[1px] h-[1px] my-3"></div>
      <div class="flex justify-end space-x-2">
        <button
          class="hover:bg-zinc-700 text-zinc-300 hover:text-zinc-50 flex items-center justify-center p-1 transition-all rounded-full"
        >
          <i class="ph-x" style="font-size: 24px"></i>
        </button>
        <button
          class="hover:bg-zinc-700 text-zinc-300 hover:text-zinc-50 flex items-center justify-center p-1 transition-all rounded-full"
        >
          <i class="ph-anchor-simple" style="font-size: 24px"></i>
        </button>
        <button
          class="hover:bg-zinc-700 text-zinc-300 hover:text-zinc-50 flex items-center justify-center p-1 transition-all rounded-full"
        >
          <i class="ph-check" style="font-size: 24px"></i>
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent } from "vue";
import type { PropType } from "vue";

export default defineComponent({
  setup(props, { emit }) {
    const openingDropMenu = ref<boolean>(false);
    const toggleOpeningDropMenu = (flag: boolean) => {
      openingDropMenu.value = flag;
    };
    const weeks = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    return {
      openingDropMenu,
      toggleOpeningDropMenu,

      weeks,
    };
  },
});
</script>
<style></style>
