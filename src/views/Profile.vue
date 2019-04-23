<template>
  <div class="profile">
    <h2>Profile</h2>
    <div v-if="user" class="content">
      <p>{{ user.name }}</p>
      <p>{{ user.email }}</p>
      <ul class="picnics">
        <h4>Attending:</h4>
        <li v-for="picnic in user.picnics" :key="picnic._id"><strong @click.prevent='viewPicnic(picnic._id)'>{{ picnic.title }}</strong> - {{ picnic.date | date }}</li>
        <p v-if="!user.picnics.length">None currently attending</p>
      </ul>
      <div class="logout-btn" @click.prevent="logout">Logout</div>
    </div>
    <Auth v-if="!user" :user="user" />
    <p v-if="feedback" class="feedback">{{ feedback }}</p>
    <Signature />
  </div>
</template>

<script>
import firebase from 'firebase';
import axios from 'axios';
import Auth from '@/components/auth/Auth';
import Signature from '@/components/misc/Signature.vue';

export default {
  name: 'Profile',
  data() {
    return {
      user: null,
      feedback: null
    };
  },
  components: {
    Auth,
    Signature
  },
  created() {
    // set listern to check if user is logged in or not
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        axios
          .get('https://popup-picnic-server.herokuapp.com/login', {
            headers: { Authorization: user.uid }
          })
          .then(res => {
            this.user = res.data;
            this.feedback = null;
          })
          .catch(err => {
            this.feedback = err.message;
          });
      } else {
        this.user = null;
        this.feedback = 'Login to see Picnics';
      }
    });
  },
  methods: {
    logout() {
      firebase.auth().signOut();
    },
    viewPicnic(id) {
      this.$router.push({
        name: 'ViewPicnic',
        params: { id: id }
      });
    }
  }
};
</script>

<style>
.profile .content {
  max-width: 768px;
  margin: 15px auto;
  border: 3px solid #eee;
  border-radius: 15px;
}
.profile .logout-btn {
  border: 2px solid #eb0202;
  border-radius: 15px;
  width: 15%;
  padding: 10px;
  margin: 0 auto 15px;
  cursor: pointer;
}
.profile .logout-btn:hover {
  background: #eb0202;
  color: white;
}
.feedback {
  color: red;
  font-weight: 700;
}
.picnics {
  list-style-type: none;
  padding: 0;
}
.picnics strong {
  cursor: pointer;
}
@media (max-width: 600px) {
  .profile .content {
    max-width: 90%;
  }
  .profile .logout-btn {
    font-size: 0.9em;
  }
}
</style>
