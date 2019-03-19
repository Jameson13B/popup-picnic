<template>
  <div class="join-btn" @click.prevent="joinPicnic">Join Picnic</div>
</template>

<script>
export default {
  name: "JoinBtn",
  props: ["joinPicnic"],
  data() {
    return {};
  }
};
</script>

<style>
.join-btn {
  display: inline-block;
  padding: 10px 15px;
  border: 2px solid #eb0202;
  border-radius: 15px;
  cursor: pointer;
}
.join-btn:hover {
  color: #fff;
  background: #eb0202;
}
</style>
