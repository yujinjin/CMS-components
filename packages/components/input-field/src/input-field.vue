<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2024-12-20 10:29:22
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-06 15:11:38
 * @项目的路径: \CMS-components\packages\components\input-field\src\input-field.vue
 * @描述: 表单输入字段组件
-->
<template>
    <!-- 自定义插件，插槽 -->
    <slot v-if="slot"></slot>

    <!-- 标签内容 -->
    <div v-else-if="type === 'label'" class="label-contents">{{ modelValue }}</div>

    <!-- 图片上传 -->
    <img-upload v-else-if="type === 'imgUpload'" :model-value="modelValue" v-bind="props" :upload-request="props!.uploadRequest" @update:model-value="value => changeValue(value)" />

    <!-- 富文本框 -->
    <web-editor v-else-if="type === 'webEditor'" :model-value="modelValue" v-bind="props" @update:model-value="value => changeValue(value)" />

    <!-- select -->
    <el-select v-else-if="type === 'select'" :model-value="modelValue" v-bind="props" @update:model-value="value => changeValue(value)" v-on="events">
        <el-option v-for="(item, index) in data" :key="(item[optionValueKey] || '') + '_' + index" :label="item[optionLabelKey]" :value="item[optionValueKey]" :disabled="item.disabled === true" />
    </el-select>

    <!-- check-select -->
    <check-select v-else-if="type === 'checkSelect'" :model-value="modelValue" v-bind="props" :data="data" @update:model-value="changeValue" v-on="events" />

    <!-- checkbox -->
    <el-checkbox-group v-else-if="type === 'checkbox'" :model-value="modelValue" v-bind="props" @update:model-value="value => changeValue(value)" v-on="events">
        <el-checkbox v-for="(item, index) in data" :key="(item[optionValueKey] || '') + '_' + index" :value="item[optionValueKey]" :disabled="item.disabled === true">
            {{ item[optionLabelKey] }}
        </el-checkbox>
    </el-checkbox-group>

    <!-- radio -->
    <el-radio-group v-else-if="type === 'radio'" :model-value="modelValue" v-bind="props" @update:model-value="value => changeValue(value)" v-on="events">
        <el-radio v-for="(item, index) in data" :key="(item[optionValueKey] || '') + '_' + index" :value="item[optionValueKey]" :disabled="item.disabled === true">
            {{ item[optionLabelKey] }}
        </el-radio>
    </el-radio-group>

    <!-- element 组件 -->
    <component :is="getElComponentName(type)" v-else-if="!!type" :model-value="modelValue" v-bind="props" @update:model-value="value => changeValue(value)" v-on="events" />
</template>
<script setup lang="ts">
import { ElSelect, ElOption, ElCheckboxGroup, ElCheckbox, ElRadioGroup, ElRadio } from "element-plus";
import { inputFieldProps, inputFieldEmits } from "./input-field";
import { ImgUpload } from "@yujinjin/cms-components-modules/img-upload";
import { CheckSelect } from "@yujinjin/cms-components-modules/check-select";
import { WebEditor } from "@yujinjin/cms-components-modules/web-editor";

defineOptions({
    name: "InputField",
    inheritAttrs: false
});

defineProps(inputFieldProps);

const emits = defineEmits(inputFieldEmits);

// 获取elment 组件名称
const getElComponentName = function (type) {
    return "el-" + type?.replace(/([A-Z])/g, "-$1").toLowerCase();
};

const changeValue = function (value) {
    emits("update:modelValue", value);
};
</script>
<style lang="scss" scoped>
.label-contents {
    font-weight: 500;
    color: #121736;
}
</style>
