<template>
  <div class="header-container flex justify-between w-full">
    <div
      class="header-section-container-left flex items-center py-4 pl-2 pr-4 space-x-6"
    >
      <img src="@/assets/images/Icon/48.svg" alt="product icon" />
      <h1
        class="text-zinc-900 libertinus-semibold xl:block hidden text-2xl font-semibold"
      >
        Lunar Beauty
      </h1>
    </div>
    <div
      class="header-section-container-center grow flex items-center justify-between px-4 space-x-4"
    >
      <div class="relative w-full">
        <LunarInput></LunarInput>
      </div>
      <button>
        <i class="ph-bell text-zinc-900" style="font-size: 32px"> </i>
      </button>
    </div>
    <div
      class="header-section-container-right group hover:bg-zinc-900/10 flex items-center py-4 pl-4 pr-2 space-x-3 transition-colors"
      @click="toggleShowingUserOperatorMenu(true)"
      :class="showingUserOperatorMenu ? 'bg-zinc-900/10' : ''"
    >
      <img
        src="@/assets/images/Avatar.png"
        alt="avatar"
        class="w-12 h-12 rounded-full"
      />

      <h1 class="text-zinc-900 libertinus-regular text-2xl font-normal">
        {{ userInfo?.name || "unnamed" }}
      </h1>
      <i
        class="ph-caret-down text-zinc-900 group-hover:translate-y-[8px] transition-transform"
        style="font-size: 24px"
      ></i>
      <OperateMenu
        class="top-full right-0 transition-all"
        :operator-button-options="userOperatorOptions"
        v-if="showingUserOperatorMenu"
      >
      </OperateMenu>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, inject } from "vue";

import { useRouter } from "vue-router";

import OperateMenu from "./OperateMenu.vue";

import { toggleUserSettingPanelKey } from "@/symbols/userSettingPanel";

import { userInfoKey } from "@/symbols/userInfo";

import LunarInput from "./LunarInput.vue";
export default defineComponent({
  components: {
    OperateMenu,
    LunarInput,
  },
  setup() {
    const userInfo = inject(userInfoKey);

    const showingUserOperatorMenu = ref(false);
    const toggleShowingUserOperatorMenu = (flag: boolean) => {
      showingUserOperatorMenu.value = !showingUserOperatorMenu.value;
    };

    const router = useRouter();
    const goSingIn = () => {
      router.push({ name: "signIn" });
    };

    const toggleOpeningUserSettingPanel =
      inject(toggleUserSettingPanelKey) ||
      (() => {
        console.log("missing toggleUserSettingKey");
      });

    const userOperatorOptions = reactive([
      { name: "Logout", iconClass: "ph-sign-out", action: goSingIn },
      {
        name: "Settings",
        iconClass: "ph-nut",
        action: () => toggleOpeningUserSettingPanel(true),
      },
      { name: "Theme", iconClass: "ph-sun" },
    ]);

    return {
      userOperatorOptions,
      showingUserOperatorMenu,
      toggleShowingUserOperatorMenu,
      userInfo,
    };
  },
});
</script>
<style scoped>
.header-container {
  @apply relative;
}

.header-container:before {
  @apply border-b-[1px] border-zinc-900 absolute bottom-0 w-[1px] h-0 left-0;

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
  @apply border-r-[1px] border-zinc-900 absolute bottom-0 w-[1px] h-0 right-0;

  content: "";
  animation: draw-border-up 2s linear forwards;
}

.header-section-container-right:before {
  @apply border-r-[1px] border-zinc-900 absolute bottom-0 w-[1px] h-0 left-0;

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
