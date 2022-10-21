<template>
  <div class="grow w-full">
    <VueFlow
      :node-types="nodeDefaultOption"
      :default-zoom="1.5"
      :min-zoom="0.2"
      :max-zoom="4"
      class=""
      v-model="elementList"
      @node-double-click="doubleClick"
    >
      <Background pattern-color="#aaa" :gap="8" /> <MiniMap /> <Controls />
    </VueFlow>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

import useRoutineProductStore from "@/stores/useRoutineProductStore";
import { storeToRefs } from "pinia";

import { VueFlow, useVueFlow, Position } from "@vue-flow/core";
import { Background, Controls, MiniMap } from "@vue-flow/additional-components";
import type { NodeMouseEvent } from "@vue-flow/core";

import { useRoute } from "vue-router";

import type { IProductNode } from "@/types/productNode";
export default defineComponent({
  components: { VueFlow, Background, Controls, MiniMap },
  setup() {
    const routineProductStore = useRoutineProductStore();
    const { elementList } = storeToRefs(routineProductStore);

    const currentRoute = useRoute();

    const nodeDefaultOption = ref({
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
    });

    const test = ref<number>(1);

    onMounted(async () => {
      if (currentRoute.query.routineId) {
        const routineId = parseInt(currentRoute.query.routineId.toString());
        routineProductStore.getRoutineNode(routineId);
        routineProductStore.getRoutineEdge(routineId);
      }
    });

    const doubleClick = (e: NodeMouseEvent) => {
      console.log("onDoubleClick", e, e.node.id, e.node.label);
      elementList.value.forEach((node) => {
        if (node.data && node.id == e.node.id && "showChildren" in node.data) {
          node.data.showChildren = !node.data.showChildren;
        }
        if ("parentNode" in node && node.parentNode == e.node.id) {
          node.hidden = !node.hidden;
        }
      });
    };

    return {
      nodeDefaultOption,
      elementList,
      doubleClick,
    };
  },
});
</script>

<style>
.product-node {
  @apply bg-zinc-900 border-zinc-50 text-zinc-50 hover:opacity-[85%] border-2 rounded-lg;
}
.ingredient-node {
  @apply border-[1px] bg-zinc-50/80 border-zinc-600 rounded-full;
}
</style>
