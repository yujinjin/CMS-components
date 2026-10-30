/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2024-10-25 16:24:25
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2024-11-01 14:47:32
 * @项目的路径: \CMS-components\packages\components\check-select\src\check-select.ts
 * @描述: checkselect 组件
 */
import { type PropType, type ExtractPublicPropTypes } from "vue";
import { buildProps } from "@yujinjin/cms-components-utils";
import { type NotReadonly } from "../../types";

export const checkSelectProps = buildProps({
    /** 选项应统一为对象、字符串或数字列表；基础类型会归一化为 { label, value }。 */
    data: {
        type: Array as PropType<Array<Record<string, any> | string | number>>,
        required: true
    },
    /** 对象选项的取值字段，勾选状态通过该值与 v-model 数组中的元素进行比较。 */
    optionValueKey: {
        type: String,
        default: "value"
    },
    /** 对象选项的展示字段，也用于内部全选范围的大小写不敏感文本匹配。 */
    optionLabelKey: {
        type: String,
        default: "label"
    },
    /** 透传 ElSelect 属性；multiple 固定为 true，multipleLimit 同时约束单选项勾选和全选。 */
    props: {
        type: Object as PropType<Record<string, any>>,
        default: () => ({})
    },
    /** 透传 ElSelect 事件；visible-change 会被包装，在下拉关闭时清空内部过滤词。 */
    events: {
        type: Object as PropType<Record<string, (...args: any[]) => any>>,
        default: () => ({})
    }
});

export type CheckSelectProps = NotReadonly<ExtractPublicPropTypes<typeof checkSelectProps>>;

export const checkSelectEmits = {
    /** 选中项变化后的完整值数组；复选框操作也会在更新 v-model 后主动触发。 */
    change: (value: Array<object | string | number>) => Array.isArray(value)
};

export type CheckSelectEmits = typeof checkSelectEmits;
