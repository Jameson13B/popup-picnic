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
  },
  methods: {}
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
.auth-modal {
  display: none;
  background: #eee;
  position: absolute;
  height: 100%;
  width: 100%;
  padding-top: 60px;
  top: 0;
  left: 0;
}
.auth-modal li {
  list-style-type: none;
}
</style>
