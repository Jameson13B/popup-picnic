<template>
  <div class="nav">
    <router-link to="/">Home</router-link> | 
    <router-link to="/about">About</router-link> | 
    <router-link to="/picnic-schedule">Schedule</router-link>
  </div>
</template>

<script>
export default {
  name: "Nav"
};
</script>

<style>
.nav {
  padding: 30px;
  background: #eee;
}

.nav a {
  font-weight: bold;
  font-size: 1.5em;
  color: #2c3e50;
  margin: 0 10px;
}

.nav a.router-link-exact-active {
  color: #eb0202;
}
@media (max-width: 600px) {
  .nav {
    padding: 25px 20px;
  }
  .nav a {
    font-size: 1.25em;
  }
}
</style>
