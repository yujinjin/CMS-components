<!--
 * @创建者: yujinjin9@126.com
 * @描述: 下拉选项带复选框的选项
-->
<template>
    <el-select ref="checkSelectRef" v-model="modelValue" v-bind="selectProps || {}" @change="value => emits('change', value)" v-on="wrappedEvents">
        <el-option v-if="isShowCheckAll" :created="true" value="" label="">
            <div class="cms-check-select_option-inner" @click.stop.prevent="checkAllChangeHandle">
                <el-checkbox :model-value="checkAllStatus.isCheckAll" :indeterminate="checkAllStatus.isIndeterminate" :disabled="checkAllStatus.isDisabled" />
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
                    :disabled="isCheckboxDisabled(item)"
                    @click.stop
                    @change="isCheck => checkChangeHandle(isCheck, item[optionValueKey || 'value'])"
                />
                <span>{{ item[optionLabelKey || "label"] }}</span>
            </div>
        </el-option>
    </el-select>
</template>
<script setup lang="ts">
import { ElSelect, ElOption, ElCheckbox, type CheckboxValueType } from "element-plus";
import { type PropType, type ComputedRef, ref, computed, nextTick } from "vue";
import { checkSelectProps, checkSelectEmits } from "./check-select";

defineOptions({
    name: "CheckSelect"
});

const props = defineProps(checkSelectProps);

const emits = defineEmits(checkSelectEmits);

const modelValue = defineModel({ type: Array as PropType<Array<object | string | number>> });

// el-select 实例引用
const checkSelectRef = ref<InstanceType<typeof ElSelect>>();

// 当前搜索过滤词
const filterQuery = ref("");

const selectDataList: ComputedRef<Array<Record<string, any>>> = computed(() => {
    if (!props.data || props.data.length === 0) {
        return [];
    }
    if (typeof props.data[0] === "string" || typeof props.data[0] === "number") {
        return props.data.map(item => ({ label: item, value: item }));
    }
    return props.data as Array<Record<string, any>>;
});

// 当前可选选项值列表（排除禁用选项 + 搜索过滤）
const selectableOptionValues: ComputedRef<Array<object | string | number>> = computed(() => {
    const valueKey = props.optionValueKey || "value";
    const labelKey = props.optionLabelKey || "label";
    return selectDataList.value
        .filter(item => {
            // 排除禁用选项
            if (item.disabled === true) return false;
            // 搜索过滤：仅当有 filterQuery 时进行匹配
            if (filterQuery.value) {
                const label = String(item[labelKey]);
                return label.toLowerCase().includes(filterQuery.value.toLowerCase());
            }
            return true;
        })
        .map(item => item[valueKey]);
});

const selectProps = computed(() => {
    const userProps = props.props || {};
    const merged = Object.assign(
        {
            collapseTags: true,
            collapseTagsTooltip: true,
            filterable: true
        },
        userProps,
        { multiple: true }
    );
    // 注入 filterMethod：追踪 filterQuery + 保持 el-option 的内部 visible 过滤
    // 当设置了自定义 filterMethod 时，el-select 内部的 updateOptions 不会调用
    // 每个 el-option 的 updateOption，导致搜索过滤失效。因此需要在注入的
    // filterMethod 中手动触发 el-option 的 updateOption
    if (merged.filterable) {
        const originalFilterMethod = typeof userProps.filterMethod === "function" ? userProps.filterMethod : null;
        merged.filterMethod = (query: string) => {
            filterQuery.value = query;
            // 手动触发每个 el-option 的 updateOption，保持搜索过滤可见性
            nextTick(() => {
                if (checkSelectRef.value?.states?.options) {
                    checkSelectRef.value.states.options.forEach(option => {
                        if (typeof option.updateOption === "function") {
                            option.updateOption(query);
                        }
                    });
                }
            });
            // 调用用户原始 filterMethod（如有）
            if (originalFilterMethod) {
                originalFilterMethod(query);
            }
        };
    }
    return merged;
});

// 包装事件：visible-change 关闭时清空 filterQuery
const wrappedEvents = computed(() => {
    const userEvents = props.events || {};
    const result: Record<string, (...args: any[]) => any> = {};
    // 先复制所有用户事件
    for (const key of Object.keys(userEvents)) {
        if (key === "visible-change") {
            // 包装 visible-change
            const userVisibleChange = userEvents[key];
            result[key] = (visible: boolean) => {
                if (!visible) {
                    filterQuery.value = "";
                }
                try {
                    userVisibleChange(visible);
                } catch (e) {
                    console.error("[CheckSelect] visible-change 事件回调异常:", e);
                }
            };
        } else {
            result[key] = userEvents[key];
        }
    }
    // 如果用户没有传 visible-change，添加内部监听
    if (!userEvents["visible-change"]) {
        result["visible-change"] = (visible: boolean) => {
            if (!visible) {
                filterQuery.value = "";
            }
        };
    }
    return result;
});

// 是否显示全选
const isShowCheckAll = computed(() => {
    return selectableOptionValues.value.length > 0;
});

// 全选状态
const checkAllStatus = computed(() => {
    const status = {
        isCheckAll: false,
        isIndeterminate: false,
        isDisabled: false
    };
    const selectableValues = selectableOptionValues.value;
    if (!isShowCheckAll.value || !modelValue.value || modelValue.value.length === 0) {
        // 判断 isDisabled（即使未选中也需要判断，因为有选中后达到限制的场景）
        const multipleLimit = selectProps.value.multipleLimit;
        status.isDisabled = multipleLimit > 0 && (modelValue.value?.length || 0) >= multipleLimit;
        return status;
    }
    // 计算 selectableValues 中已选中的数量
    const currentValues = modelValue.value;
    const selectedSelectableCount = selectableValues.filter(v => currentValues.includes(v)).length;
    status.isCheckAll = selectedSelectableCount === selectableValues.length;
    status.isIndeterminate = selectedSelectableCount > 0 && !status.isCheckAll;
    // 判断 isDisabled
    const multipleLimit = selectProps.value.multipleLimit;
    status.isDisabled = multipleLimit > 0 && currentValues.length >= multipleLimit;
    return status;
});

// 判断选项 checkbox 是否禁用
const isCheckboxDisabled = function (item: Record<string, any>) {
    const valueKey = props.optionValueKey || "value";
    // 选项本身禁用
    if (item.disabled === true) return true;
    const multipleLimit = selectProps.value.multipleLimit;
    // 未选中且已达数量限制
    if (multipleLimit > 0 && modelValue.value && !modelValue.value.includes(item[valueKey]) && modelValue.value.length >= multipleLimit) {
        return true;
    }
    return false;
};

// 全选/取消全选
const checkAllChangeHandle = function () {
    if (checkAllStatus.value.isDisabled) return;
    const selectableValues = selectableOptionValues.value;
    const values = [...(modelValue.value || [])];
    if (checkAllStatus.value.isCheckAll) {
        // 当前全选状态，点击全选则取消所有可选选项的选中（保留禁用选项的选中值）
        for (let i = values.length - 1; i >= 0; i--) {
            if (selectableValues.includes(values[i])) {
                values.splice(i, 1);
            }
        }
    } else {
        // 当前非全选状态，依次添加可选选项中未选中的值，直到达到 multipleLimit
        const multipleLimit = selectProps.value.multipleLimit;
        for (const selectableValue of selectableValues) {
            if (!values.includes(selectableValue)) {
                // 检查数量限制
                if (multipleLimit > 0 && values.length >= multipleLimit) break;
                values.push(selectableValue);
            }
        }
    }
    modelValue.value = values;
    emits("change", values);
};

// 单个选项勾选/取消勾选
const checkChangeHandle = function (isCheck: CheckboxValueType, value: object | string | number) {
    const values = [...(modelValue.value || [])];
    if (isCheck) {
        // 勾选时检查数量限制，条件与 el-select handleOptionSelect 一致
        const multipleLimit = selectProps.value.multipleLimit;
        if (multipleLimit > 0 && values.length >= multipleLimit) return;
        if (!values.includes(value)) {
            values.push(value);
        }
    } else {
        // 取消勾选时移除值
        const findIndex = values.findIndex(item => item === value);
        if (findIndex !== -1) {
            values.splice(findIndex, 1);
        }
    }
    modelValue.value = values;
    emits("change", values);
};
</script>
