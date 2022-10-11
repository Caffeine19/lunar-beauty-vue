<template>
  <div
    class="border-r-[1px] border-zinc-900 flex flex-col w-fit py-4 space-y-4 justify-start h-full"
  >
    <router-link
      v-for="(tab, index) in siderTabOption"
      :key="index"
      :to="{ name: tab.to }"
      class="text-zinc-900 py-2 px-4 flex items-center space-x-6 hover:bg-zinc-900/10 transition-colors"
      :class="
        currentRoute.name == tab.to
          ? 'text-zinc-50 bg-gradient-to-r from-[#C5B1B8] to-[#DBC5CF]'
          : ''
      "
    >
      <i class="" style="font-size: 32px" :class="tab.iconClass"></i>
      <p class="font-normal text-xl">{{ tab.name }}</p>
    </router-link>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";
import { RouterLink, useRoute } from "vue-router";
export default defineComponent({
  components: { RouterLink },
  setup() {
    const siderTabOption = reactive([
      {
        name: "HomePage",
        to: "home",
        iconClass: "ph-bank",
      },
      {
        name: "Library",
        to: "library",
        iconClass: "ph-books",
      },
      {
        name: "Routine",
        to: "routine",
        iconClass: "ph-map-trifold",
      },
      {
        name: "Store",
        to: "store",
        iconClass: "ph-package",
      },
    ]);
    const currentRoute = useRoute();
    return {
      siderTabOption,
      currentRoute,
    };
  },
});
</script>
<style lang=""></style>
