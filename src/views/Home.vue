<template>
  <div class="home">
    <Quote />
  </div>
</template>

<script>
import Quote from "@/components/misc/Quote";

export default {
  name: "Home",
  data() {
    return {};
  },
  components: {
    Quote
  }
};
</script>

<style>
.home {
  height: 100%;
  width: 100%;
  margin: 0 auto;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  background-image: url("../assets/image3.jpg");
  background-size: cover;
}
.home .quote {
  margin-top: 35vh;
}
</style>
