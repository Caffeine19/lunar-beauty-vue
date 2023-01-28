<template>
  <div class="relative w-full">
    <div
      class="border-[1px] py-0.5 px-2 space-x-3 flex items-center justify-between hover:bg-zinc-900/10 hover:border-zinc-900 group transition-colors"
      :class="[
        openingDropMenu ? 'bg-zinc-900/10 border-zinc-900' : 'border-zinc-300',
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
      ]"
      @click="openDropMenu"
    >
      <p class="text-zinc-900 text-base font-medium">
        {{ givenDate?.slice(0, 10) || "Unset" }}
      </p>
      <i
        class="ph-calendar-blank transition-colors rotate-180"
        style="font-size: 20px"
        :class="
          openingDropMenu
            ? 'text-zinc-900'
            : 'text-zinc-300 group-hover:text-zinc-900'
        "
      ></i>
    </div>
    <div
      class="bg-zinc-900 absolute right-0 z-10 flex flex-col p-3 mt-2 shadow-2xl"
      v-if="openingDropMenu"
      @mouseleave="closeDropMenu"
    >
      <div class="flex items-center justify-between w-full">
        <button class="flex items-center justify-center" @click="prevYear">
          <i
            class="ph-caret-double-left text-zinc-400"
            style="font-size: 20px"
          ></i>
        </button>
        <button class="flex items-center justify-center" @click="prevMonth">
          <i class="ph-arrow-left text-zinc-400" style="font-size: 20px"></i>
        </button>
        <p class="text-zinc-50 text-lg font-medium">
          {{ givenDate?.slice(0, 10) || "Unset" }}
        </p>
        <button class="flex items-center justify-center" @click="nextMonth">
          <i class="ph-arrow-right text-zinc-400" style="font-size: 20px"></i>
        </button>
        <button class="flex items-center justify-center" @click="nextYear">
          <i
            class="ph-caret-double-right text-zinc-400"
            style="font-size: 20px"
          ></i>
        </button>
      </div>
      <!-- <div class="w-full border-zinc-700 border-b-[1px] h-[1px] my-3"></div> -->
      <div class="cal">
        <div
          v-for="(week, index) in weeks"
          :key="index"
          class="text-zinc-200 px-1.5 text-base font-normal text-center mt-1 py-2 mb-2 border-zinc-700 border-b-[1px]"
        >
          {{ week }}
        </div>
        <button
          v-for="(brick, index) in beginBrick"
          :key="index"
          class="p-0.5 text-zinc-500 rounded-full text-base font-normal justify-center flex w-7 h-7 items-center"
        >
          {{ brick + 1 }}
        </button>
        <button
          v-for="(brick, index) in monthBrick"
          :key="index"
          class="p-0.5 text-zinc-50 transition-all rounded-full text-base font-normal justify-center flex w-7 h-7 items-center"
          :class="[
            brick + 1 == selectedIndex
              ? 'bg-gradient-to-r from-bean-900/80 to-bean-800'
              : 'bg-transparent hover:bg-zinc-700',
          ]"
          @click="setSelectedDay(brick + 1)"
        >
          {{ brick + 1 }}
        </button>
        <button
          v-for="(brick, index) in endBrick"
          :key="index"
          class="p-0.5 rounded-full text-zinc-500 text-base font-normal justify-center flex w-7 h-7 items-center"
        >
          {{ brick + 1 }}
        </button>
      </div>
      <div class="w-full border-zinc-700 border-b-[1px] h-[1px] my-3"></div>
      <div class="flex justify-end space-x-2">
        <button
          class="hover:bg-zinc-700 text-zinc-300 hover:text-zinc-50 flex items-center justify-center p-1 transition-colors rounded-full"
          @click="clearDate"
        >
          <i class="ph-eraser" style="font-size: 24px"></i>
        </button>
        <button
          @click="targetToday"
          class="hover:bg-zinc-700 text-zinc-300 hover:text-zinc-50 flex items-center justify-center p-1 transition-colors rounded-full"
        >
          <i class="ph-anchor-simple" style="font-size: 24px"></i>
        </button>
        <button
          @click="closeDropMenu"
          class="hover:bg-zinc-700 text-zinc-300 hover:text-zinc-50 flex items-center justify-center p-1 transition-colors rounded-full"
        >
          <i class="ph-check" style="font-size: 24px"></i>
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import dayjs from "dayjs";

type DateValue = string | null | undefined;

const props = defineProps<{
  givenDate: DateValue;
  disabled: boolean;
}>();

const emit = defineEmits<{
  (e: "update:givenDate", newVal: DateValue): void;
}>();

const openingDropMenu = ref<boolean>(false);
const openDropMenu = () => {
  if (!props.disabled) {
    openingDropMenu.value = true;
    drawBricks();
  }
};
const closeDropMenu = () => {
  openingDropMenu.value = false;
};

const weeks = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const selectedIndex = ref<number>(dayjs(props.givenDate || undefined).date());
const setSelectedDay = (index: number) => {
  emit(
    "update:givenDate",
    dayjs(props.givenDate || undefined)
      .date(index)
      .format()
  );
  selectedIndex.value = index;
};

const beginBrick = ref();
const monthBrick = ref();
const endBrick = ref();

const drawBricks = () => {
  console.log("givenDate", props.givenDate);
  console.log("givenDate", dayjs(props.givenDate || undefined).format());

  const daysInMouthAmount = dayjs(props.givenDate || undefined).daysInMonth();

  const beginDay = dayjs(props.givenDate || undefined)
    .startOf("month")
    .day();
  console.log("beginDay", beginDay);

  beginBrick.value = Array.from({ length: beginDay }).map((i, index) => {
    return index;
  });
  monthBrick.value = Array.from({ length: daysInMouthAmount }).map(
    (i, index) => {
      return index;
    }
  );
  endBrick.value = Array.from({
    length: 6 * 7 - beginDay - daysInMouthAmount,
  }).map((i, index) => {
    return index;
  });
};

watch(
  () => props.givenDate,
  () => {
    drawBricks();
  }
  // {
  //   immediate: true,
  // }
);

const nextMonth = () => {
  emit(
    "update:givenDate",
    dayjs(props.givenDate || undefined)
      .add(1, "month")
      .format()
  );
};
const prevMonth = () => {
  emit(
    "update:givenDate",
    dayjs(props.givenDate || undefined)
      .subtract(1, "month")
      .format()
  );
};
const nextYear = () => {
  emit(
    "update:givenDate",
    dayjs(props.givenDate || undefined)
      .add(1, "year")
      .format()
  );
};
const prevYear = () => {
  emit(
    "update:givenDate",
    dayjs(props.givenDate || undefined)
      .subtract(1, "year")
      .format()
  );
};

const clearDate = () => {
  emit("update:givenDate", null);
  closeDropMenu();
};

const targetToday = () => {
  emit("update:givenDate", dayjs().format());
  selectedIndex.value = dayjs().date();
};
</script>
<style>
.cal {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
}
</style>
