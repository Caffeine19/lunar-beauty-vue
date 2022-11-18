<template>
  <div class="flex flex-col w-screen h-screen">
    <MyHeader></MyHeader>
    <div class="grow flex overflow-hidden">
      <MySider></MySider> <RouterView></RouterView>
    </div>
    <UserSettingPanel></UserSettingPanel>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { RouterView } from "vue-router";
import MyHeader from "@/components/MyHeader.vue";
import MySider from "@/components/MySider.vue";
import UserSettingPanel from "@/components/UserSettingPanel.vue";
export default defineComponent({
  components: { RouterView, MyHeader, MySider, UserSettingPanel },
});
</script>
<style lang=""></style>
