<!--
 * @创建者: yujinjin-jk
 * @创建时间: 2026-06-11
 * @描述: web-editor 组件 - 表单禁用联动示例
-->
<template>
    <div class="example-page">
        <div class="demo-section">
            <h3>表单禁用联动</h3>
            <p class="demo-desc">web-editor 处于 el-form 中时，表单的 disabled 属性会自动联动到编辑器的只读状态</p>
            <div class="demo-block">
                <el-switch v-model="formDisabled" active-text="表单禁用" inactive-text="表单启用" style="margin-bottom: 12px" />
                <el-form :disabled="formDisabled">
                    <el-form-item label="标题">
                        <el-input v-model="title" placeholder="请输入标题" />
                    </el-form-item>
                    <el-form-item label="内容">
                        <web-editor v-model="content" />
                    </el-form-item>
                </el-form>
            </div>
            <div class="value-display">编辑器内容：{{ content }}</div>
        </div>

        <div class="demo-section">
            <h3>单独 disabled 控制</h3>
            <p class="demo-desc">web-editor 的 disabled prop 可独立控制，优先级高于表单 disabled（disabled=false 可在禁用表单中强制启用）</p>
            <div class="demo-block">
                <el-switch v-model="editorDisabled" active-text="编辑器禁用" inactive-text="编辑器启用" style="margin-bottom: 12px" />
                <el-form :disabled="true">
                    <el-form-item label="标题">
                        <el-input v-model="title2" placeholder="此输入框被表单禁用" />
                    </el-form-item>
                    <el-form-item label="内容（disabled=false 强制启用）">
                        <web-editor v-model="content2" :disabled="false" />
                    </el-form-item>
                    <el-form-item label="内容（disabled=true 强制禁用）">
                        <web-editor v-model="content3" :disabled="true" />
                    </el-form-item>
                    <el-form-item label="内容（默认，跟随表单禁用）">
                        <web-editor v-model="content4" />
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { WebEditor } from "@yujinjin/cms-components-main/index";

const formDisabled = ref(true);
const editorDisabled = ref(true);

const title = ref("");
const content = ref("<p>表单联动内容</p>");

const title2 = ref("");
const content2 = ref("<p>强制启用的编辑器</p>");
const content3 = ref("<p>强制禁用的编辑器</p>");
const content4 = ref("<p>跟随表单状态的编辑器</p>");
</script>
