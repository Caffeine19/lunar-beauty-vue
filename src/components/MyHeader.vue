<template>
  <div class="header-container flex justify-between">
    <div
      class="header-section-container-center grow flex items-center justify-center px-8"
    >
      <div
        class="border-zinc-600 group focus-within:bg-zinc-900/10 focus-within:border-zinc-900 flex items-center justify-between w-full pl-4 space-x-4 transition-colors border border-r-0 rounded-full"
      >
        <input
          type="text"
          name="header-search"
          placeholder="typing to search"
          class="text-zinc-900 placeholder:text-zinc-400 w-full py-1 bg-transparent border-none outline-none"
        />
        <button
          class="border-zinc-600 text-zinc-900 group-focus-within:border-zinc-900 flex items-center justify-center p-1 border rounded-full"
        >
          <i
            class="ph-arrow-right group-focus-within:animate-pulse"
            style="font-size: 32px"
          ></i>
        </button>
      </div>
    </div>
    <div
      class="header-section-container-right group hover:bg-zinc-900/10 flex items-center py-4 pl-4 pr-2 space-x-3 transition-colors"
      @click="toggleShowingUserOperatorMenu"
      ref="operatorTrigger"
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
    </div>
  </div>
  <OperateMenu
    class="transition-all"
    :operator-button-options="userOperatorOptions"
    :operatorMenuStyle="operatorMenuPosition"
    :visible="showingUserOperatorMenu"
    @on-click-outside="hideOperatorMenu"
  >
  </OperateMenu>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, inject } from "vue";
import { useRouter } from "vue-router";

import OperateMenu from "./OperateMenu.vue";

import { toggleUserSettingPanelKey } from "@/symbols/userSettingPanel";

import { userInfoKey } from "@/symbols/userInfo";

export default defineComponent({
  components: {
    OperateMenu,
  },
  setup() {
    const userInfo = inject(userInfoKey);

    const showingUserOperatorMenu = ref(false);

    const operatorTrigger = ref<null | HTMLElement | HTMLElement[]>(null);

    const operatorMenuPosition = reactive({ x: 0, y: 0, w: 0 });
    const toggleShowingUserOperatorMenu = () => {
      if (!showingUserOperatorMenu.value) {
        if (operatorTrigger.value) {
          console.log({ operatorTrigger });
          if (!("length" in operatorTrigger.value)) {
            const trigger = operatorTrigger.value;
            const { x, y, width } = trigger.getBoundingClientRect();
            console.log({ x, y, width });
            operatorMenuPosition.x = parseInt(x.toFixed(2));
            operatorMenuPosition.y = parseInt(y.toFixed(2)) + 80;
            operatorMenuPosition.w = parseInt(width.toFixed(2));
            console.log({ operatorMenuPosition });
            showingUserOperatorMenu.value = true;
          }
        }
      } else {
        hideOperatorMenu();
      }
    };
    const hideOperatorMenu = () => {
      showingUserOperatorMenu.value = false;
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
        action: () => {
          toggleOpeningUserSettingPanel(true), toggleShowingUserOperatorMenu();
        },
      },
      { name: "Theme", iconClass: "ph-sun" },
    ]);

    return {
      userOperatorOptions,
      showingUserOperatorMenu,
      toggleShowingUserOperatorMenu,
      userInfo,
      operatorTrigger,
      operatorMenuPosition,
      hideOperatorMenu,
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

.header-section-container-right {
  @apply relative;
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
