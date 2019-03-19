<template>
  <div class="home">
    <Quote />
  </div>
</template>

<script>
import Quote from "@/components/misc/Quote";

export default {
  name: "Home",
  components: {
    Quote
  },
  data() {
    return {};
  },
  methods: {}
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
  background-image: url("../assets/background.jpg");
  background-size: cover;
  background-position: center;
}
.home .quote {
  margin-top: 35vh;
}
@media (max-width: 600px) {
  .home {
    width: 80%;
    padding: 0 10%;
  }
}
</style>
