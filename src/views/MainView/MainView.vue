<template>
  <div
    class="grid w-screen h-screen"
    style="grid-template-columns: auto 1fr; grid-template-rows: auto 1fr"
  >
    <div class="border-zinc-900 flex flex-col justify-end border-r">
      <div class="grow flex items-center px-4 space-x-6">
        <img
          src="@/assets/images/Icon/48.svg"
          alt="product icon"
          class="w-8 h-8"
        />
        <h1
          class="text-zinc-900 libertinus-semibold xl:block hidden text-2xl font-semibold"
        >
          Lunar Beauty
        </h1>
      </div>
      <div
        class="h-[1px] border-b-[1px] w-[90%] float-right border-zinc-900 transition-all self-end"
      ></div>
    </div>

    <MyHeader></MyHeader>
    <MySider></MySider>

    <router-view></router-view>

    <UserSettingPanel></UserSettingPanel>
    <LunarDialog></LunarDialog>
    <RoutineCreatePanel></RoutineCreatePanel>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { RouterView } from "vue-router";
import MyHeader from "@/components/MyHeader.vue";
import MySider from "@/components/MySider.vue";
import UserSettingPanel from "@/components/UserSettingPanel.vue";
import LunarDialog from "@/components/LunarDialog.vue";
import RoutineCreatePanel from "@/components/RoutineCreatePanel.vue";
export default defineComponent({
  components: {
    RouterView,
    MyHeader,
    MySider,
    UserSettingPanel,
    LunarDialog,
    RoutineCreatePanel,
  },
});
</script>
<style lang=""></style>
