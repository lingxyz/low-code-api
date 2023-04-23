<template lang="pug">
#app
  NavContainer(v-if='$router.currentRoute.value.path != "/login"')
      router-view
  div(v-else)
      router-view
</template>

<script lang="ts" setup>
import NavContainer from "./components/NavContainer.vue";
</script>

<style>
/* Add your styles here */
#app {
  width: 100%;
  padding: 0;
}
</style>