<template lang="pug">
Amis(:amisjson="amisjson")
</template>

<script setup>
import Amis from "../components/Amis.vue";

const amisjson = {
  type: "page",
  body: [
    {
      type: "form",
      title: "接口配置",
      mode: "horizontal",
      api: "/mock/api.json",
      reload: "otherForm?data=${data}",
      body: [
        {
          type: "textarea",
          name: "config",
        },
      ],
      submitText: "保存",
    },
    {
      type: "form",
      title: "发起请求",
      mode: "horizontal",
      api: "/mock/api.json",
      reload: "otherForm?data=${data}",
      body: [
        {
          label: "接口地址",
          type: "input-text",
          name: "url",
        },
        {
          label: "接口方式",
          type: "select",
          name: "type",
          options: [
            {
              label: "GET",
              value: "get",
            },
            {
              label: "POST",
              value: "post",
            },
          ],
        },
        {
          label: "入参",
          type: "textarea",
          name: "body",
        },
      ],
      submitText: "发送",
    },
    {
      type: "form",
      name: "otherForm",
      title: "返回结果",
      actions: [],
      body: [
        {
          type: "static",
          name: "data",
        }
      ]
    }
  ],
};
</script>

<style scoped>
/* Add your styles here */
.main {
  width: 50%;
  margin: auto;
}
</style>
