<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2024-12-26 21:29:56
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-16 21:03:42
 * @项目的路径: \CMS-components\packages\components\search-field\src\search-field.vue
 * @描述: 表单输入字段组件
-->
<template>
    <!-- 自定义插件，插槽 -->
    <slot v-if="slot"></slot>

    <!-- input -->
    <el-input v-else-if="type === 'input'" :model-value="modelValue" v-bind="allProps" @update:model-value="value => changeValue(value?.trim())" v-on="events" />

    <!-- input-number -->
    <el-input-number v-else-if="type === 'inputNumber'" :model-value="modelValue" v-bind="allProps" @update:model-value="changeValue" v-on="events" />

    <!-- select -->
    <el-select v-else-if="type === 'select'" :model-value="modelValue" v-bind="allProps" @update:model-value="changeValue" v-on="events">
        <el-option v-for="(item, index) in data" :key="(item[optionValueKey] || '') + '_' + index" :label="item[optionLabelKey]" :value="item[optionValueKey]" :disabled="item.disabled === true" />
    </el-select>

    <!-- checkbox-select -->
    <check-select v-else-if="type === 'checkSelect'" :model-value="modelValue" :data="data" v-bind="allProps" @update:model-value="changeValue" v-on="events" />

    <!-- date-picker -->
    <el-date-picker v-else-if="type === 'datePicker'" :model-value="modelValue" v-bind="allProps" @update:model-value="changeValue" v-on="events" />
</template>
<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { ElInput, ElInputNumber, ElSelect, ElOption, ElDatePicker } from "element-plus";
import { searchFieldProps, searchFieldEmits } from "./search-field";
import { CheckSelect } from "@yujinjin/cms-components-modules/check-select";

defineOptions({
    name: "SearchField",
    inheritAttrs: false
});

// 定义插槽
defineSlots<{
    default(): any;
}>();

const props = defineProps(searchFieldProps);

const attrs = useAttrs();

const emits = defineEmits(searchFieldEmits);

const allProps = computed(() => {
    return {
        ...attrs,
        ...(props.props || {})
    };
});

const changeValue = function (value) {
    emits("update:modelValue", value);
    emits("change", value);
};
</script>
