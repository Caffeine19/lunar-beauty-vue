<template>
  <div
    class="w-full border-b-[1px] border-b-zinc-800 px-4 flex justify-between"
  >
    <div
      class="flex items-center space-x-6 py-4 border-r-[1px] border-r-zinc-800 pr-4"
    >
      <img src="@/assets/images/Icon/48.svg" alt="product icon" />
      <h1
        class="text-zinc-900 libertinus-semibold xl:block hidden text-2xl font-semibold"
      >
        Lunar Beauty
      </h1>
    </div>
    <div class="grow flex items-center justify-between px-4 space-x-4">
      <div class="relative w-full">
        <input
          type="text"
          placeholder="Type to search"
          class="peer bg-transparent border-[1px] outline-[1px] hover:bg-zinc-100/80 outline-zinc-600 focus:bg-zinc-100 transition-all border-zinc-100 rounded text-zinc-900 placeholder-zinc-400 text-lg font-normal py-2 px-4 w-full"
        />
        <i
          class="ph-magnifying-glass text-zinc-600 right-4 top-1/2 peer-focus:text-zinc-900 absolute -translate-y-1/2"
          style="font-size: 32px"
        >
        </i>
      </div>
      <button>
        <i class="ph-bell text-zinc-900" style="font-size: 32px"> </i>
      </button>
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
        <h1 class="text-zinc-900 libertinus-regular text-2xl font-normal">
          Lazy Fish
        </h1>
        <button>
          <i
            class="ph-caret-up text-zinc-900 hover:rotate-0 rotate-180"
            style="font-size: 24px"
          ></i>
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>
<style lang=""></style>
