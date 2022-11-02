<template>
  <div class="flex h-full">
    <div class="basis-7/12 flex flex-col justify-between p-12">
      <div
        class="flex items-center space-x-6 border-r-[1px] border-r-zinc-800 pr-4 w-fit"
      >
        <img src="@/assets/images/Icon/48.svg" alt="product icon" />
        <h1 class="text-zinc-900 libertinus-semibold text-2xl font-semibold">
          Lunar Beauty
        </h1>
      </div>
      <img src="../assets/images/stickers.svg" alt="stickers" class="w-full" />
    </div>
    <div
      class="basis-5/12 bg-zinc-900 flex flex-col items-center justify-between px-12 py-32"
    >
      <div class="relative">
        <img
          src="@/assets/images/Decoration.svg"
          alt="decoration"
          class="w-64"
        />
        <p
          class="libertinus-semibold text-zinc-50 top-1/2 left-8 absolute text-6xl -translate-y-1/2"
        >
          Sign In
        </p>
      </div>
      <div class="flex flex-col items-center w-full space-y-24">
        <div
          class="w-4/5 border-zinc-400 border-b-[1px] py-2 text-zinc-200 text-2xl font-medium"
        >
          Username
        </div>
        <div
          class="w-4/5 border-zinc-400 border-b-[1px] py-2 text-zinc-200 text-2xl font-medium"
        >
          Password
        </div>
      </div>
      <button
        class="text-zinc-50 libertinus-semibold relative text-6xl"
        @click="go"
      >
        <img src="@/assets/images/DoubleRing.svg" alt="DoubleRing" class="" />
        <p class="top-1/2 left-1/2 absolute -translate-x-1/2 -translate-y-1/2">
          go
        </p>
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
    const router = useRouter();
    const go = () => {
      router.push("/main");
    };
    return { go };
  },
});
</script>
<style></style>
