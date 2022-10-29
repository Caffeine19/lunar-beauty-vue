<template>
  <div>
    <table class="w-full">
      <thead>
        <tr>
          <th><span>No</span></th>
          <th>
            <i class="ph-text-aa" style="font-size: 20px"></i>
            <span>Name</span>
          </th>
          <th>
            <i class="ph-coin-vertical" style="font-size: 20px"></i>
            <span>Price</span>
          </th>
          <th>
            <i class="ph-math-operations" style="font-size: 20px"></i>
            <span>Num</span>
          </th>
          <th>
            <i class="ph-clock" style="font-size: 20px"></i>
            <span>Time</span>
          </th>
          <th>
            <i class="ph-tag" style="font-size: 20px"></i>
            <span>Type</span>
          </th>
          <th>
            <i class="ph-plus" style="font-size: 20px"></i>
            <span>Count</span>
          </th>
          <th>
            <i class="ph-percent" style="font-size: 20px"></i>
            <span>Proportion</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(routineProduct, index) in routineProductList"
          :key="routineProduct.id"
          class=""
        >
          <td>{{ index }}</td>
          <td>{{ routineProduct.product.name }}</td>
          <td>{{ routineProduct.product.price }}</td>
          <td>{{ routineProduct.amount }}</td>
          <td>{{ routineProduct.applyingTime }}</td>
          <td>{{ routineProduct.product.category }}</td>
          <td>{{ routineProduct.expense }}</td>
          <td>
            {{
              (
                (parseInt(routineProduct.expense.slice(1)) / totalExpense) *
                100
              ).toFixed(2) + "%"
            }}
          </td>
        </tr>
      </tbody>
    </table>
    <div class="flex items-center justify-between mt-4">
      <button class="text-zinc-600 flex items-center space-x-3">
        <i class="ph-plus" style="font-size: 28px"></i>
        <p class="text-lg font-light">Add new</p>
      </button>
      <p class="text-xl italic font-medium">Total:{{ totalExpense }}$</p>
    </div>
    <div class="gap-x-8 grid grid-cols-4 mt-6">
      <div></div>
      <div></div>
      <!-- <BarChart
        :chart-data="barChartData"
        class="col-span-2"
        :height="125"
        :css-classes="'bg-zinc-50 rounded border-[1px] border-zinc-200'"
      ></BarChart> -->
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

import type { PropType } from "vue";
import type { IRoutineProduct } from "@/types/routineProduct";

import BarChart from "@/components/BarChart.vue";
import type { ChartData } from "chart.js";
export default defineComponent({
  components: {},
  props: {
    routineProductList: {
      type: Array as PropType<IRoutineProduct[]>,
      required: true,
    },
  },
  setup(props) {
    const totalExpense = computed(() => {
      let e = 0;
      props.routineProductList.forEach((routineProduct) => {
        e +=
          routineProduct.amount *
          parseInt(routineProduct.product.price.slice(1));
      });
      return e;
    });
    const barChartData = computed(() => {
      const b: ChartData<"bar"> = {
        labels: [],
        datasets: [
          {
            data: [],
          },
        ],
      };
      props.routineProductList.forEach((routineProduct) => {
        b?.labels?.push(routineProduct.product.name);
        b.datasets[0].data.push(parseInt(routineProduct.expense.slice(1)));
      });
      return b;
    });
    return { totalExpense, barChartData };
  },
});
</script>

<style scoped>
table > thead > tr > th {
  @apply text-zinc-500 px-4 py-2 space-x-1 text-left;
}
table > thead > tr > th > i {
  @apply align-middle;
}
table > thead > tr > th span {
  @apply text-base font-medium align-middle;
}
table > tbody > tr > td {
  @apply text-zinc-900 border-t-[1px] px-4 py-2 text-base font-normal border-zinc-300;
}
table > thead > tr > th:nth-child(3),
table > thead > tr > th:nth-child(4),
table > thead > tr > th:nth-child(7),
table > thead > tr > th:nth-child(8),
table > tbody > tr > td:nth-child(3),
table > tbody > tr > td:nth-child(4),
table > tbody > tr > td:nth-child(7),
table > tbody > tr > td:nth-child(8) {
  @apply text-right;
}
</style>
