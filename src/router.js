import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Schedule from "./views/Schedule.vue";
import ViewPicnic from "./views/ViewPicnic.vue";
import Profile from "./views/Profile.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/about",
      name: "About",
      component: About
    },
    {
      path: "/picnic-schedule",
      name: "Schedule",
      component: Schedule
    },
    {
      path: "/picnic/:id",
      name: "ViewPicnic",
      component: ViewPicnic
    },
    {
      path: "/profile/:id",
      name: "Profile",
      component: Profile
    }
  ]
});
