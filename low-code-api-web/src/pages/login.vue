<template>
  <div class="main">
    <Amis :amisjson="amisjson"></Amis>
    <div>
      <router-link to="/">Home</router-link>
    </div>
  </div>
</template>

<script setup>
import Amis from "../components/Amis.vue";
  
const amisjson = {
  type: 'form',
  mode: 'horizontal',
  api: "/amis/api/mock2/form/saveForm",
  body: [
    {
      label: '用户名',
      type: 'input-text',
      name: 'name'
    },
    {
      label: '密码',
      type: 'input-password',
      name: 'password'
    }
  ],
  submitText: "登录"
}
</script>

<style scoped>
/* Add your styles here */
.main {
  width: 50%;
  margin: auto;
}
</style>
