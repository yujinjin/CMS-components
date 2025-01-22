<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2025-01-13 11:01:03
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-22 11:51:32
 * @项目的路径: \CMS-components\play\src\action-bar\example3.vue
 * @描述: action-bar组件自定义布局示例
-->
<template>
    <div class="example-page">
        <h3>自定义布局</h3>
        <action-bar :buttons="buttons" align="right">
            <el-radio-group v-model="tabValue">
                <el-radio-button value="全部" label="全部" />
                <el-radio-button value="待处理" label="待处理" />
                <el-radio-button value="已处理" label="已处理" />
            </el-radio-group>
            <template #more>
                <el-dropdown style="margin-left: 8px">
                    <el-button>
                        更多操作
                        <el-icon class="el-icon--right"><arrow-down /></el-icon>
                    </el-button>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>导出</el-dropdown-item>
                            <el-dropdown-item>批量删除</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </template>
        </action-bar>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { type ActionButton, ActionBar } from "@yujinjin/cms-components/index";
import { ArrowDown } from "@element-plus/icons-vue";

const tabValue = ref("全部");

const buttons = ref<ActionButton[]>([{ contents: "新增", type: "primary" }, { slot: "more" }]);
</script>
<style lang="scss" scoped>
.example-page {
    padding: 12px;
}
</style>
