/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2024-12-27 16:17:56
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-20 15:01:15
 * @项目的路径: \CMS-components\packages\components\data-table\src\data-table.ts
 * @描述: data-table组件声明
 */
import { type PropType, type ExtractPublicPropTypes } from "vue";
import { buildProps } from "@yujinjin/cms-components-utils";
import { type TableProps, type PaginationProps, type TableColumnCtx, type ButtonProps } from "element-plus";
import { type NotReadonly } from "../../types";

export type TableButton = NotReadonly<Partial<ButtonProps>> & {
    /** 当前按钮操作CODE */
    handleCode?: string;

    /** 按钮文案内容 */
    contents?: string;

    /** 自定义插槽名称（如有值其他选项无效） */
    slot?: string;

    /** 按钮是否正在加载 */
    // isLoading?: boolean;

    /** 是否显示(通过当前固定展示数目来判断是否展示) */
    isShow?: boolean;

    /** 是否显示(根据当前列的数据情况来判断是否展示) */
    display?: (row: any) => boolean;

    /** 按钮点击函数事件 */
    click?: (selectRows: Array<any>, button: TableButton) => Promise<void> | void;
};

export interface DataTableColumn<T extends Record<string, any> = Record<string, any>> extends Partial<TableColumnCtx<T>> {
    /** 数据列的自定义类型 */
    type?: "selection" | "index" | "expand" | "number" | "action" | "date" | "enum" | "image";

    /** 操作按钮列表(type是action有用) */
    buttons?: TableButton[];

    /** 数字格式化小数点位数(默认是0, type是number有用) */
    digit?: number;

    /** 数据列分隔符，比如type是image、enum等会用到 */
    separator?: string;

    /** 日期格式化字符串(默认是YYYY-MM-DD, type是date有用) */
    formate?: string;

    /** 数据枚举列表(type是enum有用) */
    data?: Array<Record<string, any>>;

    /** header 插槽 */
    slotHeader?: string;

    /** 默认插槽 */
    slot?: string;

    /** 是否展示数据列 */
    isShow?: boolean;
}

export const dataTableProps = buildProps({
    // 当前列表查询函数, 可返回Promise
    query: {
        type: Function as PropType<(...args) => Promise<any> | any>,
        required: true
    },
    // type: "number|action|date|enum|image" // 数据列的自定义类型，可以不传
    // type是action => buttons: [], // 操作按钮列表| maxNumShow: 3, // 最多展示数 (默认是3)
    // type是number => digit: 0, // 数字格式化小数点位数(默认是0)
    // type是date => formate: 0, // 日期格式化字符串(默认是YYYY-MM-DD) | separator 分隔符，多个日期展示用。默认是“-”
    // type是enum => data: [] // 数据枚举列表 | separator: "," // 多个内容的分隔符(默认是",") | valueKey: 枚举列表中value对应的属性值 | textKey: valueKey: 枚举列表中name对应的属性值
    // props: el-table-column 的属性值具体参照element plus Table-column 属性，注意：如果有type有值prop值必传
    columns: {
        type: Array as PropType<DataTableColumn<any>[]>,
        default() {
            return [];
        },
        required: true
    },
    // 是否自动初始化查询
    autoInitQuery: {
        type: Boolean,
        default: true
    },
    // 当前选中的行数据列表
    selectRows: {
        type: Array,
        default: function () {
            return [];
        }
    },
    // 当前列表查询滤参数
    filters: {
        type: Object,
        default() {
            return {};
        }
    },
    // table 其他属性具体参照element plus table文档
    props: {
        type: Object as PropType<Partial<TableProps<any>>>,
        default() {
            return {};
        }
    },
    // table 其他事件具体参照element plus table文档
    events: {
        type: Object as PropType<Record<string, (...args: any[]) => any>>,
        default() {
            return {};
        }
    },
    // 查询参数数据加工（查询前参数处理函数）
    queryParametersProcess: {
        type: Function as PropType<(parameters?: any) => any>
    },
    // 查询数据结果加工（查询后数据结果处理函数）
    queryResponseProcess: {
        type: Function as PropType<(reponseData: any) => any>
    },
    // 是否显示分页
    isShowPagination: {
        type: Boolean,
        default: true
    },
    // 数据分页属性
    pagination: {
        type: Object as PropType<Partial<PaginationProps>>,
        default() {
            return {};
        }
    }
});

export type DataTableProps = NotReadonly<ExtractPublicPropTypes<typeof dataTableProps>>;

export const dataTableEmits = {
    "update:selectRows": (value: Array<any>) => Array.isArray(value),
    "search": (value: boolean) => typeof value === "boolean"
};

export type DataTableEmits = typeof dataTableEmits;

/** 数据表格实例 */
export interface DataTableRef {
    /** 查询数据函数 */
    queryDataList: (isInit?: boolean) => Promise<any>;

    /** 初始化表格最大高度 */
    initTableMaxHeight: () => Promise<void>;

    /**
     * 更新数据列显示状态
     * @param columnKeys 显示列key值数组（不传值表示都展示）
     */
    updateTableColumnsShowStatus: (columnKeys?: string[]) => void;
}
