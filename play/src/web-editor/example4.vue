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
        <p class="demo-desc">设置 readOnly 属性使编辑器进入只读模式</p>
        <div class="demo-block">
            <web-editor v-model="content" :disabled="readonly" />
            <div style="margin-top: 12px">
                <el-button type="primary" @click="toggleReadonly">切换只读状态</el-button>
            </div>
        </div>
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

// 切换只读/编辑状态
const toggleReadonly = () => {
    readonly.value = !readonly.value;
};
</script>
