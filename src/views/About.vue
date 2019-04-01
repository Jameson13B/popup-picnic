<template>
  <div class="about">
    <h2>About</h2>
    <p class="center">Popup Picnics are events typically in outdoor areas that center around social 
      gatherings, food, and adventure. When people gather together we are generally 
      happier and we are more unified together as one.
    </p>
    <Signature />
  </div>
</template>

<script>
import Signature from "@/components/misc/Signature.vue";

export default {
  name: "About",
  components: {
    Signature
  },
  data() {
    return {};
  }
};
</script>

<style>
.about .center {
  max-width: 600px;
  margin: 0 auto;
}
</style>
