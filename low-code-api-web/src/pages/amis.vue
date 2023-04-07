<template>
  <Amis :amisjson="amisjson"></Amis>
</template>

<script lang="ts" setup>
import Amis from "../components/Amis.vue";

const amisjson = {
  type: 'form',
  mode: 'horizontal',
  body: [
    {
      label: '用户名',
      type: 'input-text',
      name: 'name'
    },
    {
      label: '密码',
      type: 'input-text',
      name: 'password'
    }
  ]
}
</script>
