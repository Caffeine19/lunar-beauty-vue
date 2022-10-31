<template>
  <div></div>
</template>

<script lang="ts">
import axios from "axios";
export default {
  data() {
    return {};
  },
  methods: {
    getData() {
      return axios.post("http://localhost:3008/api/storeItem/findByUser", {
        userId: 1,
      });
    },
    useRes() {
      return axios.post("http://localhost:3008/api/storeItem/findByUser", {
        userId: 2,
      });
    },
  },
  async mounted() {
    try {
      const res = await this.getData();
      console.log(res.data);
    } catch (error) {
      console.log("f");
    }
    try {
      const res = await this.useRes();
      console.log(res.data);
    } catch (error) {
      console.log("f");
    }
  },
};
</script>

<style></style>
