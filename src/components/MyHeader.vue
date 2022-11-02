<template>
  <div class="header-container flex justify-between w-full px-4">
    <div
      class="header-section-container-left flex items-center py-4 pr-4 space-x-6"
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
          class="peer bg-transparent border-[1px] outline-[1px] hover:bg-zinc-100/80 outline-zinc-600 focus:bg-zinc-100 transition-colors border-zinc-100 rounded text-zinc-900 placeholder-zinc-400 text-lg font-normal py-2 px-4 w-full"
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
      class="header-section-container-right flex items-center py-4 pl-4 space-x-3"
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
<style scoped>
.header-container {
  @apply relative;
}
.header-container:before {
  @apply border-b-[1px] border-zinc-900 absolute  bottom-0 w-[1px] h-0 left-0;

  content: "";
  animation: draw-border-right 2s linear forwards;
}
@keyframes draw-border-right {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}
.header-section-container-left,
.header-section-container-right {
  @apply relative;
}
.header-section-container-left:before {
  @apply border-r-[1px] border-zinc-900 absolute  bottom-0 w-[1px] h-0 right-0;

  content: "";
  animation: draw-border-up 2s linear forwards;
}
.header-section-container-right:before {
  @apply border-r-[1px] border-zinc-900 absolute  bottom-0 w-[1px] h-0 left-0;

  content: "";
  animation: draw-border-up 2s linear forwards;
  animation-delay: 1s;
}
@keyframes draw-border-up {
  0% {
    height: 0;
  }
  100% {
    height: 100%;
  }
}
</style>
