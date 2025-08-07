<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2024-10-25 11:03:53
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2024-11-05 10:41:58
 * @项目的路径: \CMS-components\packages\components\check-select\src\check-select.vue
 * @描述: 下拉选项带复选框的选项
-->
<template>
    <el-select ref="checkSelectRef" v-model="modelValue" v-bind="selectProps || {}" @change="value => emits('change', value)" v-on="events || {}">
        <el-option v-if="isShowCheckAll" :created="true" value="" label="">
            <div class="cms-check-select_option-inner" @click.stop.prevent="checkAllChangeHandle">
                <el-checkbox :model-value="checkAllStatus.isCheckAll" :indeterminate="checkAllStatus.isIndeterminate" />
                <span>全选</span>
            </div>
        </el-option>
        <el-option
            v-for="(item, index) in selectDataList"
            :key="(item[selectProps.valueKey || optionValueKey || 'value'] || '') + '_' + index"
            :label="item[optionLabelKey || 'label']"
            :value="item[optionValueKey || 'value']"
            :disabled="item.disabled === true"
        >
            <div class="cms-check-select_option-inner">
                <el-checkbox
                    :model-value="modelValue && modelValue.includes(item[optionValueKey || 'value'])"
                    :disabled="item.disabled === true"
                    @change="isCheck => checkChangeHandle(isCheck, item[optionValueKey || 'value'])"
                />
                <span>{{ item[optionLabelKey || "label"] }}</span>
            </div>
        </el-option>
    </el-select>
</template>
<script setup lang="ts">
import { ElSelect, ElOption, ElCheckbox } from "element-plus";
import { type PropType, type ComputedRef, ref, computed, nextTick } from "vue";
import { checkSelectProps, checkSelectEmits } from "./check-select";

defineOptions({
    name: "CheckSelect"
});

const props = defineProps(checkSelectProps);

const emits = defineEmits(checkSelectEmits);

const modelValue = defineModel({ type: Array as PropType<Array<object | string | number>> });

// select 实例
const checkSelectRef = ref<InstanceType<typeof ElSelect>>();

const selectDataList: ComputedRef<Array<Record<string, any>>> = computed(() => {
    if (!props.data || props.data.length === 0) {
        return [];
    }
    if (typeof props.data[0] === "string" || typeof props.data[0] === "number") {
        return props.data.map(item => ({ label: item, value: item }));
    }
    return props.data as Array<Record<string, any>>;
});

const selectProps = computed(() => {
    return Object.assign(
        {
            collapseTags: true,
            collapseTagsTooltip: true,
            filterable: true
        },
        props.props || {},
        { multiple: true }
    );
});

const isShowCheckAll = computed(() => {
    if (selectDataList.value.length === 0 || !checkSelectRef.value) {
        return false;
    }
    let isShow = false;
    checkSelectRef.value!.states.options.forEach(item => {
        if (item.isDisabled !== true && item.visible && !item.created) {
            isShow = true;
        }
    });
    return isShow;
});

// 初始化全选状态
const checkAllStatus = computed(() => {
    const status = {
        isCheckAll: false,
        isIndeterminate: false
    };
    if (!isShowCheckAll.value || !modelValue.value || modelValue.value.length === 0 || !checkSelectRef.value?.states) {
        return status;
    }
    checkSelectRef.value.states.options.forEach(item => {
        if (!item.visible || item.created || (!status.isCheckAll && status.isIndeterminate)) {
            return;
        }
        if (item.itemSelected) {
            status.isCheckAll = true;
        } else if (status.isCheckAll) {
            status.isIndeterminate = true;
            status.isCheckAll = false;
        }
    });
    return status;
});

const checkAllChangeHandle = async function () {
    await nextTick();
    const values = modelValue.value || [];
    checkSelectRef.value?.states.options.forEach(item => {
        if (!item.visible || item.created) {
            return;
        }
        const findIndex = values.indexOf(item.value as string | number | object);
        if (checkAllStatus.value.isCheckAll && findIndex !== -1) {
            values.splice(findIndex, 1);
        } else if (!checkAllStatus.value.isCheckAll && findIndex === -1) {
            values.push(item.value as string | number | object);
        }
    });
    modelValue.value = values;
    emits("change", values);
};

const checkChangeHandle = function (isCheck, value) {
    const values = modelValue.value || [];
    if (isCheck) {
        values.splice(
            values.findIndex(item => item === value),
            1
        );
    } else {
        values.push(value);
    }
    modelValue.value = values;
    emits("change", values);
};
</script>
