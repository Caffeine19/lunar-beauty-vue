<template>
  <div class="sider-container flex flex-col h-full">
    <div class="w-fit flex flex-col justify-start py-4 space-y-4">
      <RouterLink
        v-for="(tab, index) in siderTabOption"
        :key="index"
        class="text-zinc-900 hover:bg-zinc-900/10 flex items-center px-4 py-2 space-x-6 transition-colors"
        :class="
          route.path.includes(tab.to)
            ? 'text-zinc-50 bg-gradient-to-r from-bean-900 to-bean-800'
            : ''
        "
        :to="{ name: tab.to }"
      >
        <i class="" style="font-size: 32px" :class="tab.iconClass"></i>
        <p class="xl:block hidden text-xl font-normal">{{ tab.name }}</p>
      </RouterLink>
    </div>
    <div class="w-full">
      <div
        class="h-[1px] border-t-[1px] float-right border-zinc-900 transition-all"
        :class="showingRoutineList ? 'w-[90%] mb-4' : 'w-[0] mb-0'"
      ></div>
    </div>
    <button
      @click="toggleShowingRoutineList"
      class="text-zinc-900 hover:bg-zinc-900/10 flex items-center px-4 py-2 space-x-6 transition-colors"
    >
      <i
        class=""
        style="font-size: 32px"
        :class="routineTabOption.iconClass"
      ></i>
      <p class="xl:block hidden text-xl font-normal">
        {{ routineTabOption.name }}
      </p>
    </button>
    <ul v-show="showingRoutineList" class="space-y-1.5 transition-all">
      <li
        v-for="(routine, index) in routineList"
        :key="routine.id"
        @click="goRoutinePage(routine.id)"
        ref="operatorTrigger"
        @click.right.prevent="openRoutineOperatorMenu(index)"
        @blur="hideOperatorMenu"
        class="text-zinc-900 space-x-7 hover:bg-zinc-900/10 relative flex items-center py-1 pl-5 transition-colors cursor-pointer"
        :class="
          route.query.routineId &&
          parseInt(route.query.routineId.toString()) === routine.id
            ? 'text-zinc-50 bg-gradient-to-r from-bean-900 to-bean-800'
            : ''
        "
      >
        <i class="ph-file" style="font-size: 24px"></i>
        <p class="text-lg font-medium">{{ routine.name }}</p>
      </li>
    </ul>
    <OperateMenu
      class="transition-all"
      :operator-button-options="routineOperationMenu"
      :operatorMenuStyle="operatorMenuPosition"
      v-if="showingRoutineOperatorMenu"
    >
    </OperateMenu>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, reactive, ref } from "vue";
import { useRoute, useRouter, RouterLink } from "vue-router";

import { storeToRefs } from "pinia";
import useRoutineStore from "@/stores/useRoutineStore";

import OperateMenu from "./OperateMenu.vue";
import type { IOperatorButton } from "@/types/operatorButton";

import { showTooltipKey } from "@/symbols/tooltip";
import { showDialogKey } from "@/symbols/dialog";
export default defineComponent({
  components: { RouterLink, OperateMenu },
  setup() {
    const siderTabOption = reactive([
      {
        name: "HomePage",
        to: "home",
        iconClass: "ph-bank",
      },
      {
        name: "Library",
        to: "library",
        iconClass: "ph-books",
      },
      {
        name: "Store",
        to: "store",
        iconClass: "ph-package",
      },
    ]);
    const routineTabOption = reactive({
      name: "Routine",
      to: "routine",
      iconClass: "ph-map-trifold",
    });

    const route = useRoute();
    const router = useRouter();

    const routineStore = useRoutineStore();
    const { routineList } = storeToRefs(routineStore);

    const showingRoutineList = ref(false);
    const toggleShowingRoutineList = () => {
      const userId = 1;
      routineStore.getRoutineList(userId);
      showingRoutineList.value = !showingRoutineList.value;
    };
    const goRoutinePage = (routineId: number) => {
      router.push({ name: "routine", query: { routineId } });
    };

    const showingRoutineOperatorMenu = ref(false);
    const operatorMenuPosition = reactive({ x: 0, y: 0, w: 0 });
    const operatorTrigger = ref<null | HTMLElement | HTMLElement[]>(null);
    const triggeredRoutine = ref(-1);
    const openRoutineOperatorMenu = (index: number) => {
      if (!showingRoutineOperatorMenu.value) {
        if (operatorTrigger.value) {
          console.log({ operatorTrigger });
          if ("length" in operatorTrigger.value) {
            const trigger = operatorTrigger.value[index];
            const { x, y, width } = trigger.getBoundingClientRect();
            console.log({ x, y, width });
            operatorMenuPosition.x = parseInt(x.toFixed(2));
            operatorMenuPosition.y = parseInt(y.toFixed(2)) + 40;
            operatorMenuPosition.w = parseInt(width.toFixed(2));
            console.log({ operatorMenuPosition });
            triggeredRoutine.value = index;
            console.log({ trigger: triggeredRoutine.value });

            showingRoutineOperatorMenu.value = true;
          }
        }
      } else {
        hideOperatorMenu();
      }
    };
    const hideOperatorMenu = () => {
      showingRoutineOperatorMenu.value = false;
    };

    const showTooltip = inject(showTooltipKey);
    const showDialog = inject(showDialogKey);
    const renameRoutine = () => {};

    const deleteRoutine = async () => {
      hideOperatorMenu();
      console.log({ routineId: routineList.value[triggeredRoutine.value].id });
      if (showDialog) {
        showDialog(
          "Are you sure you want to delete this store item?",
          "this may never came back",
          async () => {
            const res = await routineStore.deleteById(
              routineList.value[triggeredRoutine.value].id
            );
            if (res && showTooltip) {
              showTooltip(res);
            }
          }
        );
      }
    };

    const routineOperationMenu = reactive<IOperatorButton[]>([
      { name: "rename", iconClass: "ph-textbox" },
      {
        name: "delete",
        iconClass: "ph-trash",
        action: deleteRoutine,
      },
    ]);

    return {
      siderTabOption,
      route,
      toggleShowingRoutineList,
      routineList,
      goRoutinePage,
      showingRoutineList,
      routineTabOption,
      routineOperationMenu,
      showingRoutineOperatorMenu,
      operatorMenuPosition,
      operatorTrigger,
      openRoutineOperatorMenu,
      hideOperatorMenu,
    };
  },
});
</script>
<style scoped>
.sider-container {
  @apply relative;
}
.sider-container:before {
  @apply border-r-[1px] border-zinc-900 absolute right-0 top-0 w-[1px] h-0;

  content: "";
  animation: draw-border-down 2s linear forwards;
}
@keyframes draw-border-down {
  0% {
    height: 0;
  }
  100% {
    height: 100%;
  }
}
</style>
