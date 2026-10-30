<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2024-12-20 10:29:22
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-21 17:30:02
 * @项目的路径: \CMS-components\packages\components\input-field\src\input-field.vue
 * @描述: 表单输入字段组件
-->
<template>
    <!-- 自定义插件，插槽 -->
    <slot v-if="slot"></slot>

    <!-- 标签内容 -->
    <div v-else-if="type === 'label'" class="cms-input-field_label-contents">{{ modelValue }}</div>

    <!-- input -->
    <el-input v-else-if="type === 'input'" v-bind="allProps" :model-value="modelValue" @update:model-value="changeValue" v-on="events" />

    <!-- 图片上传 -->
    <img-upload v-else-if="type === 'imgUpload'" v-bind="allProps" :model-value="modelValue" :upload-request="allProps?.uploadRequest" @update:model-value="changeValue" />

    <!-- 富文本框 -->
    <web-editor v-else-if="type === 'webEditor'" v-bind="allProps" :model-value="modelValue" @update:model-value="changeValue" />

    <!-- select -->
    <el-select v-else-if="type === 'select'" v-bind="allProps" :model-value="modelValue" @update:model-value="changeValue" v-on="events">
        <el-option v-for="(item, index) in data" :key="(item[optionValueKey] || '') + '_' + index" :label="item[optionLabelKey]" :value="item[optionValueKey]" :disabled="item.disabled === true" />
    </el-select>

    <!-- check-select -->
    <check-select
        v-else-if="type === 'checkSelect'"
        v-bind="allProps"
        :model-value="modelValue"
        :data="data"
        :option-value-key="optionValueKey"
        :option-label-key="optionLabelKey"
        @update:model-value="changeValue"
        v-on="events"
    />

    <!-- checkbox -->
    <el-checkbox-group v-else-if="type === 'checkbox'" v-bind="allProps" :model-value="modelValue" @update:model-value="changeValue" v-on="events">
        <el-checkbox v-for="(item, index) in data" :key="(item[optionValueKey] || '') + '_' + index" :value="item[optionValueKey]" :disabled="item.disabled === true">
            {{ item[optionLabelKey] }}
        </el-checkbox>
    </el-checkbox-group>

    <!-- radio -->
    <el-radio-group v-else-if="type === 'radio'" v-bind="allProps" :model-value="modelValue" @update:model-value="changeValue" v-on="events">
        <el-radio v-for="(item, index) in data" :key="(item[optionValueKey] || '') + '_' + index" :value="item[optionValueKey]" :disabled="item.disabled === true">
            {{ item[optionLabelKey] }}
        </el-radio>
    </el-radio-group>

    <!-- element 组件 -->
    <component :is="getElComponentName(type)" v-else-if="!!type" v-bind="allProps" :model-value="modelValue" @update:model-value="changeValue" v-on="events" />
</template>
<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { ElSelect, ElOption, ElCheckboxGroup, ElCheckbox, ElRadioGroup, ElRadio, ElInput } from "element-plus";
import { inputFieldProps, inputFieldEmits } from "./input-field";
import { ImgUpload } from "@yujinjin/cms-components-modules/img-upload";
import { CheckSelect } from "@yujinjin/cms-components-modules/check-select";
import { WebEditor } from "@yujinjin/cms-components-modules/web-editor";

defineOptions({
    name: "InputField",
    inheritAttrs: false
});

// 定义插槽
defineSlots<{
    default(): any;
}>();

const props = defineProps(inputFieldProps);

const attrs = useAttrs();

const emits = defineEmits(inputFieldEmits);

// 多分支模板关闭自动 attrs 继承，统一在实际控件上绑定；显式 props 覆盖同名 attrs。
const allProps = computed(() => {
    return {
        ...attrs,
        ...(props.props || {})
    };
});

// 按命名约定分发给已注册的控件，如 datePicker → el-date-picker；新增控件无需维护映射表。
const getElComponentName = function (type: string): string {
    if (!type) {
        return "";
    }
    return "el-" + type.replace(/([A-Z])/g, "-$1").toLowerCase();
};

// 字段层只同步值；裁剪上传、富文本及表单规则分别由对应控件和上层表单负责。
const changeValue = function (value: any) {
    emits("update:modelValue", value);
};
</script>
