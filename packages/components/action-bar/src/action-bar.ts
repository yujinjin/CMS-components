/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2024-12-26 14:25:48
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-15 11:03:23
 * @项目的路径: \CMS-components\packages\components\action-bar\src\action-bar.ts
 * @描述: action-bar组件入口
 */
import { type PropType, type ExtractPublicPropTypes, type Component } from "vue";
import { buildProps } from "@yujinjin/cms-components-utils";
import { type ButtonProps } from "element-plus";
import { type NotReadonly } from "../../types";

/** 在 Element Plus 按钮属性上扩展业务标识、图标和批量操作回调。 */
export type ActionButton = NotReadonly<Partial<ButtonProps>> & {
    /** 当前按钮操作CODE */
    handleCode?: string;

    /** 按钮文案内容 */
    contents?: string;

    /** 自定义插槽名称；提供后由插槽负责渲染和事件绑定，作用域参数为 button。 */
    slot?: string;

    /** 自定义图标 */
    customIcon?: string | Component;

    /** 按钮是否正在加载 */
    // isLoading?: boolean;

    /** 按钮配置中的显示标记；ActionBar 当前不会据此过滤，按需由自定义插槽处理。 */
    isShow?: boolean;

    /** 接收当前选中行和内部按钮对象；异步执行期间自动设置 loading，重复点击会被忽略。 */
    click?: (selectRows: Array<any>, button: ActionButton) => Promise<void> | void;
};

export type ActionButtonSlotScope = {
    button: ActionButton;
};

/** 列表操作栏实例 */
export interface ActionBarRef {
    /** 修改当前生成的button按钮值 */
    changeButtons: (callback: (actionButtons: ActionButton[]) => void) => void;
}

export const actionBarProps = buildProps({
    /** 按配置顺序生成按钮副本，内部 loading 的变化不会直接写回原按钮对象。 */
    buttons: {
        type: Array as PropType<ActionButton[]>,
        default: function () {
            return [];
        }
    },
    // 当前选中的行数据列表
    selectRows: {
        type: Array,
        default: function () {
            return [];
        }
    },
    /** 按钮对齐方式；left 时默认插槽在按钮后，center/right 时在按钮前。 */
    align: {
        type: String as PropType<"center" | "left" | "right">,
        default: "left"
    }
});

export type ActionBarProps = NotReadonly<ExtractPublicPropTypes<typeof actionBarProps>>;
