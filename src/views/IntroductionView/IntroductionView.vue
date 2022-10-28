<template>
  <div
    class="xl:h-screen h-fit w-screen pb-24 p-12 bg-[url('./assets/images/Background.svg')] bg-cover bg-center flex flex-col"
  >
    <div
      class="flex items-center space-x-6 border-r-[1px] border-r-zinc-800 pr-4 w-fit"
    >
      <img src="@/assets/images/Icon/48.svg" alt="product icon" />
      <h1 class="text-zinc-900 libertinus-semibold text-2xl font-semibold">
        Lunar Beauty
      </h1>
    </div>
    <div
      class="grow xl:space-y-0 flex flex-col items-center justify-between pt-4 space-y-12"
    >
      <div
        class="relative flex flex-col items-center justify-center space-y-10"
      >
        <img
          src="@/assets/images/Decoration.svg"
          alt="decoration"
          class="top-1/2 left-1/2 absolute -translate-x-1/2 -translate-y-1/2"
        />
        <h1 class="text-7xl libertinus-semibold text-zinc-900 z-10 text-center">
          An fantastic application <br />
          to
          <span
            class="decoration-zinc-900 decoration-4 underline-offset-4 underline"
            >manage</span
          >
          your
          <br />
          skincare products
        </h1>
        <button
          @click="getStarted"
          class="text-zinc-50 bg-zinc-900 w-fit hover:bg-zinc-900/90 transition-color z-10 flex items-center px-5 py-4 rounded-full"
        >
          <p class="text-2xl">Get Started</p>
          <i class="ph-arrow-right" style="font-size: 32px"></i>
        </button>
      </div>
      <div
        class="justify-items-center xl:grid-cols-3 xl:space-y-0 xl:w-4/5 grid items-center w-full grid-cols-1 grid-rows-1 space-y-8"
      >
        <IntroductionCard
          v-for="card in introductionCardOptions"
          :key="card.iconClass"
          v-bind="card"
        ></IntroductionCard>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { reactive } from "vue";

import { useRouter } from "vue-router";

import IntroductionCard from "./IntroductionCard.vue";

export default {
  components: {
    IntroductionCard,
  },
  setup() {
    const introductionCardOptions = reactive([
      {
        iconClass: "ph-alarm-fill ",
        iconContainerClass: "bg-gradient-to-tr from-bean-800 to-bean-900",
        title: "Store",
        content:
          "The store contain the products you owned.And illustrate their situation.",
        cardClass: "bg-zinc-900",
        titleClass: "text-zinc-50",
        contentClass: "text-zinc-200",
      },
      {
        iconClass: "ph-map-trifold-fill",
        iconContainerClass: "bg-zinc-900",
        title: "Routine",
        content:
          "Help you to create flows and analyze the expense ,balance of them.",
        cardClass: "from-moonlight-800 to-moonlight-900 bg-gradient-to-br",
        titleClass: "text-zinc-900",
        contentClass: "text-zinc-700",
      },
      {
        iconClass: "ph-radio-fill",
        iconContainerClass:
          "bg-gradient-to-tr from-champagne-800 to-champagne-900",
        title: "Sharing",
        content: "Sharing the products you are interested in to your friends.",
        cardClass: "bg-zinc-900",
        titleClass: "text-zinc-50",
        contentClass: "text-zinc-200",
      },
    ]);

    const router = useRouter();
    const getStarted = () => {
      router.push("/main");
    };
    return {
      introductionCardOptions,
      getStarted,
    };
  },
};
</script>
<style></style>
