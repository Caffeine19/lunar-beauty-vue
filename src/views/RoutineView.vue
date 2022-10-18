<template>
  <div class="grow p-6">
    <div class="flex items-center justify-between">
      <p class="text-zinc-900 text-2xl font-semibold">Routine</p>
      <div class="flex space-x-2">
        <RouterLink
          v-for="(layout, index) in routineLayoutOption"
          :key="index"
          :to="{ name: layout.to }"
          class="text-zinc-900"
        >
          <i :class="layout.iconClass" style="font-size: 28px"></i>
        </RouterLink>
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
      <RouterView></RouterView>
    </keep-alive>
  </div>
</template>
<script lang="ts">
import { defineComponent, KeepAlive, reactive } from "vue";
import { RouterView, RouterLink } from "vue-router";
export default defineComponent({
  components: {
    RouterView,
    KeepAlive,
    RouterLink,
  },
  setup() {
    const routineLayoutOption = reactive([
      { name: "board", to: "routineBoard", iconClass: "ph-kaban" },
      { name: "table", to: "routineTable", iconClass: "ph-table" },
      { name: "flow", to: "routineFlow", iconClass: "ph-graph" },
    ]);
    return { routineLayoutOption };
  },
});
</script>
<style></style>
