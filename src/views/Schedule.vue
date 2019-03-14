<template>
  <div class="schedule">
    <h2>Schedule</h2>
    <ul class="schedule-list">
      <PicnicSum v-for="picnic in picnics" :picnic="picnic" :key="picnic._id" />
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import PicnicSum from "@/components/misc/PicnicSum";

export default {
  name: "Schedule",
  data() {
    return {
      picnics: []
    };
  },
  components: {
    PicnicSum
  },
  created() {
    axios
      .get("https://popup-picnic-server.herokuapp.com/picnics")
      .then(res => {
        this.picnics = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style>
</style>
