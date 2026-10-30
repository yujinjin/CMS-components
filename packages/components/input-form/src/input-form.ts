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
    /** 表单数据路径，如 user.name；同时作为默认 FormItem prop，用于取值、写值和校验定位。 */
    name: string;

    /** 当前数据字段插槽 */
    slot?: string;

    /** 当前内容是否去除空格，只针对input输入框有效。默认false */
    trim?: boolean;

    /**  字段标签 */
    label?: string;

    /** 字段初始值；仅当表单 value 中对应路径为 undefined 时使用，null/false/0 不会被覆盖。 */
    value?: any;

    /** label宽度 */
    labelWidth?: number;

    /** 表单组件的宽度 */
    inputWidth?: number;

    /** 组件所占的列数,默认是24 */
    span?: number;

    /** false 时不渲染字段，但字段配置和内部数据仍保留。 */
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
    /** 字段定义列表，内部深拷贝后补充布局、控件默认属性和校验配置。 */
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
    /** 表单初始/同步数据，优先于字段 value；深度变化后会重新初始化内部编辑值。 */
    value: {
        type: Object as PropType<Record<string, any>>,
        default: function () {
            return {};
        }
    }
});

export type InputFormProps = NotReadonly<ExtractPublicPropTypes<typeof inputFormProps>>;

export const inputFormEmits = {
    /** 单字段写入后的通知，携带字段、当前值、内部字段列表及完整表单值，便于字段联动。 */
    fieldValueChange: (field: InputFormField, fieldValue: any, formFields: InputFormField[], inputFormValue: Record<string, any>) => true
};

export type InputFormEmits = typeof inputFormEmits;

/** 数据输入表单实例 */
export interface InputFormRef {
    /** 获取表单的value */
    getInputValue: () => Record<string, any>;

    /** 设置表单的属性值 */
    setInputPropertyValue: (propertyName: string, value: any) => void;

    /** 回调接收内部响应式字段列表，可修改显示、禁用、选项等配置，无需改写外部 fields。 */
    changeFormFields: (callback: (formFields: InputFormField[]) => void) => void;

    // 获取form Ref（组件未挂载时返回 null）
    getFormRef: () => FormInstance | null;

    // 表单验证（组件未挂载时会 reject）
    validate: (callback?: FormValidateCallback) => FormValidationResult;
}
