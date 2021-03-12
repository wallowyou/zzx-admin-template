import store from "@/store";

const { body } = document;
const WIDTH = 992;

export default {
  watch: {},
  beforeMount() {
    window.addEventListener("resize", this.$_resizeHandler);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.$_resizeHandler);
  },
  mounted() {
    const isMobile = this.$_isMobile();
    if (isMobile) {
      store.dispatch("app/closeSideBar");
    }
  },
  methods: {
    $_isMobile() {
      const rect = body.getBoundingClientRect();
      return rect.width - 1 < WIDTH;
    },
    $_resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.$_isMobile();
        if (isMobile) {
          store.dispatch("app/closeSideBar");
        }
      }
    }
  }
};
