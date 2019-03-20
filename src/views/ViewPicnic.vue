<template>
  <div class="picnic">
    <h2>Single Picnic View</h2>
    <div v-if="user" class="content">
      <h2 class="title">{{ picnic.title | title }}</h2>
      <p class="description">{{ picnic.description }}</p>
      <h5 class="location">@ the {{ picnic.location}}</h5>
      <p class="date">{{ picnic.date | date }}</p>
      <hr/>
      <ul class="attendees">
        <JoinBtn />
        <h3>Attendees:</h3>
        <li v-for="(attendee, i) in picnic.attendees" :key="i">{{ attendee }}</li>
        <p v-if="!picnic.attendees[0]">Be the first to join!</p>
      </ul>
    </div>
    <p class="feedback">{{ feedback }}</p>
    <Auth :user="user" />
  </div>
</template>

<script>
import firebase from "firebase";
import axios from "axios";
import Auth from "@/components/auth/Auth";
import JoinBtn from "@/components/misc/JoinBtn";

export default {
  name: "Picnic",
  data() {
    return {
      picnic: null,
      user: null,
      feedback: null
    };
  },
  components: {
    Auth,
    JoinBtn
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
        this.feedback = "Login to see Picnic Info";
      }
    });
    // Get picnic info from server
    const id = this.$route.params.id;
    axios
      .get(`https://popup-picnic-server.herokuapp.com/picnics/${id}`)
      .then(res => {
        this.picnic = res.data;
      })
      .catch(() => {
        this.feedback = "Failed to load picnic. Refresh the page.";
      });
  }
};
</script>

<style>
.picnic .content {
  max-width: 768px;
  margin: 15px auto;
  border: 3px solid #eee;
  border-radius: 15px;
}
.feedback {
  color: red;
  font-weight: 700;
}
.attendees {
  list-style-type: none;
  padding: 0;
}
@media (max-width: 600px) {
  .picnic .content {
    max-width: 90%;
  }
}
</style>
