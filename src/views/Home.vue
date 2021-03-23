<template>
  <div class="layout-page">
    这是home页面
    <div style="height:2000px;"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import { getLists } from "@/api/table";

export default {
  name: "Home",
  components: {},
  created() {
    this.getDatas();
  },
  methods: {
    getDatas() {
      getLists().then(res => {
        console.log(res);
      });
    }
  }
};
</script>
