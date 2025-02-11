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
import { type NotReadonly } from "/#/global";

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
    | "colorPicker"
    | "upload";

export const inputFieldProps = buildProps({
    /** 是否使用插槽 */
    slot: {
        type: [String, Boolean],
        default: false
    },
    /** 组件的类型 */
    type: {
        type: String as PropType<FieldType>,
        default: "input"
    },
    /** 组件的数值 */
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
    /** 组件自定义属性 */
    props: {
        type: Object,
        default: function () {
            return {};
        }
    },
    /** 组件自定义事件 */
    events: {
        type: Object as PropType<Record<string, (...args: any[]) => any>>,
        default: function () {
            return {};
        }
    }
});

export type InputFieldProps = NotReadonly<ExtractPublicPropTypes<typeof inputFieldProps>>;

export const inputFieldEmits = {
    "update:modelValue": (value: string | number | object | boolean | Array<any>) => true
};

export type InputFieldEmits = typeof inputFieldEmits;
