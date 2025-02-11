/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2025-01-09 11:58:30
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-02-11 10:26:46
 * @项目的路径: \CMS-components\packages\components\search-page\src\search-page.ts
 * @描述: search-page组件属性、事件声明
 */
import { type PropType, type ExtractPublicPropTypes } from "vue";
import { type NotReadonly } from "/#/global";
import { buildProps } from "@yujinjin/cms-components-utils";
import { type SearchFormProps, type SearchFormField } from "@yujinjin/cms-components-modules/search-form";
import { type ActionBarProps, type ActionButton } from "@yujinjin/cms-components-modules/action-bar";
import { type DataTableProps } from "@yujinjin/cms-components-modules/data-table";

export const searchPageProps = buildProps({
    // 初始化时正在加载
    isLoadingForInit: {
        type: Boolean,
        default: false
    },
    searchFormProps: {
        type: Object as PropType<SearchFormProps>
    },
    actionBarProps: {
        type: Object as PropType<ActionBarProps>
    },
    dataTableProps: {
        type: Object as PropType<DataTableProps>
    }
});

export type SearchPageProps = NotReadonly<ExtractPublicPropTypes<typeof searchPageProps>>;

export const searchPageEmits = {
    // 搜索表单查询事件
    searchValueChange: (field: SearchFormField, searchFormFields: SearchFormField[]) => true,

    // 搜索表单的字段变化事件
    searchFieldsChange: (searchFormFields: SearchFormField[]) => Array.isArray(searchFormFields),

    // 数据表格的行选择事件
    selectRowsChange: (selectedRows: Array<Record<string, any>>) => Array.isArray(selectedRows)
};

export type SearchPageEmits = typeof searchPageEmits;

export interface SearchPageRef {
    // 搜索查询函数
    query: (isInit?: boolean) => Promise<any> | undefined;

    // 获取当前搜索表单实时值
    getSearchingValue: () => Record<string, any>;

    // 获取当前已经搜索出来的结果值，与getSearchFormValue区别是当前已经用它查询出来结果的搜索表单值
    getSearchedValue: () => Record<string, any>;

    // 修改当前form字段的属性
    changeFormFields: (callback: (formFields: SearchFormField[]) => void) => void;

    // 修改当前生成的button按钮属性值
    changeButtons: (callback: (actionButtons: ActionButton[]) => void) => void;

    /**
     * 更新数据列显示状态
     * @param columnKeys 显示列key值数组（不传值表示都展示）
     */
    updateTableColumnsShowStatus: (columnKeys?: string[]) => void;
}
