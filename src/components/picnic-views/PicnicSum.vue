<template>
  <div class="picnic-sum" @click.prevent="viewProfile">
    <h2 class="title">{{ picnic.title | title }}</h2>
    <p class="description">{{ picnic.description }}</p>
    <h5 class="location">@ the {{ picnic.location}}</h5>
    <p class="date">{{ picnic.date | date }}</p>
  </div>
</template>

<script>
export default {
  name: 'PicnicSum',
  props: ['picnic'],
  data() {
    return {};
  },
  methods: {
    viewProfile() {
      this.$router.push({
        name: 'ViewPicnic',
        params: { id: this.picnic._id }
      });
    }
  }
};
</script>

<style>
.picnic-sum {
  max-width: 500px;
  margin: 0 auto;
  border: 4px solid #eee;
  border-radius: 15px;
  margin-bottom: 15px;
  cursor: pointer;
  box-shadow: 3px 3px 10px #eee;
}
.picnic-sum .location {
  text-transform: capitalize;
}
</style>
