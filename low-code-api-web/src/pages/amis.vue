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
</script>
