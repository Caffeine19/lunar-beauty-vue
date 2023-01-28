<template>
  <div class="sider-container flex flex-col h-full">
    <div class="w-fit flex flex-col justify-start py-4 space-y-4">
      <RouterLink
        v-for="(tab, index) in siderTabOption"
        :key="index"
        class="flex items-center px-4 py-2 space-x-6 transition-colors"
        :class="
          route.path.includes(tab.to)
            ? 'text-zinc-50 bg-gradient-to-r from-bean-900 to-bean-800'
            : 'text-zinc-900 hover:bg-zinc-900/10'
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

    <ul
      v-show="showingRoutineList"
      class="space-y-1.5 transition-all flex flex-col"
    >
      <li
        v-for="(routine, index) in routineList"
        :key="routine.id"
        @click="goRoutinePage(routine.id)"
        ref="operatorTrigger"
        @click.right.prevent="openRoutineOperatorMenu(index)"
        class="space-x-7 hover:bg-zinc-900/10 relative flex items-center py-1 pl-5 transition-colors cursor-pointer"
        :class="[
          route.query.routineId &&
          parseInt(route.query.routineId.toString()) === routine.id &&
          editingRoutine != routine.id
            ? 'text-zinc-50 bg-gradient-to-r from-bean-900 to-bean-800 hover:from-bean-900/90 hover:to-bean-800/90'
            : 'text-zinc-900',
          editingRoutine == routine.id ? 'bg-zinc-900/10' : '',
        ]"
      >
        <i
          class="ph-file"
          style="font-size: 24px"
          v-if="routine.id != editingRoutine"
        ></i>
        <p class="text-lg font-medium" v-if="routine.id != editingRoutine">
          {{ routine.name }}
        </p>
        <LunarInput
          @keyup.enter="submitRenamedRoutine"
          @keyup.esc="cancelRenameRoutine"
          v-model:given-value="editingName"
          class="max-w-[10rem]"
          v-else
        ></LunarInput>
      </li>
      <button
        @click="beginCreateRoutine"
        class="mx-2.5 text-zinc-500 border-zinc-400 border-[1px] hover:bg-zinc-900/10 hover:text-zinc-900 hover:border-zinc-900 flex items-center px-2 py-1 space-x-6 transition-colors border-dashed"
      >
        <i class="ph-plus" style="font-size: 28px"></i>
        <p class="xl:block hidden text-lg font-normal">Create</p>
      </button>
    </ul>
    <Transition name="fade">
      <OperateMenu
        :operator-button-options="routineOperationMenu"
        :operatorMenuStyle="operatorMenuPosition"
        :visible="showingRoutineOperatorMenu"
        @on-click-outside="hideOperatorMenu"
      >
      </OperateMenu
    ></Transition>
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

import LunarInput from "./LunarInput.vue";
import { showRoutineCreatePanelKey } from "@/symbols/routineCreatePanel";
export default defineComponent({
  components: { RouterLink, OperateMenu, LunarInput },
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
      if (routineList.value.length == 0) routineStore.getRoutineList(userId);
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
            // console.log({ x, y, width });
            operatorMenuPosition.x = parseInt(x.toFixed(2));
            operatorMenuPosition.y = parseInt(y.toFixed(2)) + 40;
            operatorMenuPosition.w = parseInt(width.toFixed(2));
            // console.log({ operatorMenuPosition });
            triggeredRoutine.value = index;
            // console.log({ trigger: triggeredRoutine.value });
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

    const editingRoutine = ref(-1);
    const editingName = ref("");
    const renameRoutine = () => {
      editingRoutine.value = routineList.value[triggeredRoutine.value].id;
      editingName.value = routineList.value[triggeredRoutine.value].name;
      hideOperatorMenu();
    };
    const submitRenamedRoutine = async () => {
      const res = await routineStore.updateById(
        editingRoutine.value,
        editingName.value
      );
      if (res && showTooltip) {
        showTooltip(res);
      }
      editingRoutine.value = -1;
    };
    const cancelRenameRoutine = () => {
      editingRoutine.value = -1;
    };

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

    const showRoutineCreatePanel = inject(showRoutineCreatePanelKey);

    const createRoutine = async (name: string) => {
      console.log("new routine name", name);
      const userId = 1;
      const res = await routineStore.createByUser(userId, name);
      if (res && showTooltip) {
        showTooltip(res);
      }
      if (res.data) {
        console.log(res.data);
        goRoutinePage(res.data);
      }
    };

    const beginCreateRoutine = async () => {
      if (showRoutineCreatePanel) {
        hideOperatorMenu();
        showRoutineCreatePanel(createRoutine);
      }
      // const res = await routineStore.createByUser();
    };

    const routineOperationMenu = reactive<IOperatorButton[]>([
      {
        name: "open",
        iconClass: "ph-arrows-out",
        action: () => {
          hideOperatorMenu();
          goRoutinePage(routineList.value[triggeredRoutine.value].id);
        },
      },
      {
        name: "create",
        iconClass: "ph-plus",
        action: beginCreateRoutine,
      },
      { name: "rename", iconClass: "ph-textbox", action: renameRoutine },
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
      editingRoutine,
      editingName,
      submitRenamedRoutine,
      cancelRenameRoutine,
      beginCreateRoutine,
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to {
  opacity: 1;
}
.fade-leave-from {
  opacity: 1;
}
</style>
