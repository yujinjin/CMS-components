<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2025-01-06 19:28:46
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-21 10:47:02
 * @项目的路径: \CMS-components\packages\components\search-form\src\search-form.vue
 * @描述: 搜索表单
-->
<template>
    <div class="cms-search-panel" :class="{ collapse: !collapseStatus }" :style="{ paddingRight: collapseStatus ? '' : buttonBoxWidth + 'px' }">
        <template v-for="(field, index) in formFields" :key="(field.name || '') + '_' + index">
            <div v-if="field.isShow !== false" class="field-box">
                <div v-if="field.label" class="label-text" :style="{ width: (field.labelWidth || labelWidth) + 'px' }">{{ field.label }}{{ labelSuffix }}</div>
                <div class="input-box" :style="{ width: (field.inputWidth || inputWidth) + 'px' }">
                    <search-field v-model="field.value" v-bind="field" @change="changeHandle(field)">
                        <template v-if="field.slot">
                            <slot :name="field.slot" :field="field" :form-fields="formFields"></slot>
                        </template>
                    </search-field>
                </div>
            </div>
        </template>
        <!-- 占位 -->
        <div v-show="isShowCollapse && collapseStatus" class="placeholder-button-box" :style="{ width: buttonBoxWidth + 'px' }"></div>
        <div ref="buttonBoxRef" class="button-box">
            <el-button v-for="(button, index) in extendButtons" :key="(button.handleCode || '') + '_' + index" v-bind="button" @click="extendButtonClickHandle(button)">
                {{ button.contents }}
            </el-button>
            <el-button v-if="isShowSearchButton" :loading="isSearchLoading" type="primary" @click="searchHandle">查询</el-button>
            <el-button v-if="isShowResetButton" @click="resetHandle">重置</el-button>
            <el-button v-if="isShowCollapse" type="primary" link @click="collapseStatus = !collapseStatus">{{ collapseStatus ? "收起" : "展开" }}</el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { type Ref, onMounted, ref, markRaw, watch, nextTick } from "vue";
import { ElButton } from "element-plus";
import { setObjectProperty, extend, dateFormat } from "@yujinjin/utils";
import { type SearchFormButton, type SearchFormField, type SearchFormRef, type SearchFormSlotScope, searchFormProps, searchFormEmits } from "./search-form";
import { SEARCH_FORM_FIELD_DEFAULT_ATTRIBUTES } from "./constants";
import { SearchField } from "@yujinjin/cms-components-modules/search-field";

defineOptions({
    name: "SearchForm"
});

defineSlots<{
    [key: string]: (props: SearchFormSlotScope) => any;
}>();

const props = defineProps(searchFormProps);

// fieldsChange: 当前表单字段变化事件; search: 搜索操作; change: 表单字段值变化事件;
// collapseStatusChange: 折叠状态变化事件
const emits = defineEmits(searchFormEmits);

// search 表单字段列表
const formFields: Ref<SearchFormField[]> = ref([]);

// 扩展按钮列表
const extendButtons = ref<SearchFormButton[]>([]);

// 展开状态
const collapseStatus: Ref<boolean> = ref(true);

// 按钮容器ref
const buttonBoxRef: Ref<HTMLDivElement | null> = ref(null);

// 操作按钮长度
const buttonBoxWidth: Ref<number> = ref(0);

// 生成表单字段列表
const generateFormFields = function () {
    formFields.value = [];
    if (!props.fields || props.fields.length === 0) {
        return;
    }
    props.fields.forEach(field => {
        if (!field.name) {
            console.error("字段没有属性name值", field);
            return;
        }
        const newField = extend(true, { isShow: true, type: "primary", value: null }, field);
        if (Object.prototype.hasOwnProperty.call(newField, "defaultValue")) {
            newField.value = newField.defaultValue;
        }
        if (newField.type && SEARCH_FORM_FIELD_DEFAULT_ATTRIBUTES[newField.type]) {
            if (!newField.props) {
                newField.props = {};
            }
            if (newField.type === "datePicker") {
                newField.props = Object.assign({}, SEARCH_FORM_FIELD_DEFAULT_ATTRIBUTES[newField.type][newField.props.type || "date"], newField.props);
                if (newField.defaultValue && newField.props.valueFormat) {
                    newField.value = dateFormat(newField.defaultValue, newField.props.valueFormat);
                }
            } else {
                if (!newField.props.placeholder) {
                    newField.props.placeholder = (SEARCH_FORM_FIELD_DEFAULT_ATTRIBUTES[newField.type].placeholder || "") + (newField.label || "");
                }
                newField.props = Object.assign({}, SEARCH_FORM_FIELD_DEFAULT_ATTRIBUTES[newField.type], newField.props);
            }
        }
        formFields.value.push(newField);
    });
    emits("fieldsChange", formFields.value);
};

// 生成扩展按钮列表
const generateExtendButtons = function () {
    extendButtons.value = [];
    if (!props.buttons || props.buttons.length === 0) {
        return [];
    }
    props.buttons.forEach(button => {
        button = Object.assign({ loading: false }, button);
        if (button.icon && typeof button.icon === "object") {
            button.icon = markRaw(button.icon);
        }
        extendButtons.value.push(button);
    });
};

// 触发window resize 事件，通常是为了让datatable最大高度重新计算
const triggerResizeEvent = async function () {
    // let resizeEvent = new Event('resize');
    // resizeEvent.initEvent('resize', true, true)
    await nextTick();
    window.dispatchEvent(new Event("resize"));
};

const init = function () {
    buttonBoxWidth.value = buttonBoxRef.value!.offsetWidth;
};

// 获取当前搜索表单的数据对象
const getSearchFormValue = function () {
    const formValue = {};
    formFields.value.forEach(field => {
        setObjectProperty(formValue, field.name, field.value);
    });
    return formValue;
};

// 搜索操作
const searchHandle = function () {
    emits("search", getSearchFormValue());
};

// 重置操作
const resetHandle = function () {
    props.fields.forEach((field, index) => {
        if (Object.prototype.hasOwnProperty.call(field, "defaultValue")) {
            formFields.value[index].value = formFields.value[index].props?.valueFormat ? dateFormat(field.defaultValue, formFields.value[index].props?.valueFormat) : field.defaultValue;
        } else if (Object.prototype.hasOwnProperty.call(field, "value")) {
            formFields.value[index].value = field.value;
        } else {
            formFields.value[index].value = null;
        }
    });
    searchHandle();
};

// 查询表单数值变化
const changeHandle = function (field) {
    emits("change", field, formFields.value);
};

// 扩展按钮点击事件
const extendButtonClickHandle = async function (button) {
    if (!button.click || button.loading) {
        return;
    }
    button.loading = true;
    try {
        await button.click();
    } catch (error) {
        console.error(error);
    }
    button.loading = false;
};

watch(
    () => props.fields,
    () => {
        generateFormFields();
    },
    {
        immediate: true,
        deep: true
    }
);

watch(
    () => props.buttons,
    () => {
        generateExtendButtons();
    },
    {
        immediate: true,
        deep: true
    }
);

watch(collapseStatus, () => {
    emits("collapseStatusChange", collapseStatus.value);
    triggerResizeEvent();
});

onMounted(async () => {
    await nextTick();
    init();
    triggerResizeEvent();
});

defineExpose<SearchFormRef>({
    // 修改当前form字段的属性
    changeFormFields: function (callback: (formFields: SearchFormField[]) => void) {
        if (callback && typeof callback === "function") {
            callback(formFields.value);
        } else {
            console.error("callback 必须是一个函数");
        }
    },
    // 获取当前搜索表单的数据对象
    getValue: getSearchFormValue
});
</script>
