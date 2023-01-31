<template>
  <div class="grow w-full">
    <VueFlow
      :node-types="nodeDefaultOption"
      :default-zoom="1.5"
      :min-zoom="0.2"
      :max-zoom="4"
      v-model="elementList"
      @node-double-click="doubleClick"
    >
      <Background pattern-color="#aaa" :gap="8" /> <MiniMap /> <Controls />
    </VueFlow>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

import useRoutineItemStore from "@/stores/useRoutineItemStore";
import { storeToRefs } from "pinia";

import { VueFlow, useVueFlow, Position } from "@vue-flow/core";
import { Background, Controls, MiniMap } from "@vue-flow/additional-components";
import type { NodeMouseEvent } from "@vue-flow/core";

import { useRoute } from "vue-router";

import type { IProductNode } from "@/types/productNode";
export default defineComponent({
  components: { VueFlow, Background, Controls, MiniMap },
  setup() {
    const routineItemStore = useRoutineItemStore();
    const { elementList } = storeToRefs(routineItemStore);

    const route = useRoute();

    const nodeDefaultOption = ref({
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
    });

    onMounted(async () => {
      if (route.query.routineId) {
        const routineId = parseInt(route.query.routineId.toString());
        routineItemStore.getRoutineNode(routineId);
        routineItemStore.getRoutineEdge(routineId);
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
  @apply bg-zinc-50/80 border-zinc-600 border rounded-full;
}
</style>
