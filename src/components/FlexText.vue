<template>
  <div class="flex w-screen h-screen bg-red-100">
    <div class="w-1/2"></div>
    <div class="flex flex-col w-1/2 h-screen overflow-hidden bg-red-300">
      <div class="h-32 bg-blue-200">
        <p class="text-2xl">
          uasfdhgaosidufhasifhasoidfhsadoi<br />dfhsaiofuhasfisahfsakfhasfkjhsaflkhasfksahfsaklfjhsalkfdhsklajfhslkfhslkajfhsklhfskjfhskjdhfklasdjhfkalsdfhsklfhkl
        </p>
      </div>
      <img
        src="https://images.unsplash.com/photo-1667426195933-8ee7be35c390?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=700&q=60"
        alt=""
        class="img-test"
      />
      <div class="flex-1 overflow-hidden">
        <p class="text-2xl">
          uasfdhgaosidufhasifhasoidfhsadoi<br />dfhsaiofuhasfisahfsakfhasfkjhsaflkhasfksahfsaklfjhsalkfdhsklajfhslkfhslkajfhsklhfskjfhskjdhfklasdjhfkalsdfhsklfhkl
        </p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  setup() {},
});
</script>
<style>
.img-test {
  /* flex: 1; */
  overflow: hidden;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0;
}
</style>
