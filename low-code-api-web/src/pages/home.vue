<template>
  <div>
    <img alt="Vue logo" src="../assets/vue.svg">
    <h1>Home Page</h1>
    <Amis :amisjson="amisjson"></Amis>
    <router-link to="/">Home  </router-link>
    <router-link to="/about">About</router-link>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import Amis from "../components/Amis.vue";

export default {
  name: 'homePage',
  components: {
    Amis
  },
  setup() {
    const route = useRoute()
    const amisjson = {
      type: 'form',
      mode: 'horizontal',
      body: [
        {
          label: 'Name',
          type: 'input-text',
          name: 'name'
        },
        {
          label: 'Email',
          type: 'input-email',
          name: 'email'
        }
      ]
    }

    // do something with route

    return {
      route,
      amisjson
    }
  }
}
</script>

<style scoped>
/* Add your styles here */
</style>
