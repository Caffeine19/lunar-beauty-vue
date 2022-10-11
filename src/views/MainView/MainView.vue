<template>
  <div
    class="bg-[url('./assets/images/Background.svg')] w-screen h-screen bg-cover bg-center flex flex-col"
  >
    <MyHeader></MyHeader>
    <div class="grow flex"><MySider></MySider> <RouterView></RouterView></div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { RouterView } from "vue-router";
import MyHeader from "@/components/MyHeader.vue";
import MySider from "@/components/MySider.vue";
export default defineComponent({
  components: { RouterView, MyHeader, MySider },
});
</script>
<style lang=""></style>
