<template>
  <div>
    <h1>About Page</h1>
    <router-link to="/">Home  </router-link>
    <router-link to="/about">About</router-link>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'

export default {
  name: 'aboutPage',
  setup() {
    const route = useRoute()

    // do something with route

    return {
      route
    }
  }
}
</script>

<style scoped>
/* Add your styles here */
</style>
