<template>
  <Bar
    :chart-options="chartOptions"
    :chartData="chartData"
    :chart-id="chartId"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
</template>

<script lang="ts">
import { defineComponent, h } from "vue";
import type { PropType } from "vue";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

import type { ChartData } from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default defineComponent({
  name: "BarChart",
  components: { Bar },
  props: {
    chartId: {
      type: String,
      default: "bar-chart",
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 100,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object as PropType<Partial<CSSStyleDeclaration>>,
      default: () => {},
    },
    chartData: { type: Object as PropType<ChartData<"bar">>, required: true },
  },
  setup() {
    // const chartData = {
    //   labels: [
    //     "January",
    //     "February",
    //     "March",
    //     "January",
    //     "February",
    //     "March",
    //     "January",
    //     "February",
    //     "March",
    //     "January",
    //     "February",
    //     "March",
    //     "March",
    //     "January",
    //     "February",
    //     "March",
    //   ],
    //   datasets: [
    //     {
    //       data: [
    //         40, 20, 12, 40, 20, 12, 40, 20, 12, 40, 20, 12, 40, 20, 12, 12, 40,
    //         20, 12,
    //       ],
    //     },
    //   ],
    // };

    const chartOptions = {
      responsive: true,
      backgroundColor: "#A6ADC6",
      borderRadius: Number.MAX_VALUE,
      maxBarThickness: 12,
      borderSkipped: false,
      scales: {
        x: {
          grid: {
            display: false,
            drawBorder: false,
          },
          ticks: {
            display: false,
          },
        },

        y: {
          grid: {
            display: false,
            drawBorder: false,
          },
          ticks: {
            display: false,
          },
        },
      },
    };

    return {
      chartOptions,
    };
  },
});
</script>

<style scoped></style>
