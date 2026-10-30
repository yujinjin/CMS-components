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

/** 行操作配置；每行生成独立按钮副本，loading 不会在不同行之间共享。 */
export type TableButton = NotReadonly<Partial<ButtonProps>> & {
    /** 当前按钮操作CODE */
    handleCode?: string;

    /** 按钮文案内容 */
    contents?: string;

    /** 预留插槽配置；内置操作列当前不消费此属性，定制整列请使用 DataTableColumn.slot。 */
    slot?: string;

    /** 按钮是否正在加载 */
    // isLoading?: boolean;

    /** 内部折叠标记，由 maxNumShow 计算；false 表示进入更多菜单，不表示移除操作。 */
    isShow?: boolean;

    /** 按当前行判断是否生成按钮，返回 false 时主区域和更多菜单都不展示。 */
    display?: (row: any) => boolean;

    /** 按钮点击函数事件 */
    click?: (selectRow: Record<string, any>, button: TableButton) => Promise<void> | void;
};

/** 兼容 ElTableColumn 配置；slot 优先于内置类型渲染，formatter 可预处理内置列取值。 */
export interface DataTableColumn<T extends Record<string, any> = Record<string, any>> extends Partial<TableColumnCtx<T>> {
    /** 数据列的自定义类型 */
    type?: "selection" | "index" | "expand" | "number" | "action" | "date" | "enum" | "image";

    /** 操作按钮列表(type是action有用) */
    buttons?: TableButton[];

    /** 数字格式化小数点位数(默认是0, type是number有用) */
    digit?: number;

    /** 数据列分隔符，比如type是image、enum等会用到 */
    separator?: string;

    /** 日期格式化字符串，默认 YYYY-MM-DD；formate 为现有 API 拼写，调用时需保持一致。 */
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
    /** 查询函数接收筛选参数；分页时返回 { rows, total }，无分页时返回数组，可同步或异步返回。 */
    query: {
        type: Function as PropType<(...args: any[]) => Promise<any> | any>,
        required: true
    },
    /** 列配置直接透传 ElTableColumn，并按 type 分派内置展示组件；selection/index/expand 可不指定 prop。 */
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
    /** 请求筛选参数；启用分页时内部 pageNo/pageSize 覆盖同名筛选项，变化后需主动触发查询。 */
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
    /** 同步参数转换函数，接收合并后的筛选及分页参数，返回最终传给 query 的参数。 */
    queryParametersProcess: {
        type: Function as PropType<(parameters?: any) => any>
    },
    /** 同步响应转换函数，把业务接口结果归一化为分页对象或无分页数组。 */
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
    /** 表格选择变化后的完整选中行列表，用于 v-model:selectRows。 */
    "update:selectRows": (value: Array<any>) => Array.isArray(value),
    /** 查询加载状态：开始时 true，成功或异常处理结束后 false，并非返回查询数据。 */
    "search": (value: boolean) => typeof value === "boolean"
};

export type DataTableEmits = typeof dataTableEmits;

/** 数据表格实例 */
export interface DataTableRef {
    /** 默认重置到第一页；false 保留页码。加载中调用会忽略，查询异常在组件内部记录。 */
    queryDataList: (isInit?: boolean) => Promise<any>;

    /** 初始化表格最大高度 */
    initTableMaxHeight: () => Promise<void>;

    /**
     * 更新数据列显示状态
     * @param columnKeys 要显示的 prop 列表；不传显示全部，空数组隐藏有 prop 的列，无 prop 列不受影响。
     */
    updateTableColumnsShowStatus: (columnKeys?: string[]) => void;
}
