<template>
    <div class="demo-box">
        <action-bar :buttons="buttons" />
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { type ActionButton } from "@yujinjin/cms-components-main/index";

const buttons = ref<ActionButton[]>([{ contents: "新增", type: "primary" }, { contents: "批量删除" }]);
</script>
