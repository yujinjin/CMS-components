<!--
 * @创建者: yujinjin-jk
 * @创建时间: 2026-06-11
 * @描述: web-editor 组件 - 自定义工具栏示例
-->
<template>
    <div class="example-page">
        <div class="demo-section">
            <h3>数组工具栏（分组）</h3>
            <p class="demo-desc">toolbar 为数组时，每个元素代表一组工具按钮，嵌套数组表示分组</p>
            <div class="demo-block">
                <web-editor v-model="value1" :toolbar="groupedToolbar" />
            </div>
        </div>

        <div class="demo-section">
            <h3>数组工具栏</h3>
            <p class="demo-desc">toolbar 为数组时，每个元素代表一组工具按钮，嵌套数组表示分组</p>
            <div class="demo-block">
                <web-editor v-model="value2" :toolbar="customToolbar" />
            </div>
        </div>

        <div class="demo-section">
            <h3>精简工具栏</h3>
            <p class="demo-desc">仅保留最常用的格式化功能</p>
            <div class="demo-block">
                <web-editor v-model="value3" :toolbar="minimalToolbar" />
            </div>
        </div>

        <div class="demo-section">
            <h3>默认工具栏（不传 toolbar）</h3>
            <p class="demo-desc">不传 toolbar 时使用组件内置的默认工具栏配置</p>
            <div class="demo-block">
                <web-editor v-model="value4" />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { WebEditor } from "@yujinjin/cms-components-main/index";

const value1 = ref("<p>分组工具栏内容</p>");
const value2 = ref("<p>数组工具栏内容</p>");
const value3 = ref("<p>精简工具栏内容</p>");
const value4 = ref("<p>默认工具栏内容</p>");

// 分组工具栏：每组按钮用嵌套数组包裹，组之间视觉分隔
const groupedToolbar = [["bold", "italic", "underline"], [{ list: "ordered" }, { list: "bullet" }], ["link", "image"], ["clean"]];

// 自定义数组工具栏：加粗/斜体/下划线 | 标题 | 列表 | 引用/链接 | 清除
const customToolbar = [["bold", "italic", "underline"], [{ header: 1 }, { header: 2 }], [{ list: "ordered" }, { list: "bullet" }], ["blockquote", "link"], ["clean"]];

// 精简工具栏：仅加粗、斜体、列表
const minimalToolbar = [["bold", "italic"], [{ list: "ordered" }, { list: "bullet" }], ["clean"]];
</script>
