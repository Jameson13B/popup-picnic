<template>
  <div class="app">
    <Nav />
    <router-view/>
  </div>

</template>

<script>
import Nav from "@/components/layouts/Nav.vue";

export default {
  name: "App",
  components: {
    Nav
  }
};
</script>


<style>
body {
  margin: 0;
}
.app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
