<!--
 * @创建者: yujinjin-jk
 * @创建时间: 2026-06-11
 * @描述: action-bar 组件 - center 对齐与空按钮示例
-->
<template>
    <div class="example-page">
        <div class="demo-section">
            <h3>center 对齐</h3>
            <p class="demo-desc">align="center" 时，按钮面板居中对齐，默认插槽内容在按钮面板前面展示</p>
            <div class="demo-block">
                <action-bar :buttons="buttons" align="center">
                    <el-radio-group v-model="tabValue">
                        <el-radio-button value="all" label="全部" />
                        <el-radio-button value="active" label="激活" />
                        <el-radio-button value="inactive" label="未激活" />
                    </el-radio-group>
                </action-bar>
            </div>
        </div>

        <div class="demo-section">
            <h3>right 对齐</h3>
            <p class="demo-desc">align="right" 时，按钮面板右对齐，默认插槽内容在按钮面板前面展示</p>
            <div class="demo-block">
                <action-bar :buttons="buttons" align="right">
                    <el-input v-model="searchValue" placeholder="搜索" style="width: 200px" clearable />
                </action-bar>
            </div>
        </div>

        <div class="demo-section">
            <h3>空按钮列表</h3>
            <p class="demo-desc">buttons 为空数组时，只显示默认插槽内容，不渲染按钮面板</p>
            <div class="demo-block">
                <action-bar :buttons="[]" align="left">
                    <span style="font-size: 14px; color: #909399">仅插槽内容，无按钮</span>
                </action-bar>
            </div>
        </div>

        <div class="demo-section">
            <h3>handleCode 标识</h3>
            <p class="demo-desc">每个按钮可通过 handleCode 设置唯一标识，便于在 changeButtons 方法中精准定位与操作按钮</p>
            <div class="demo-block">
                <action-bar :buttons="codeButtons"></action-bar>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { type ActionButton, ActionBar } from "@yujinjin/cms-components-main/index";

const tabValue = ref("all");
const searchValue = ref("");

const buttons: ActionButton[] = [{ contents: "新增", type: "primary" }, { contents: "批量删除" }];

const codeButtons: ActionButton[] = [
    { contents: "新增", type: "primary", handleCode: "BTN_ADD" },
    { contents: "编辑", handleCode: "BTN_EDIT" },
    { contents: "删除", handleCode: "BTN_DELETE" },
    { contents: "导出", handleCode: "BTN_EXPORT" }
];
</script>
