<template>
  <div class="picnic">
    <div class="content">
      <h2>Single Picnic View</h2>
      <hr/>
      <h2 class="title">{{ picnic.title | title }}</h2>
      <p class="description">{{ picnic.description }}</p>
      <h5 class="location">@ the {{ picnic.location}}</h5>
      <p class="date">{{ picnic.date | date }}</p>
      <hr/>
      <ul class="attendees">
        <h3>Attendees:</h3>
        <li v-for="(attendee, i) in picnic.attendees" :key="i">{{ attendee }}</li>
        <p v-if="!picnic.attendees[0]">Be the first to join!</p>
      </ul>
    </div>
    <!-- Button for login -->
    <div @click.prevent="login" id="login-btn" v-if="!user">Login</div>
    <!-- Button for logged in user -->
    <div v-if="user" @click.prevent="logout" id="profile-btn">{{ user.name }}</div>
    <!-- Div for login modal -->
    <div id="firebaseui-auth-container" class="auth-modal"></div>
  </div>
</template>

<script>
import firebase from "firebase";
import { ui, uiConfig } from "@/firebase/init";
import axios from "axios";

export default {
  name: "Picnic",
  data() {
    return {
      picnic: null,
      user: null,
      feedback: null
    };
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
  },
  methods: {
    login() {
      ui.start("#firebaseui-auth-container", uiConfig);
      ui.disableAutoSignIn();
    },
    logout() {
      firebase.auth().signOut();
    }
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
#login-btn {
  position: absolute;
  bottom: 15px;
  right: 15px;
  height: 35px;
  width: 35px;
  padding: 10px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 2px solid #eb0202;
  font-weight: 500;
}
#login-btn:hover {
  background: #eb0202;
  color: #eee;
}
#profile-btn {
  position: absolute;
  bottom: 15px;
  right: 15px;
  height: 55px;
  width: 55px;
  padding: 10px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 2px solid #eb0202;
  font-weight: 500;
}
#profile-btn:hover {
  background: #eb0202;
  color: #eee;
}
</style>
