<template>
  <div class="auth">
    <!-- Button for login -->
    <div @click.prevent="login" id="login-btn" v-if="!user">Login</div>
    <!-- Button for logged in user -->
    <div v-if="user" @click.prevent="viewProfile" id="profile-btn">{{ user.name }}</div>
    <div v-if="user" @click.prevent="viewProfile" id="profile-btn-mobile">{{ user.name | icon }}</div>
    <!-- Div for login modal -->
    <div id="firebaseui-auth-container" class="auth-modal"></div>
  </div>
</template>

<script>
import firebase from "firebase";
import { ui, uiConfig } from "@/firebase/init";

export default {
  name: "Auth",
  props: ["user"],
  data() {
    return {};
  },
  methods: {
    login() {
      ui.start("#firebaseui-auth-container", uiConfig);
      ui.disableAutoSignIn();
    },
    logout() {
      firebase.auth().signOut();
    },
    viewProfile() {
      this.$router.push({ name: "Profile", params: { id: this.user._id } });
    }
  }
};
</script>

<style>
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
#profile-btn-mobile {
  display: none;
}
@media (max-width: 600px) {
  #login-btn {
    bottom: 10px;
    right: 10px;
    height: 35px;
    width: 35px;
  }
  #profile-btn {
    display: none;
  }
  #profile-btn-mobile {
    display: flex;
    position: absolute;
    bottom: 5px;
    right: 5px;
    height: 35px;
    width: 35px;
    align-items: center;
    justify-content: center;
    border: 2px solid #eb0202;
    border-radius: 50%;
    font-weight: 500;
    cursor: pointer;
  }
}
</style>
