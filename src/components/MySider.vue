<template>
  <div class="sider-container flex flex-col h-full">
    <div class="w-fit flex flex-col justify-start py-4 space-y-4">
      <RouterLink
        v-for="(tab, index) in siderTabOption"
        :key="index"
        class="text-zinc-900 hover:bg-zinc-900/10 flex items-center px-4 py-2 space-x-6 transition-colors"
        :class="
          currentRoute.path.includes(tab.to)
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
        v-for="routine in routineList"
        :key="routine.id"
        @click="routeToRoutinePage(routine.id)"
        class="text-zinc-900 space-x-7 hover:bg-zinc-900/10 flex items-center py-1 pl-5 transition-colors cursor-pointer"
        :class="
          currentRoute.query.routineId &&
          parseInt(currentRoute.query.routineId.toString()) === routine.id
            ? 'text-zinc-50 bg-gradient-to-r from-bean-900 to-bean-800'
            : ''
        "
      >
        <i class="ph-file" style="font-size: 24px"></i>
        <p class="text-lg font-medium">{{ routine.name }}</p>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useRoute, useRouter, RouterLink } from "vue-router";

import { storeToRefs } from "pinia";
import useRoutineStore from "@/stores/useRoutineStore";
export default defineComponent({
  components: { RouterLink },
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

    const currentRoute = useRoute();
    const router = useRouter();

    const routineStore = useRoutineStore();
    const { routineList } = storeToRefs(routineStore);

    const showingRoutineList = ref(false);
    const toggleShowingRoutineList = () => {
      const userId = 1;
      routineStore.getRoutineList(userId);
      showingRoutineList.value = !showingRoutineList.value;
    };
    const routeToRoutinePage = (routineId: number) => {
      router.push({ name: "routine", query: { routineId } });
    };
    return {
      siderTabOption,
      currentRoute,

      toggleShowingRoutineList,
      routineList,
      routeToRoutinePage,
      showingRoutineList,
      routineTabOption,
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
