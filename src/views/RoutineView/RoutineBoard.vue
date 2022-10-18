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

import type { IRoutineProduct } from "@/types/routineProduct";

export default defineComponent({
  components: { ProductBoard },
  props: {
    routineProductList: {
      type: Array as PropType<IRoutineProduct[]>,
      required: true,
    },
  },
  setup(props) {
    const routineProductForAll = computed(() =>
      props.routineProductList.filter((storeProduct) => {
        return storeProduct.applyingTime == applyingTime.ALL;
      })
    );
    const routineProductForDay = computed(() =>
      props.routineProductList.filter((storeProduct) => {
        return storeProduct.applyingTime == applyingTime.DAY;
      })
    );
    const routineProductForNight = computed(() =>
      props.routineProductList.filter((storeProduct) => {
        return storeProduct.applyingTime == applyingTime.NIGHT;
      })
    );

    const groupOption = reactive([
      {
        value: routineProductForAll,
        tag: applyingTime.ALL,
        tagIconClass: "ph-alarm-fill",
      },
      {
        value: routineProductForDay,
        tag: applyingTime.DAY,
        tagIconClass: "ph-sun-fill",
      },
      {
        value: routineProductForNight,
        tag: applyingTime.NIGHT,
        tagIconClass: "ph-moon-stars-fill",
      },
    ]);
    return {
      routineProductForNight,
      routineProductForDay,
      routineProductForAll,
      groupOption,
    };
  },
});
</script>
<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
