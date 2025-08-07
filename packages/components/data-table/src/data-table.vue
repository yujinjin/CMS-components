<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2024-12-30 10:21:26
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-21 17:10:39
 * @项目的路径: \CMS-components\packages\components\data-table\src\data-table.vue
 * @描述: 数据列表组件
-->
<template>
    <div ref="dataTablePanelRef" class="cms-data-table-panel">
        <el-table v-loading="isLoadingForSearch" v-bind="tableProps" :data="dataList" element-loading-text="拼命加载中..." v-on="events" @selection-change="selectionChangeHandle">
            <template v-for="(columnItem, index) in columnList">
                <el-table-column v-if="columnItem.isShow" :key="(columnItem.prop || '') + '_' + index" v-bind="columnItem">
                    <template v-if="columnItem.slotHeader" #header="scope">
                        <slot :name="columnItem.slotHeader" v-bind="scope"></slot>
                    </template>
                    <template #default="scope">
                        <slot v-if="columnItem.slot" :name="columnItem.slot" v-bind="scope"></slot>
                        <!-- 日期 -->
                        <table-column-date v-else-if="columnItem.type === 'date'" :value="getCellValue(scope.row, columnItem, scope.$index)" :formate="columnItem.formate" />
                        <!-- 数字 -->
                        <table-column-number v-else-if="columnItem.type === 'number'" :value="getCellValue(scope.row, columnItem, scope.$index)" :digit="columnItem.digit || 0" />
                        <!-- 图片 -->
                        <table-column-image v-else-if="columnItem.type === 'image'" v-bind="columnItem" :value="getCellValue(scope.row, columnItem, scope.$index)" />
                        <!-- 枚举 -->
                        <table-column-enum v-else-if="columnItem.type === 'enum'" v-bind="columnItem" :value="getCellValue(scope.row, columnItem, scope.$index)" />
                        <!-- 操作按钮 -->
                        <table-column-action v-else-if="columnItem.type === 'action'" v-bind="columnItem" :row="scope.row" />
                    </template>
                </el-table-column>
            </template>
        </el-table>
        <div v-if="isShowPagination" ref="paginationRef" class="pagination-wrapper">
            <el-pagination v-bind="paginationData" @size-change="pageSizeChangeHandle" @current-change="currentPageChangeHandle" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { type PaginationProps, type TableProps, ElTable, ElPagination, ElTableColumn } from "element-plus";
import { type Ref, onMounted, onUnmounted, ref, watch, nextTick } from "vue";
import { extend, debounce } from "@yujinjin/utils";
import { type NotReadonly } from "../../types";
import { type DataTableColumn, type DataTableRef, dataTableProps, dataTableEmits } from "./data-table";
import tableColumnDate from "./table-column-date.vue";
import tableColumnNumber from "./table-column-number.vue";
import tableColumnImage from "./table-column-image.vue";
import tableColumnEnum from "./table-column-enum.vue";
import tableColumnAction from "./table-column-action.vue";

defineOptions({
    name: "DataTable"
});

defineSlots<{
    default(): any;
    [key: string]: (props: any) => any;
}>();

const props = defineProps(dataTableProps);

const emits = defineEmits(dataTableEmits);

// table 默认属性
const tableProps: Ref<Partial<TableProps<any>>> = ref({});

// 数据列表
const dataList = ref([]);

// 处理后的数据列表
const columnList: Ref<DataTableColumn<any>[]> = ref([]);

// 查询是否正在加载
const isLoadingForSearch: Ref<boolean> = ref(false);

// 数据分页属性
const paginationData: Ref<Partial<NotReadonly<PaginationProps>>> = ref({
    total: 0, // 总记录数
    currentPage: 1 // 当前页数
});

const dataTablePanelRef: Ref<HTMLDivElement | null> = ref(null);

const paginationRef: Ref<HTMLDivElement | null> = ref(null);

// 当选择项发生变化时会触发该事件
const selectionChangeHandle = function (selectRows) {
    emits("update:selectRows", selectRows);
};

// 初始化分页数据
const initPaginationData = function () {
    if (!props.isShowPagination) {
        return;
    }
    const { total, currentPage } = paginationData.value;
    paginationData.value = Object.assign(
        {
            pageSize: 20,
            layout: "total, sizes, prev, pager, next, jumper",
            pageSizes: [10, 20, 30, 50, 100]
            // background: true,
            // size: "small"
        },
        props.pagination,
        { total, currentPage }
    );
};

// TODO: 收起/展开事件触发
// 初始化table 最大高度
const initTableMaxHeight = async function () {
    if (props.props && (props.props.height || props.props.maxHeight)) {
        // 当前数据表格已经指定高度，就不再自动计算了
        return;
    }
    await nextTick();
    tableProps.value.maxHeight = dataTablePanelRef.value!.clientHeight - (paginationRef.value ? paginationRef.value.offsetHeight : 0) - 15;
    if (tableProps.value.maxHeight < 100) {
        tableProps.value.maxHeight = 100;
    }
    // console.info("=========initTableMaxHeight", dataTablePanelRef.value.clientHeight, paginationRef.value.offsetHeight);
};

// 初始化table属性
const initTableProps = function () {
    tableProps.value = Object.assign(
        {
            stripe: true, // 隔行变色
            border: false, // 是否带有纵向边框
            rowKey: "id",
            // size: "small",
            scrollbarAlwaysOn: true,
            tooltipEffect: "light",
            tooltipOptions: {
                popperClass: "cms-ellipsis-table-tooltip-popover"
            },
            style: {
                width: "100%"
            },
            maxHeight: tableProps.value.maxHeight
        },
        props.props || {}
    );
};

// TODO: selectRows 事件

// 初始化columns 数据
const initColumns = function () {
    columnList.value = [];
    props.columns.forEach(columnItem => {
        const newColumnItem = extend(true, { isShow: true }, columnItem);
        if (newColumnItem.type === "action" && newColumnItem.buttons && newColumnItem.buttons.length > 0) {
            if (newColumnItem.fixed === undefined) {
                newColumnItem.fixed = "right";
            }
            if (!newColumnItem.label) {
                newColumnItem.label = "操作";
            }
        } else if (newColumnItem.type === "index" && !newColumnItem.index) {
            newColumnItem.index = function (index) {
                if (props.isShowPagination) {
                    return (paginationData.value.currentPage! - 1) * paginationData.value.pageSize! + index + 1;
                }
                return index + 1;
            };
        } else if (!newColumnItem.type && !newColumnItem.formatter) {
            newColumnItem.formatter = function (row, column, cellValue) {
                return cellValue === null || cellValue === undefined ? "-" : cellValue;
            };
        }
        columnList.value.push(newColumnItem);
    });
};

// 查询数据
const queryDataList = async function (isInit = true) {
    if (isLoadingForSearch.value) {
        return;
    }
    isLoadingForSearch.value = true;
    emits("search", true);
    try {
        if (isInit && props.isShowPagination) {
            paginationData.value.currentPage = 1;
        }
        let parameters = Object.assign({}, props.filters, props.isShowPagination ? { pageNo: paginationData.value.currentPage, pageSize: paginationData.value.pageSize } : {});
        if (props.queryParametersProcess) {
            parameters = props.queryParametersProcess(parameters);
        }
        let queryResult = await props.query(parameters);
        if (props.queryResponseProcess) {
            queryResult = props.queryResponseProcess(queryResult);
        }
        if (props.isShowPagination) {
            dataList.value = queryResult.rows || [];
            paginationData.value.total = queryResult.total || 0;
        } else {
            dataList.value = queryResult || [];
        }
    } catch (error) {
        console.error(error);
    }
    isLoadingForSearch.value = false;
    emits("search", false);
};

// 获取当前数据列的值
const getCellValue = function (row, columnItem, index: number) {
    if (columnItem.formatter) {
        return columnItem.formatter(row, columnItem, columnItem.prop ? row[columnItem.prop] : null, index);
    }
    if (!columnItem.prop) {
        return null;
    }
    if (columnItem.prop.split(",").length > 1) {
        return columnItem.prop.split(",").map(key => row[key]);
    }
    return row[columnItem.prop];
};

// 分页中每页条目数据变换
const pageSizeChangeHandle = function (pageSize: number) {
    paginationData.value.pageSize = pageSize;
    queryDataList();
};

// 分页中的当前页码变换
const currentPageChangeHandle = function (currentPage) {
    paginationData.value.currentPage = currentPage;
    queryDataList(false);
};

watch(
    () => props.pagination,
    () => {
        initPaginationData();
    },
    { deep: true, immediate: true }
);

watch(
    () => props.props,
    () => {
        initTableProps();
    },
    { deep: true, immediate: true }
);

watch(
    () => props.columns,
    () => {
        initColumns();
    },
    { deep: true, immediate: true }
);

// window resize 事件函数
let resizeHandle: (e: UIEvent) => any;

if (!props.props || (!props.props.height && !props.props.maxHeight)) {
    resizeHandle = debounce(initTableMaxHeight, 100);
    // 当前数据表格已经指定高度，就不再自动计算了
    window.addEventListener("resize", resizeHandle);
}

onMounted(async () => {
    await initTableMaxHeight();
    if (props.autoInitQuery) {
        queryDataList();
    }
});

onUnmounted(() => {
    if (resizeHandle) {
        window.removeEventListener("resize", resizeHandle);
    }
});

defineExpose<DataTableRef>({
    /** 初始化表格最大高度 */
    initTableMaxHeight,

    /** 查询数据列表 */
    queryDataList,

    /**
     * 更新数据列显示状态
     * @param columnKeys 显示列key值数组（不传值表示都展示）
     */
    updateTableColumnsShowStatus(columnKeys?: string[]) {
        columnList.value.forEach(column => {
            if (column.prop) {
                column.isShow = !columnKeys || columnKeys.includes(column.prop);
            }
        });
    }
});
</script>
