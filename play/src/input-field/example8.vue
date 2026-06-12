<!--
 * @创建者: yujinjin-jk
 * @创建时间: 2026-06-11
 * @描述: input-field 组件 - 自定义插槽示例
-->
<template>
    <div class="example-page">
        <h3>slot prop 自定义插槽</h3>
        <p class="demo-desc">通过 slot 属性指定插槽名称，启用自定义内容渲染。slot 可以是字符串（插槽名）或 true（使用默认插槽）</p>

        <div class="demo-block">
            <span class="field-label">slot="customInput"：</span>
            <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
            <input-field slot="customInput" v-model="customValue">
                <template #customInput>
                    <el-input v-model="customValue" placeholder="自定义输入框内容">
                        <template #prefix>
                            <el-icon><Search /></el-icon>
                        </template>
                    </el-input>
                </template>
            </input-field>
        </div>

        <div class="demo-block">
            <span class="field-label">slot=true（默认插槽）：</span>
            <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
            <input-field :slot="true" v-model="rangeValue">
                <el-slider v-model="rangeValue" :min="0" :max="100" show-input />
            </input-field>
        </div>

        <div class="demo-block">
            <span class="field-label">slot="tagGroup"：</span>
            <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
            <input-field slot="tagGroup" v-model="tagValue">
                <template #tagGroup>
                    <el-tag v-for="tag in tags" :key="tag" closable style="margin-right: 6px" @close="removeTag(tag)">{{ tag }}</el-tag>
                    <el-input v-if="inputVisible" ref="inputRef" v-model="inputValue" size="small" style="width: 100px" @keyup.enter="handleInputConfirm" @blur="handleInputConfirm" />
                    <el-button v-else size="small" @click="showInput">+ 添加标签</el-button>
                </template>
            </input-field>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, nextTick } from "vue";
import { InputField } from "@yujinjin/cms-components-main/index";
import { Search } from "@element-plus/icons-vue";

const customValue = ref("");
const rangeValue = ref(50);

const tagValue = ref("");
const tags = ref(["标签1", "标签2", "标签3"]);
const inputVisible = ref(false);
const inputValue = ref("");
const inputRef = ref();

const removeTag = (tag: string) => {
    tags.value = tags.value.filter(t => t !== tag);
};

const showInput = () => {
    inputVisible.value = true;
    nextTick(() => {
        inputRef.value?.focus();
    });
};

const handleInputConfirm = () => {
    if (inputValue.value) {
        tags.value.push(inputValue.value);
    }
    inputVisible.value = false;
    inputValue.value = "";
};
</script>
<style lang="scss" scoped>
.demo-block {
    display: flex;
    align-items: center;
    gap: 12px;

    .field-label {
        min-width: 120px;
        font-size: 14px;
        color: #606266;
    }
}
</style>
