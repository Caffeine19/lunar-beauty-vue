<template>
  <div class="flex w-screen h-full">
    <div class="xl:basis-7/12 xl:flex flex-col justify-between hidden p-12">
      <div
        class="flex items-center space-x-6 border-r-[1px] border-r-zinc-800 pr-4 w-fit"
      >
        <img src="@/assets/images/Icon/48.svg" alt="product icon" />
        <h1 class="text-zinc-900 libertinus-semibold text-2xl font-semibold">
          Lunar Beauty
        </h1>
      </div>
      <LunarStickers></LunarStickers>
    </div>
    <div
      class="xl:basis-5/12 basis-full bg-zinc-900 flex flex-col items-center justify-between px-12 py-32"
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
        <input
          type="text"
          placeholder="username"
          v-model="username"
          class="test w-4/5 border-zinc-400 border-b-[1px] py-2 text-zinc-50 text-2xl font-medium bg-zinc-900 placeholder-zinc-200/80 focus:placeholder-zinc-200 outline-0 transition-all"
        />
        <input
          placeholder="password"
          v-model="password"
          class="test w-4/5 border-zinc-400 border-b-[1px] py-2 text-zinc-50 text-2xl font-medium bg-zinc-900 placeholder-zinc-200/80 outline-0 focus:placeholder-zinc-200 transition-all"
        />
        <LunarCheckbox
          label="register"
          v-model:checked="isRegister"
          :checkBoxStyle="checkBoxStyle"
        ></LunarCheckbox>
      </div>
      <button
        class="text-zinc-50 libertinus-semibold group relative text-6xl"
        @click="submitUserInfo"
      >
        <svg
          width="243"
          height="106"
          viewBox="0 0 243 106"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="overflow-visible"
        >
          <path
            d="M219.878 48C219.878 54.4612 216.874 60.6565 211.36 66.3355C205.844 72.0168 197.838 77.1559 187.905 81.4827C168.041 90.1356 140.565 95.5 110.189 95.5C79.8133 95.5 52.337 90.1356 32.4734 81.4827C22.5408 77.1559 14.5342 72.0168 9.01794 66.3355C3.50391 60.6565 0.5 54.4612 0.5 48C0.5 41.5388 3.50391 35.3435 9.01794 29.6645C14.5342 23.9832 22.5408 18.8441 32.4734 14.5173C52.337 5.86438 79.8133 0.5 110.189 0.5C140.565 0.5 168.041 5.86438 187.905 14.5173C197.838 18.8441 205.844 23.9832 211.36 29.6645C216.874 35.3435 219.878 41.5388 219.878 48Z"
            stroke="#FAFAFA"
            class="group-hover:-translate-x-1 group-hover:-translate-y-1 transition-transform"
          />
          <path
            d="M242.5 58C242.5 64.4612 239.496 70.6565 233.982 76.3355C228.466 82.0168 220.459 87.1559 210.527 91.4827C190.663 100.136 163.187 105.5 132.811 105.5C102.435 105.5 74.9586 100.136 55.095 91.4827C45.1624 87.1559 37.1559 82.0168 31.6396 76.3355C26.1255 70.6565 23.1216 64.4612 23.1216 58C23.1216 51.5388 26.1255 45.3435 31.6396 39.6645C37.1559 33.9832 45.1624 28.8441 55.095 24.5173C74.9586 15.8644 102.435 10.5 132.811 10.5C163.187 10.5 190.663 15.8644 210.527 24.5173C220.459 28.8441 228.466 33.9832 233.982 39.6645C239.496 45.3435 242.5 51.5388 242.5 58Z"
            stroke="#FAFAFA"
            class="group-hover:translate-x-1 group-hover:translate-y-1 transition-transform"
          />
        </svg>
        <p class="top-1/2 left-1/2 absolute -translate-x-1/2 -translate-y-1/2">
          go
        </p>
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, ref } from "vue";
import { useRouter } from "vue-router";

import LunarStickers from "@/components/LunarStickers.vue";

import useUserStore from "@/stores/useUserStore";
import { storeToRefs } from "pinia";

import { showTooltipKey } from "@/symbols/tooltip";

import LunarCheckbox, {
  type CheckBoxStyle,
} from "@/components/LunarCheckbox.vue";
export default defineComponent({
  components: { LunarStickers, LunarCheckbox },
  setup() {
    const router = useRouter();
    const goMain = () => {
      router.push("/main");
    };

    const username = ref("");
    const password = ref("");

    const userStore = useUserStore();

    const { userInfo, token } = storeToRefs(userStore);
    const showTooltip = inject(showTooltipKey);

    const isRegister = ref<boolean>(false);
    const checkBoxStyle: CheckBoxStyle = {
      textStyle: "text-zinc-50 text-2xl font-medium",
      pathStyle: "stroke-zinc-900",
      buttonStyle: {
        checked: "bg-zinc-50 hover:bg-zinc-50/90",
        unchecked: "hover:bg-zinc-50/10",
        basic: "border-zinc-50",
      },
    };

    const submitUserInfo = async () => {
      try {
        const res = await userStore.login(username.value, password.value);
        if (res && showTooltip) {
          showTooltip(res);
        }
        if (res.status) goMain();
      } catch (error) {
        console.log(error);
      }
    };

    return {
      checkBoxStyle,
      username,
      password,
      userInfo,
      token,
      submitUserInfo,
      isRegister,
    };
  },
});
</script>
<style>
input:-internal-autofill-selected.test {
  appearance: none !important;

  background-color: red !important;
  color: red !important;
}
</style>
