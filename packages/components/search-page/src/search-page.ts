/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2025-01-09 11:58:30
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-02-11 10:26:46
 * @项目的路径: \CMS-components\packages\components\search-page\src\search-page.ts
 * @描述: search-page组件属性、事件声明
 */
import { type PropType, type ExtractPublicPropTypes } from "vue";
import { buildProps } from "@yujinjin/cms-components-utils";
import { type NotReadonly } from "../../types";
import { type SearchFormProps, type SearchFormField } from "@yujinjin/cms-components-modules/search-form";
import { type ActionBarProps, type ActionButton } from "@yujinjin/cms-components-modules/action-bar";
import { type DataTableProps } from "@yujinjin/cms-components-modules/data-table";

export const searchPageProps = buildProps({
    /** 初始化加载遮罩，同时抑制表格挂载时自动查询；首次观察到该值变化为 false 时补查一次。 */
    isLoadingForInit: {
        type: Boolean,
        default: false
    },
    /** 查询区配置，未传时不渲染；搜索及重置通过 SearchForm 的 search 事件触发表格查询。 */
    searchFormProps: {
        type: Object as PropType<SearchFormProps>
    },
    /** 操作栏配置，未传时不渲染；当前选中行由页面统一传入其按钮回调。 */
    actionBarProps: {
        type: Object as PropType<ActionBarProps>
    },
    /** 表格配置；filters 与搜索表单值合并，查询时同名项以此处固定 filters 为准。 */
    dataTableProps: {
        type: Object as PropType<DataTableProps>
    }
});

export type SearchPageProps = NotReadonly<ExtractPublicPropTypes<typeof searchPageProps>>;

export const searchPageEmits = {
    // 搜索字段的值变化通知，不代表已经提交查询；携带当前字段和内部字段列表。
    searchValueChange: (field: SearchFormField, searchFormFields: SearchFormField[]) => true,

    // 搜索表单的字段变化事件
    searchFieldsChange: (searchFormFields: SearchFormField[]) => Array.isArray(searchFormFields),

    // 数据表格的行选择事件
    selectRowsChange: (selectedRows: Array<Record<string, any>>) => Array.isArray(selectedRows)
};

export type SearchPageEmits = typeof searchPageEmits;

export interface SearchPageRef {
    // 搜索查询函数；isInit=true 时会重置 DataTable 分页到第一页。
    query: (isInit?: boolean) => Promise<any> | undefined;

    // 返回当前表单值与固定 filters 的合并结果；与实际查询一致，同名项以固定 filters 为准。
    getSearchingValue: () => Record<string, any>;

    // 返回最近一次提交查询时使用的筛选值副本（含固定 filters），不代表该次请求已成功。
    getSearchedValue: () => Record<string, any>;

    // 修改当前form字段的属性
    changeFormFields: (callback: (formFields: SearchFormField[]) => void) => void;

    // 修改当前生成的button按钮属性值
    changeButtons: (callback: (actionButtons: ActionButton[]) => void) => void;

    /**
     * 更新数据列显示状态
     * @param columnKeys 要显示的 prop 列表；不传显示全部，空数组隐藏有 prop 的列，无 prop 列不受影响。
     */
    updateTableColumnsShowStatus: (columnKeys?: string[]) => void;
}
