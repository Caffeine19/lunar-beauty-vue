<template>
  <div
    class="hide-scrollbar flex justify-between w-full mt-4 space-x-6 overflow-auto"
  >
    <ProductBoard
      v-for="(group, index) in groupOption"
      :key="index"
      :productList="group.value"
      :tag="group.tag"
      :tagIconClass="group.tagIconClass"
    ></ProductBoard>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, reactive } from "vue";
import type { PropType } from "vue";

import ProductBoard from "@/components/ProductBoard.vue";

import { applyingTime } from "@/types/applyingTime";

import type { IRoutineItem } from "@/types/routineItem";

export default defineComponent({
  components: { ProductBoard },
  props: {
    routineItemList: {
      type: Array as PropType<IRoutineItem[]>,
      required: true,
    },
  },
  setup(props) {
    const routineItemForAll = computed(() =>
      props.routineItemList.filter((storeItem) => {
        return storeItem.applyingTime == applyingTime.ALL;
      })
    );
    const routineItemForDay = computed(() =>
      props.routineItemList.filter((storeItem) => {
        return storeItem.applyingTime == applyingTime.DAY;
      })
    );
    const routineItemForNight = computed(() =>
      props.routineItemList.filter((storeItem) => {
        return storeItem.applyingTime == applyingTime.NIGHT;
      })
    );

    const groupOption = reactive([
      {
        value: routineItemForAll,
        tag: applyingTime.ALL,
        tagIconClass: "ph-alarm-fill",
      },
      {
        value: routineItemForDay,
        tag: applyingTime.DAY,
        tagIconClass: "ph-sun-fill",
      },
      {
        value: routineItemForNight,
        tag: applyingTime.NIGHT,
        tagIconClass: "ph-moon-stars-fill",
      },
    ]);
    return {
      routineItemForNight,
      routineItemForDay,
      routineItemForAll,
      groupOption,
    };
  },
});
</script>
<style scoped></style>
