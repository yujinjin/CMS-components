<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2025-01-13 11:13:55
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-16 15:01:41
 * @项目的路径: \CMS-components\play\src\web-editor\example4.vue
 * @描述: web-editor组件的只读模式示例
-->
<template>
    <div class="example-page">
        <h3>只读模式</h3>
        <web-editor v-model="content" :disabled="readonly" />
        <el-button class="mt-12" type="primary" @click="toggleReadonly">切换只读状态</el-button>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { WebEditor } from "@yujinjin/cms-components-main/index";

const content = ref(`
    <h2>这是一个标题</h2>
    <p>这是一段普通文本</p>
    <ul>
        <li>列表项 1</li>
        <li>列表项 2</li>
        <li>列表项 3</li>
    </ul>
    <blockquote>这是一段引用文本</blockquote>
`);

const readonly = ref(true);

const toggleReadonly = () => {
    readonly.value = !readonly.value;
};
</script>
<style lang="scss" scoped>
.example-page {
    padding: 12px;
}
.mt-12 {
    margin-top: 12px;
}
</style>
