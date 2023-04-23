<template>
  <div class="site">
    <div class="nav">
        <h3>接口低代码系统</h3>
        <!-- <Amis :amisjson="amisjson"></Amis> -->
    </div>

    <div class="container">
        <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Amis from "./Amis.vue";

const amisjson = {
    "type": "page",
    "body": {
      "type": "nav",
      "stacked": true,
      "links": [
        {
          "label": "数据管理",
          "to": "",
          "id": "0",
          "children": [
            {
              "label": "数据源",
              "to": "?jsonfile=source",
              "active": false,
              "children": [
              ]
            },
            {
              "label": "数据表",
              "to": "?jsonfile=tables",
              "active": false,
              "children": [
              ]
            }
          ]
        },
        {
          "label": "接口管理",
          "to": "",
          "id": "1",
          "children": [
            {
              "label": "登录模块",
              "to": "",
              "active": false,
              "children": [
                {
                  "label": "注册",
                  "to": "/apiConfig?path=register",
                  "active": false,
                  "children": [
                  ]
                },
                {
                  "label": "登录",
                  "to": "/apiConfig?path=login",
                  "active": false,
                  "children": [
                  ]
                }
              ]
            }
          ]
        }
      ],
      "id": "u:a9392aa4216c"
    }
}
</script>

<style scoped>
/* Add your styles here */
.site {
    display: flex;
}
.nav {
    width: 210px;
    height: 100vh;
    background: #f1f1f1;
}
.nav :deep(.cxd-Page-body) {
    background: #f1f1f1;
}
.container {
    flex: 1;
}
</style>
