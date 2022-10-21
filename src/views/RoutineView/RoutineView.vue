<template>
  <div class="grow flex flex-col p-6 overflow-x-hidden">
    <div class="flex items-center justify-between">
      <p class="text-zinc-900 text-2xl font-semibold">Routine</p>
      <div class="flex space-x-2">
        <button
          v-for="(layout, index) in routineLayoutOption"
          :key="index"
          :to="{ name: layout.to }"
          class="text-zinc-900"
          @click="changeLayout(layout.name)"
        >
          <i :class="layout.iconClass" style="font-size: 28px"></i>
        </button>
        <div class="flex items-center">
          <div class="w-[1px] border-l-[1px] border-zinc-900 h-4/5"></div>
        </div>
        <button class="text-zinc-900">
          <i class="ph-faders" style="font-size: 28px"></i>
        </button>
        <button class="text-zinc-900">
          <i class="ph-sort-ascending" style="font-size: 28px"></i>
        </button>
      </div>
    </div>
    <div class="h-[1px] w-full border-t-[1px] border-zinc-900 my-2"></div>
    <keep-alive>
      <component
        :is="routineLayoutOption[currentLayout].component()"
        :routineProductList="routineProductList"
      ></component>
    </keep-alive>
  </div>
</template>
<script lang="ts">
import { defineComponent, KeepAlive, onMounted, reactive, ref } from "vue";

import { useRoute } from "vue-router";

import useRoutineProductStore from "@/stores/useRoutineProductStore";
import { storeToRefs } from "pinia";

import RoutineBoard from "./RoutineBoard.vue";
import RoutineTable from "./RoutineTable.vue";
import RoutineFlow from "./RoutineFlow.vue";

import { routineLayout } from "@/types/routineLayout";
export default defineComponent({
  components: {
    KeepAlive,
  },
  setup() {
    const routineLayoutOption = reactive({
      board: {
        name: routineLayout.BOARD,
        to: "routineBoard",
        iconClass: "ph-kanban",
        component: () => RoutineBoard,
      },
      table: {
        name: routineLayout.TABLE,
        to: "routineTable",
        iconClass: "ph-table",
        component: () => RoutineTable,
      },
      flow: {
        name: routineLayout.FLOW,
        to: "routineFlow",
        iconClass: "ph-graph",
        component: () => RoutineFlow,
      },
    });
    const currentLayout = ref<routineLayout>(routineLayout.BOARD);

    const changeLayout = (newVal: routineLayout) => {
      currentLayout.value = newVal;
    };

    const routineProductStore = useRoutineProductStore();
    const { routineProductList } = storeToRefs(routineProductStore);
    const currentRoute = useRoute();
    onMounted(() => {
      if (currentRoute.query.routineId) {
        routineProductStore.getRoutineProductList(
          parseInt(currentRoute.query.routineId.toString())
        );
      }
    });
    return {
      routineLayoutOption,
      RoutineFlow,
      RoutineTable,
      RoutineBoard,
      currentLayout,
      routineProductList,
      changeLayout,
    };
  },
});
</script>
<style></style>
