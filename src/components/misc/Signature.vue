<template>
  <div class="sig">
    <p v-if="color" style="color: white">
    Website by
    <a style="color: white" href="https://jamesonb.com/" target="_blanks">
      Jameson Brown
    </a>
  </p>
  <p v-else class="sig">
    Website by
    <a href="https://jamesonb.com/" target="_blanks">
      Jameson Brown
    </a>
  </p>
  </div>
</template>

<script>
export default {
  name: "Signature",
  props: ["color"],
  data() {
    return {};
  }
};
</script>

<style>
.sig {
  position: fixed;
  bottom: 5px;
  width: 100%;
  font-size: 0.85em;
}
</style>
