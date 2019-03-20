<template>
  <div class="schedule">
    <div class="content">
      <h2>Schedule</h2>
      <p v-if="feedback" class="feedback">{{ feedback }}</p>
      <div v-if="user">
        <PicnicSum v-for="picnic in sortedPicnics" :picnic="picnic" :key="picnic._id" />
      </div>
      <div v-if="!picnics.length && !feedback" class="loader"></div>
      <p v-if="!user" class="feedback">Login to see Picnics</p>
    </div>
    <Auth :user="user" />
  </div>
</template>

<script>
import axios from "axios";
import PicnicSum from "@/components/picnic-views/PicnicSum";
import Auth from "@/components/auth/Auth";
import firebase from "firebase";

export default {
  name: "Schedule",
  components: {
    PicnicSum,
    Auth
  },
  data() {
    return {
      picnics: [],
      user: null,
      feedback: null
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
    // set listern to check if user is logged in or not
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        axios
          .get("https://popup-picnic-server.herokuapp.com/login", {
            headers: { Authorization: user.uid }
          })
          .then(res => {
            this.user = res.data;
          })
          .catch(err => {
            this.feedback = err.message;
          });
      } else {
        this.user = null;
      }
    });
    // Get picnics from server
    axios
      .get("https://popup-picnic-server.herokuapp.com/picnics")
      .then(res => {
        this.picnics = res.data;
        this.feedback = null;
      })
      .catch(() => {
        this.feedback = "Failed to load picnics. Refresh the page.";
      });
  }
};
</script>

<style>
.schedule .content {
  height: 88%;
  width: 100%;
  position: absolute;
  z-index: -1;
  overflow: auto;
}
.feedback {
  color: red;
  font-weight: 700;
}
.loader {
  border: 10px solid #f3f3f3;
  border-top: 10px solid #eb0202;
  border-radius: 50%;
  margin: 0 auto;
  width: 75px;
  height: 75px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@media (max-width: 600px) {
  .schedule .content {
    width: 80%;
    padding: 0 10%;
  }
}
</style>
