/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2024-12-19 17:33:09
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-02-11 11:03:28
 * @项目的路径: \CMS-components\packages\components\input-field\src\input-field.ts
 * @描述: 表单输入字段组件声明
 */
import { type PropType, type ExtractPublicPropTypes } from "vue";
import { buildProps } from "@yujinjin/cms-components-utils";
import { type NotReadonly } from "../../types";

/** 显式渲染的业务控件与按 el-* 名称解析的 Element Plus 控件类型。 */
type FieldType =
    | "input"
    | "select"
    | "selectV2"
    | "checkSelect"
    | "datePicker"
    | "timePicker"
    | "timeSelect"
    | "label"
    | "inputNumber"
    | "radio"
    | "slider"
    | "switch"
    | "imgUpload"
    | "webEditor"
    | "autocomplete"
    | "cascader"
    | "checkbox"
    | "colorPicker";

export const inputFieldProps = buildProps({
    /** 为真值时仅渲染默认插槽；具名插槽由上层 InputForm 转接到此默认插槽。 */
    slot: {
        type: [String, Boolean],
        default: false
    },
    /** 组件的类型 */
    type: {
        type: String as PropType<FieldType>,
        default: "input"
    },
    /** 组件的数值（类型由 type 属性决定，静态推断无法精确约束，因此使用 any） */
    modelValue: {
        type: [String, Number, Object, Boolean, Array] as PropType<any>,
        default: null // 必须设置默认值，否则在没有值绑定的情况vue3会设置成false
    },
    /** 数据（比如：select的选项值列表） */
    data: {
        type: Array as PropType<Array<Record<string, any>>>,
        default: function () {
            return [];
        }
    },
    /** data选项值value key属性名，默认是:value(type是select时有意义) */
    optionValueKey: {
        type: String,
        default: "value"
    },
    /** data选项值label key属性名, 默认值是:label(type是select时有意义) */
    optionLabelKey: {
        type: String,
        default: "label"
    },
    /** 底层控件属性，与未声明的 attrs 合并；同名属性以此对象为准。 */
    props: {
        type: Object,
        default: function () {
            return {};
        }
    },
    /** 底层控件事件映射；由模板中绑定 v-on 的分支透传。 */
    events: {
        type: Object as PropType<Record<string, (...args: any[]) => any>>,
        default: function () {
            return {};
        }
    }
});

export type InputFieldProps = NotReadonly<ExtractPublicPropTypes<typeof inputFieldProps>>;

export const inputFieldEmits = {
    /** 原样回传底层控件值，类型随控件变化，不在字段层进行格式转换或校验。 */
    "update:modelValue": (value: string | number | object | boolean | Array<any>) => true
};

export type InputFieldEmits = typeof inputFieldEmits;
