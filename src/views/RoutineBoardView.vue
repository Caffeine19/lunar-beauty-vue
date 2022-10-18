<template>
  <div>
    <ProductBoard
      v-for="(group, index) in groupOption"
      :key="index"
      :routineProductList="group.value"
      :tag="group.tag"
      :tagIconClass="group.tagIconClass"
    ></ProductBoard>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, reactive } from "vue";

import useRoutineProductStore from "@/stores/useRoutineProductStore";
import { storeToRefs } from "pinia";

import { useRoute } from "vue-router";

import ProductBoard from "@/components/ProductBoard.vue";

import { applyingTime } from "@/types/applyingTime";
export default defineComponent({
  components: { ProductBoard },
  setup() {
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
    const routineProductForAll = computed(() =>
      routineProductList.value.filter((storeProduct) => {
        return storeProduct.applyingTime == applyingTime.ALL;
      })
    );
    const routineProductForDay = computed(() =>
      routineProductList.value.filter((storeProduct) => {
        return storeProduct.applyingTime == applyingTime.DAY;
      })
    );
    const routineProductForNight = computed(() =>
      routineProductList.value.filter((storeProduct) => {
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
      routineProductList,
      routineProductForNight,
      routineProductForDay,
      routineProductForAll,
      groupOption,
    };
  },
});
</script>
<style></style>
