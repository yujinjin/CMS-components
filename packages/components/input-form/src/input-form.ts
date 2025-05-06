/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2025-01-02 18:01:06
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-02-11 15:32:50
 * @项目的路径: \CMS-components\packages\components\input-form\src\input-form.ts
 * @描述: input-form组件属性、事件声明
 */
import { type PropType, type ExtractPublicPropTypes } from "vue";
import { type FormProps, type FormItemProps, type FormItemRule, type FormInstance, type FormValidateCallback, type FormValidationResult } from "element-plus";
import { buildProps } from "@yujinjin/cms-components-utils";
import { type NotReadonly } from "../../types";
import { type InputFieldProps } from "@yujinjin/cms-components-modules/input-field";

export type InputFormField = InputFieldProps & {
    /** 查询项的名称，同时也是组件的双向绑定值属性 */
    name: string;

    /** 当前数据字段插槽 */
    slot?: string;

    /** 当前内容是否去除空格，只针对input输入框有效。默认false */
    trim?: boolean;

    /**  字段标签 */
    label?: string;

    /** 选项的值 */
    value?: any;

    /** label宽度 */
    labelWidth?: number;

    /** 表单组件的宽度 */
    inputWidth?: number;

    /** 组件所占的列数,默认是24 */
    span?: number;

    /** 是否显示 */
    isShow?: boolean;

    /** 表单验证规则 */
    rules?: FormItemRule | FormItemRule[];

    /** Form Item 属性 */
    formItemProps?: Partial<NotReadonly<FormItemProps>>;
};

export type InputFormSlotScope = {
    /** 当前表单字段 */
    field: InputFormField;

    /** 字段值 */
    value: any;

    /** 表单值 */
    formValue: Record<string, any>;

    /** 所有表单字段列表 */
    formFields: InputFormField[];
};

export const inputFormProps = buildProps({
    fields: {
        type: Array as PropType<InputFormField[]>,
        default() {
            return [];
        },
        required: true
    },
    isLoading: {
        type: Boolean,
        default: false
    },
    // 一行表单数
    columns: {
        type: Number,
        default: 1
    },
    // form表单属性
    props: {
        type: Object as PropType<Partial<NotReadonly<FormProps>>>
    },
    // form表单事件
    events: {
        type: Object as PropType<Record<string, (...args: any[]) => any>>
    },
    // 表单数据默认值
    value: {
        type: Object as PropType<Record<string, any>>,
        default: function () {
            return {};
        }
    }
});

export type InputFormProps = NotReadonly<ExtractPublicPropTypes<typeof inputFormProps>>;

export const inputFormEmits = {
    fieldValueChange: (field: InputFormField, fieldValue: any, formFields: InputFormField[], inputFormValue: Record<string, any>) => true
};

export type InputFormEmits = typeof inputFormEmits;

/** 数据输入表单实例 */
export interface InputFormRef {
    /** 获取表单的value */
    getInputValue: () => Record<string, any> | null;

    /** 设置表单的属性值 */
    setInputPropertyValue: (propertyName: string, value: any) => void;

    /** 修改表单字段属性 */
    changeFormFields: (callback: (formFields: InputFormField[]) => void) => void;

    // 获取form Ref
    getFormRef: () => FormInstance;

    // 表单验证
    validate: (callback?: FormValidateCallback) => FormValidationResult;
}
