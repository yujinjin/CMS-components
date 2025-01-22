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
        <el-form v-bind="formProps" ref="inputFormRef" :model="inputFormValue">
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

// 输入字段列表（由于formField和inputField属性并不完全一致，使用"v-bind=formField" vue 会提示警告“Extraneous non-props attributes”）
// const getInputFieldProps = function (field: InputFormField) {
//     const props = {};
//     Object.keys(inputFieldProps).forEach(key => {
//         if (Object.prototype.hasOwnProperty.call(field, key)) {
//             props[key] = field[key];
//         }
//     });
//     return props;
// };

// 初始化表单数据
const initInputFormValue = function () {
    inputFormValue.value = extend(true, {}, props.value);
    formFields.value.forEach(field => {
        if (!field.name) {
            console.error("字段没有属性name值", field);
            return;
        }
        // 设置field 的value值
        let fieldValue = getObjectProperty(inputFormValue.value, field.name);
        if (fieldValue === undefined) {
            fieldValue = Object.prototype.hasOwnProperty.call(field, "value") ? field.value : null;
            setObjectProperty(inputFormValue.value, field.name, fieldValue);
            // emits("fieldValueChange", field, fieldValue, formFields.value, inputFormValue.value);
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
        style.width = "220px";
    }
    props.fields.forEach(field => {
        if (!field.name) {
            console.error("字段没有属性name值", field);
            return;
        }
        const newField: InputFormField = extend(true, { isShow: true, type: "input" }, field);
        if (!newField.span) {
            newField.span = 24 / props.columns;
        }
        if (!newField.formItemProps) {
            newField.formItemProps = {};
        }
        if (!newField.props) {
            newField.props = {};
        }
        if (newField.type && INPUT_FORM_FIELD_DEFAULT_ATTRIBUTES[newField.type]) {
            if (newField.type === "datePicker") {
                newField.props = Object.assign({}, INPUT_FORM_FIELD_DEFAULT_ATTRIBUTES[newField.type][newField.props.type || "date"], newField.props);
            } else {
                if (!newField.props.placeholder) {
                    newField.props.placeholder = (INPUT_FORM_FIELD_DEFAULT_ATTRIBUTES[newField.type].placeholder || "") + (newField.label || "");
                }
                newField.props = Object.assign({}, INPUT_FORM_FIELD_DEFAULT_ATTRIBUTES[newField.type], newField.props);
            }
        }
        if (newField.inputWidth) {
            newField.props!.style = newField.props!.style || {};
            newField.props!.style.width = newField.inputWidth + "px";
        } else {
            newField.props!.style = Object.assign({}, style, newField.props!.style);
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
const setFieldValue = function (fieldValue, field: InputFormField) {
    if (field.type === "input" && field.trim === true && fieldValue) {
        // 注意：当trim为true用户手动输入的内容无法空格，除非通过粘贴方式或回过头来在内容中间空格
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
        return JSON.parse(JSON.stringify(inputFormValue.value));
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
            console.error("callback 必须是一个函数");
        }
    },
    // 获取form Ref
    getFormRef: function () {
        return inputFormRef.value!;
    },
    // 表单验证
    validate(callback?: FormValidateCallback) {
        return inputFormRef.value!.validate(callback);
    }
});
</script>
