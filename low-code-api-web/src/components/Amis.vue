<template>
    <div id="box"></div>
</template>

<script lang="ts" setup>
import {  onMounted } from "vue";

const props= defineProps({
    amisjson: {
        type: Object,
        required: true
    }
})

onMounted(() => {
    // @ts-ignore
    var amis = amisRequire('amis/embed');
    let amisScoped = amis.embed('#box', props.amisjson);
})
</script>