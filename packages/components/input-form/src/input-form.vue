<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2025-01-02 18:01:10
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-21 17:31:12
 * @项目的路径: \CMS-components\packages\components\input-form\src\input-form.vue
 * @描述: 输入表单
-->
<template>
    <div v-loading="isLoading" class="cms-input-form">
        <el-form v-bind="formProps" ref="inputFormRef" :model="inputFormValue" v-on="events || {}">
            <el-row>
                <template v-for="(field, index) in formFields" :key="(field.name || '') + '_' + index">
                    <el-col v-if="field.isShow !== false" :key="index" :span="field.span">
                        <el-form-item v-bind="field.formItemProps">
                            <input-field v-bind="field" :model-value="getObjectProperty(inputFormValue, field.name)" @update:model-value="value => setFieldValue(value, field)">
                                <!-- 自定义插件，插槽 -->
                                <slot
                                    v-if="field.slot"
                                    :name="field.slot"
                                    :field="field"
                                    :value="getObjectProperty(inputFormValue, field.name)"
                                    :form-value="inputFormValue"
                                    :form-fields="formFields"
                                ></slot>
                            </input-field>
                        </el-form-item>
                    </el-col>
                </template>
            </el-row>
        </el-form>
    </div>
</template>
<script setup lang="ts">
import { type FormInstance, type FormValidateCallback, ElForm, ElRow, ElCol, ElFormItem } from "element-plus";
import { type Ref, ref, watch } from "vue";
import { setObjectProperty, getObjectProperty, extend } from "@yujinjin/utils";
import { type InputFormField, type InputFormRef, type InputFormSlotScope, inputFormProps, inputFormEmits } from "./input-form";
import { INPUT_FORM_FIELD_DEFAULT_ATTRIBUTES } from "./constants";
import { InputField } from "@yujinjin/cms-components-modules/input-field";

defineOptions({
    name: "InputForm"
});

// 动态插槽：插槽名称由 field.slot 动态决定，无法静态枚举，因此使用 [key: string] 索引签名
defineSlots<{
    [key: string]: (props: InputFormSlotScope) => any;
}>();

const props = defineProps(inputFormProps);

const emits = defineEmits(inputFormEmits);

// 表单属性
const formProps = ref({});

// form ref
const inputFormRef = ref<FormInstance>();

// 表单数据
const inputFormValue: Ref<Record<string, any>> = ref({});

// 表单字段列表
const formFields: Ref<InputFormField[]> = ref([]);

// 初始化表单数据
const initInputFormValue = function () {
    // 外部 value 只作为初始/同步来源，内部编辑始终落到 inputFormValue，避免直接改写调用方对象。
    inputFormValue.value = extend(true, {}, props.value);
    formFields.value.forEach(field => {
        if (!field.name) {
            console.warn("字段没有属性name值", field);
            return;
        }
        // 设置field 的value值
        let fieldValue = getObjectProperty(inputFormValue.value, field.name);
        if (fieldValue === undefined) {
            if (Object.prototype.hasOwnProperty.call(field, "value")) {
                // 字段配置上的 value 优先于类型默认值，用于声明单个字段的初始值。
                fieldValue = field.value;
            } else {
                // 根据字段类型提供合理的默认值，避免 switch 期望 boolean、inputNumber 期望 number 等类型不匹配问题
                const typeDefaultValues: Record<string, any> = {
                    switch: false,
                    slider: 0,
                    checkbox: []
                };
                fieldValue = typeDefaultValues[field.type || "input"] ?? null;
            }
            setObjectProperty(inputFormValue.value, field.name, fieldValue);
        }
    });
};

// 生成表单字段列表
const generateFormFields = function () {
    formFields.value = [];
    if (!props.fields || props.fields.length === 0) {
        return;
    }
    const style = { width: "400px" };
    if (props.columns === 2) {
        // 两列表单默认收窄输入框，减少一行内控件挤压。
        style.width = "220px";
    }
    props.fields.forEach(field => {
        if (!field.name) {
            console.warn("字段没有属性name值", field);
            return;
        }
        const newField: InputFormField = extend(true, { isShow: true, type: "input" }, field) as InputFormField;
        if (!newField.span) {
            newField.span = 24 / props.columns;
        }
        if (!newField.formItemProps) {
            newField.formItemProps = {};
        }
        if (!newField.props) {
            newField.props = {};
        }
        // 此时 newField.props 已确保非空，但 TS 无法跨赋值收窄类型，使用局部变量断言
        let fieldProps = newField.props!;
        if (newField.type && INPUT_FORM_FIELD_DEFAULT_ATTRIBUTES[newField.type]) {
            if (newField.type === "datePicker") {
                // 日期选择器按具体 picker 类型选择默认属性，例如 date、daterange、datetime。
                fieldProps = Object.assign({}, INPUT_FORM_FIELD_DEFAULT_ATTRIBUTES[newField.type][fieldProps.type || "date"], fieldProps);
            } else {
                if (!fieldProps.placeholder) {
                    fieldProps.placeholder = (INPUT_FORM_FIELD_DEFAULT_ATTRIBUTES[newField.type].placeholder || "") + (newField.label || "");
                }
                fieldProps = Object.assign({}, INPUT_FORM_FIELD_DEFAULT_ATTRIBUTES[newField.type], fieldProps);
            }
            newField.props = fieldProps;
        }
        if (newField.inputWidth) {
            // 单字段宽度优先级最高，保留调用方已有 style 的其他属性。
            fieldProps.style = typeof fieldProps.style === "object" && fieldProps.style !== null ? fieldProps.style : {};
            fieldProps.style.width = newField.inputWidth + "px";
        } else {
            fieldProps.style = Object.assign({}, style, typeof fieldProps.style === "object" && fieldProps.style !== null ? fieldProps.style : {});
        }
        if (newField.label) {
            newField.formItemProps.label = newField.label;
        }
        if (newField.labelWidth) {
            newField.formItemProps.labelWidth = newField.labelWidth;
        }
        if (!newField.formItemProps.prop) {
            newField.formItemProps.prop = newField.name;
        }
        if (newField.rules) {
            newField.formItemProps.rules = newField.rules;
        }
        formFields.value.push(newField);
    });
    initInputFormValue();
};

// 设置字段的值
const setFieldValue = function (fieldValue: any, field: InputFormField) {
    if (field.type === "input" && field.trim === true && typeof fieldValue === "string") {
        // 只对 input 字符串开启 trim，避免 checkbox、switch 等值类型被误处理。
        fieldValue = fieldValue.trim();
    }
    setObjectProperty(inputFormValue.value, field.name, fieldValue);
    emits("fieldValueChange", field, fieldValue, formFields.value, inputFormValue.value);
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

// 注意：此处不使用 immediate: true，因为 fields 的 watch 已经通过 generateFormFields -> initInputFormValue 初始化了表单值。
// 仅当外部 value 在组件已挂载后发生变化时，才需要重新初始化表单值。
watch(
    () => props.value,
    () => {
        initInputFormValue();
    },
    {
        deep: true
    }
);

watch(
    () => props.props,
    value => {
        formProps.value = Object.assign(
            {
                labelWidth: 120,
                labelSuffix: "："
            },
            value
        );
    },
    {
        immediate: true,
        deep: true
    }
);

defineExpose<InputFormRef>({
    // 获取表单的value
    getInputValue: function () {
        try {
            return JSON.parse(JSON.stringify(inputFormValue.value));
        } catch (error) {
            // JSON.stringify 无法处理循环引用等特殊情况，回退到 extend 深拷贝
            return extend(true, {}, inputFormValue.value);
        }
    },
    /**
     * 设置表单的属性值
     * @param propertyName 属性名
     * @param value 属性值
     */
    setInputPropertyValue: function (propertyName: string, value: any) {
        const findField = formFields.value.find(field => field.name === propertyName);
        if (findField) {
            setFieldValue(value, findField);
        } else {
            setObjectProperty(inputFormValue.value, propertyName, value);
        }
    },
    // 修改当前form字段的属性
    changeFormFields: function (callback: (formFields: InputFormField[]) => void) {
        if (callback && typeof callback === "function") {
            callback(formFields.value);
        } else {
            console.warn("callback 必须是一个函数");
        }
    },
    // 获取form Ref（组件未挂载时返回 null）
    getFormRef: function () {
        if (!inputFormRef.value) {
            console.warn("getFormRef: 表单组件尚未挂载，无法获取 ref");
            return null;
        }
        return inputFormRef.value;
    },
    // 表单验证（组件未挂载时会 reject）
    validate(callback?: FormValidateCallback) {
        if (!inputFormRef.value) {
            console.warn("validate: 表单组件尚未挂载，无法执行验证");
            return Promise.reject(new Error("表单组件尚未挂载，无法执行验证"));
        }
        return inputFormRef.value.validate(callback);
    }
});
</script>
