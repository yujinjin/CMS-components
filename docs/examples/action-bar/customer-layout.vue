<template>
    <div class="demo-box">
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
import { type ActionButton } from "@yujinjin/cms-components/index";
import { ArrowDown } from "@element-plus/icons-vue";

const tabValue = ref("全部");

const buttons = ref<ActionButton[]>([{ contents: "新增", type: "primary" }, { slot: "more" }]);
</script>
