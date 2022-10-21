<template>
  <div class="grow w-full">
    <VueFlow
      :default-edge-options="{ type: 'smoothstep' }"
      :node-types="nodeDefaultOption"
      :default-zoom="1.5"
      :min-zoom="0.2"
      :max-zoom="4"
      class=""
      v-model="nodeList"
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
    const { nodeList } = storeToRefs(routineProductStore);

    const currentRoute = useRoute();

    const nodeDefaultOption = ref({
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
    });

    const test = ref<number>(1);

    onMounted(() => {
      if (currentRoute.query.routineId) {
        routineProductStore.getRoutineFlow(
          parseInt(currentRoute.query.routineId.toString())
        );
      }
    });

    const doubleClick = (e: NodeMouseEvent) => {
      console.log("onDoubleClick", e, e.node.id, e.node.label);
      nodeList.value.forEach((node) => {
        if (node.data && node.id == e.node.id && "showChildren" in node.data) {
          node.data.showChildren = !node.data.showChildren;
        }
        if (node.parentNode == e.node.id) {
          node.hidden = !node.hidden;
        }
      });
    };

    return {
      nodeDefaultOption,
      nodeList,
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
  @apply border-[1px] bg-transparent border-zinc-600 rounded-full;
}
</style>
