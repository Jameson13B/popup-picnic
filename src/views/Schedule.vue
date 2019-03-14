<template>
  <div class="schedule">
    <div class="content">
      <h2>Schedule</h2>
      <PicnicSum v-for="picnic in sortedPicnics" :picnic="picnic" :key="picnic._id" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import PicnicSum from "@/components/misc/PicnicSum";

export default {
  name: "Schedule",
  components: {
    PicnicSum
  },
  data() {
    return {
      picnics: []
    };
  },
  computed: {
    sortedPicnics() {
      return [...this.picnics].sort((a, b) => {
        if (a.date < b.date) return -1;
        if (a.date > b.date) return 1;
        return 0;
      });
    }
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
.content {
  height: 88%;
  width: 100%;
  position: absolute;
  z-index: -1;
  overflow: auto;
}
</style>
