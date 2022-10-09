<template>
  <div
    class="w-full border-b-[1px] border-b-zinc-800 px-4 flex justify-between"
  >
    <div
      class="flex items-center space-x-6 py-4 border-r-[1px] border-r-zinc-800 pr-4"
    >
      <img src="@/assets/images/Icon/48.svg" alt="product icon" />
      <h1 class="font-semibold text-2xl text-zinc-900 libertinus-semibold">
        Lunar Beauty
      </h1>
    </div>
    <div class="flex items-center px-4 grow justify-between space-x-4">
      <input
        type="text"
        placeholder="Type to search"
        class="bg-white border-[1px] outline-[1px] outline-zinc-600 border-zinc-100 rounded text-zinc-900 placeholder-zinc-400 text-lg font-normal py-2 px-4 w-full"
      />
      <PhBell :size="32" weight="regular" color="#18181b"></PhBell>
    </div>
    <div
      class="flex border-l-[1px] border-l-zinc-800 items-center pl-4 py-4 space-x-3"
    >
      <img
        src="@/assets/images/Avatar.png"
        alt="avatar"
        class="w-12 h-12 rounded-full"
      />
      <div class="flex items-center space-x-2">
        <h1 class="text-zinc-900 font-normal text-2xl libertinus-regular">
          Lazy Fish
        </h1>
        <PhCaretUp
          :size="24"
          weight="regular"
          color="#18181b"
          class="rotate-180 transition-all"
        >
        </PhCaretUp>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { PhCaretUp, PhBell } from "phosphor-vue";
export default defineComponent({
  components: {
    PhCaretUp,
    PhBell,
  },
});
</script>
<style lang=""></style>
