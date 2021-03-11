<template>
  <div class="home">
    这是home页面
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
