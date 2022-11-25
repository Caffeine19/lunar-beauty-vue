<template>
  <div class="grow flex flex-col p-8 overflow-x-hidden">
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
        :routineItemList="routineItemList"
      ></component>
    </keep-alive>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  KeepAlive,
  onMounted,
  reactive,
  ref,
  watch,
} from "vue";

import { useRoute } from "vue-router";

import useRoutineItemStore from "@/stores/useRoutineItemStore";
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

    const routineItemStore = useRoutineItemStore();
    const { routineItemList } = storeToRefs(routineItemStore);
    const route = useRoute();
    // onMounted(() => {
    //   if (route.query.routineId) {
    //     routineItemStore.getRoutineItemList(
    //       parseInt(route.query.routineId.toString())
    //     );
    //   }
    // });
    watch(
      () => route.query.routineId,
      () => {
        if (route.query.routineId) {
          routineItemStore.getRoutineItemList(
            parseInt(route.query.routineId.toString())
          );
        }
      },
      { immediate: true }
    );
    return {
      routineLayoutOption,
      RoutineFlow,
      RoutineTable,
      RoutineBoard,
      currentLayout,
      routineItemList,
      changeLayout,
    };
  },
});
</script>
<style></style>
