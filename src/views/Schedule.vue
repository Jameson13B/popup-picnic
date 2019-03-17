<template>
  <div class="schedule">
    <div class="content">
      <h2>Schedule</h2>
      <p v-if="feedback" class="feedback">{{ feedback }}</p>
      <div v-if="user">
        <PicnicSum v-for="picnic in sortedPicnics" :picnic="picnic" :key="picnic._id" />
      </div>
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
import axios from "axios";
import PicnicSum from "@/components/misc/PicnicSum";
import { ui, uiConfig } from "@/firebase/init";
import firebase from "firebase";

export default {
  name: "Schedule",
  components: {
    PicnicSum
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
        this.feedback = "Login to see Picnics";
      }
    });
    // Get picnics from server
    axios
      .get("https://popup-picnic-server.herokuapp.com/picnics")
      .then(res => {
        this.picnics = res.data;
      })
      .catch(() => {
        this.feedback = "Failed to load picnics. Refresh the page.";
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
