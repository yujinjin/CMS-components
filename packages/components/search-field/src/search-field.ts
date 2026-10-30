/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2024-12-26 21:29:51
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2024-12-27 17:30:51
 * @项目的路径: \CMS-components\packages\components\search-field\src\search-field.ts
 * @描述: 搜索表单字段组件声明
 */
import { type PropType, type ExtractPublicPropTypes } from "vue";
import { buildProps } from "@yujinjin/cms-components-utils";
import { type NotReadonly } from "../../types";

type FieldType = "input" | "inputNumber" | "select" | "checkSelect" | "datePicker";

export const searchFieldProps = buildProps({
    /** 为真值时改用默认插槽，上层 SearchForm 负责按字段 slot 名称转接内容。 */
    slot: {
        type: [String, Boolean]
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
    /** 底层查询控件属性，合并时覆盖未声明的 attrs 中的同名项。 */
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

export type SearchFieldProps = NotReadonly<ExtractPublicPropTypes<typeof searchFieldProps>>;

export const searchFieldEmits = {
    /** 同步控件值；input 分支会先去除字符串首尾空白。 */
    "update:modelValue": (value: string | number | object | boolean | Array<any>) => true,
    /** 紧随 update:modelValue 发出，供 SearchForm 将值变化关联到字段配置。 */
    "change": (value: string | number | object | boolean | Array<any>) => true
};

export type SearchFieldEmits = typeof searchFieldEmits;
