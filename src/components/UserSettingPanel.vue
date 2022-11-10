<template>
  <div
    class="top-1/2 flex flex-col left-1/2 bg-zinc-50 h-1/2 w-[36rem] absolute z-10 px-6 -translate-x-1/2 -translate-y-1/2 shadow-2xl max-w-[66vw]"
  >
    <div
      class="flex items-center justify-between py-3 border-b-[1px] border-zinc-500"
    >
      <div class="font-zinc-900 flex items-center space-x-3">
        <i class="ph-nut-fill" style="font-size: 32px"></i>
        <p class="libertinus-semibold text-2xl">Settings</p>
      </div>
      <button>
        <i class="text-zinc-900 ph-x" style="font-size: 32px"></i>
      </button>
    </div>
    <div class="flex justify-between w-full py-6 space-x-12 overflow-hidden">
      <div class="h-fit relative">
        <img
          class="w-40 h-40 rounded-full"
          src="@/assets/images/Avatar.svg"
          alt="avatar"
        />
        <button
          class="text-zinc-900 transition-colors hover:bg-zinc-900/10 border-zinc-900 absolute bottom-0 right-0 flex items-center justify-center p-0.5 border-2 rounded-full"
        >
          <i class="ph-palette" style="font-size: 32px"></i>
        </button>
      </div>
      <div class="grow hide-scrollbar flex flex-col space-y-5 overflow-y-auto">
        <div class="space-y-2">
          <div class="text-zinc-700 flex items-center space-x-2">
            <i class="ph-user-list-light" style="font-size: 24px"></i>
            <p class="text-base font-normal">Username</p>
          </div>
          <p class="libertinus-semibold text-zinc-900 text-2xl font-medium">
            Lazy Fish
          </p>
        </div>
        <div class="space-y-2">
          <div class="text-zinc-700 flex items-center space-x-2">
            <i class="ph-key-light" style="font-size: 24px"></i>
            <p class="text-base font-normal">Password</p>
          </div>
          <p class="text-zinc-900 text-2xl font-semibold">************</p>
        </div>
        <div class="w-full border-b-[1px] border-zinc-300"></div>
        <div class="space-y-2">
          <div class="text-zinc-700 flex items-center space-x-2">
            <i
              class="ph-globe-hemisphere-west-light"
              style="font-size: 24px"
            ></i>
            <p class="text-base font-normal">Language</p>
          </div>
          <LunarSelector
            :selected-tap="selectedLanguage"
            :tap-options="languageOptions"
          ></LunarSelector>
        </div>
        <div class="w-full border-b-[1px] border-zinc-300"></div>
        <div class="space-y-2">
          <div class="text-zinc-700 flex items-center space-x-2">
            <i class="ph-paint-brush-broad-light" style="font-size: 24px"></i>
            <p class="text-base font-normal">Theme</p>
          </div>
          <LunarSelector
            :selected-tap="selectedTheme"
            :tap-options="themeOptions"
          ></LunarSelector>
        </div>
        <div class="w-full border-b-[1px] border-zinc-300"></div>
        <div class="text-zinc-700 flex items-center space-x-2">
          <i class="ph-warning-light" style="font-size: 24px"></i>
          <p class="text-base font-normal">Delete account</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";
import LunarSelector from "./LunarSelector.vue";
export default defineComponent({
  components: {
    LunarSelector,
  },
  setup() {
    const languageOptions = reactive(["Chinese", "English"]);
    const selectedLanguage = "English";

    const themeOptions = reactive(["System", "Light", "Dark"]);
    const selectedTheme = "Light";

    return {
      languageOptions,
      selectedLanguage,
      themeOptions,
      selectedTheme,
    };
  },
});
</script>
<style></style>
