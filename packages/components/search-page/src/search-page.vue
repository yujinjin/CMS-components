<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2025-01-09 11:58:34
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-21 17:34:55
 * @项目的路径: \CMS-components\packages\components\search-page\src\search-page.vue
 * @描述: search-page 搜索页面组件
-->
<template>
    <div v-loading="isLoadingForInit" class="cms-search-page">
        <search-form
            v-if="searchFormProps"
            v-bind="searchFormProps"
            ref="searchFormRef"
            :is-search-loading="isSearchLoading"
            @search="searchHandle"
            @change="searchValueChangeHandle"
            @fields-change="searchFieldsChangeHandle"
        >
            <template v-for="name in distributeSlots.searchForm" #[name]="scope">
                <slot :name="name" v-bind="scope"></slot>
            </template>
        </search-form>
        <action-bar v-if="actionBarProps" v-bind="actionBarProps" ref="actionBarRef" :select-rows="selectRows">
            <template v-for="name in distributeSlots.actionBar" #[name]="scope">
                <slot :name="name" v-bind="scope"></slot>
            </template>
            <template v-if="distributeSlots.actionBarDefault" #default>
                <slot :name="distributeSlots.actionBarDefault"></slot>
            </template>
        </action-bar>
        <data-table
            v-if="dataTableProps"
            v-bind="dataTableProps"
            ref="dataTableRef"
            v-model:select-rows="selectRows"
            :filters="dataTableFilters"
            :auto-init-query="!isLoadingForInit"
            @search="isLoading => (isSearchLoading = isLoading)"
        >
            <template v-for="name in distributeSlots.dataTable" #[name]="scope">
                <slot :name="name" v-bind="scope"></slot>
            </template>
        </data-table>
        <slot></slot>
    </div>
</template>
<script setup lang="ts">
import { type Ref, onMounted, ref, computed, watch, nextTick } from "vue";
import { extend } from "@yujinjin/utils";
import { type SearchPageRef, searchPageProps, searchPageEmits } from "./search-page";
import { type DataTableRef, DataTable } from "@yujinjin/cms-components-modules/data-table";
import { type SearchFormRef, type SearchFormSlotScope, type SearchFormField, SearchForm } from "@yujinjin/cms-components-modules/search-form";
import { type ActionBarRef, type ActionButtonSlotScope, type ActionButton, ActionBar } from "@yujinjin/cms-components-modules/action-bar";

defineOptions({
    name: "SearchPage"
});

const slots = defineSlots<
    {
        default(): any;
        actionBar_default(): any;
    } & Record<`searchForm_${string}`, (props: SearchFormSlotScope) => any> &
        Record<`actionBar_${string}`, (props: ActionButtonSlotScope) => any> &
        Record<`dataTable_${string}`, (props: any) => any>
>();

const props = defineProps(searchPageProps);

const emits = defineEmits(searchPageEmits);

// 当前数据表格的筛选参数值（searchFormValue和props.dataTableProps.filters的并集）
const dataTableFilters: Ref<Record<string, any>> = ref({});

// 当前搜索条件的筛选参数值
const searchFormValue: Ref<Record<string, any>> = ref({});

// datatable组件ref
const dataTableRef = ref<DataTableRef>();

// searchForm组件ref
const searchFormRef = ref<SearchFormRef>();

// actionBar组件Ref
const actionBarRef = ref<ActionBarRef>();

// 当前搜索是否正在加载中
const isSearchLoading = ref(false);

// 选择的数据列
const selectRows: Ref<Array<Record<string, any>>> = ref([]);

// 把插槽分组放入对应的组件里。以searchForm_开头放入到searchForm组件，actionBar_开头放入到actionBar组件，dataTable_开头放入到dataTable组件
const distributeSlots = computed(() => {
    const typeSlotList = {
        searchForm: [] as string[],
        actionBar: [] as string[],
        dataTable: [] as string[],
        actionBarDefault: ""
    };
    Object.keys(slots).forEach(key => {
        if (key.startsWith("searchForm_")) {
            typeSlotList.searchForm.push(key);
        } else if (key === "actionBar_default") {
            typeSlotList.actionBarDefault = "actionBar_default";
        } else if (key.startsWith("actionBar_")) {
            typeSlotList.actionBar.push(key);
        } else if (key.startsWith("dataTable_")) {
            typeSlotList.dataTable.push(key);
        }
    });
    return typeSlotList;
});

// 搜索表单的值变化事件
const searchValueChangeHandle = function (field: SearchFormField, formFields: SearchFormField[]) {
    emits("searchValueChange", field, formFields);
};

// 搜索表单的字段变化事件
const searchFieldsChangeHandle = function (formFields: SearchFormField[]) {
    emits("searchFieldsChange", formFields);
};

// 查询方法
const queryDataList = async function (isInit = true, formValue?: Record<string, any>) {
    if (formValue) {
        searchFormValue.value = formValue;
    } else {
        searchFormValue.value = searchFormRef.value?.getValue() || {};
    }
    if (props.dataTableProps?.filters) {
        dataTableFilters.value = extend(true, {}, searchFormValue.value, props.dataTableProps.filters);
    } else {
        dataTableFilters.value = searchFormValue.value;
    }
    await nextTick();
    return dataTableRef.value?.queryDataList(isInit);
};

// 搜索操作
const searchHandle = function (formValue: Record<string, any>) {
    queryDataList(true, formValue);
};

watch(
    () => selectRows.value,
    () => {
        emits("selectRowsChange", selectRows.value);
    },
    {
        deep: true
    }
);

// 只运行一次
watch(
    () => props.isLoadingForInit,
    async value => {
        if (value) return;
        queryDataList();
    },
    {
        once: true
    }
);

onMounted(() => {
    if (searchFormRef.value) {
        searchFormValue.value = searchFormRef.value.getValue();
    }
    if (props.dataTableProps?.filters) {
        dataTableFilters.value = extend(true, {}, searchFormValue.value, props.dataTableProps.filters);
    } else {
        dataTableFilters.value = searchFormValue.value;
    }
    if (selectRows.value && selectRows.value.length > 0) {
        emits("selectRowsChange", selectRows.value);
    }
});

defineExpose<SearchPageRef>({
    // 分页查询
    query: queryDataList,

    // 获取当前搜索表单实时值
    getSearchingValue: function () {
        if (searchFormRef.value) {
            return extend(true, {}, props.dataTableProps && props.dataTableProps.filters, searchFormRef.value.getValue());
        }
        return extend(true, {}, props.dataTableProps && props.dataTableProps.filters);
    },

    // 获取当前已经搜索出来的结果值，与getSearchFormValue区别是当前已经用它查询出来结果的搜索表单值
    getSearchedValue: function () {
        return extend(true, {}, dataTableFilters.value);
    },

    // 修改当前form字段的属性
    changeFormFields: function (callback: (formFields: SearchFormField[]) => void) {
        searchFormRef.value?.changeFormFields(callback);
    },

    // 修改当前生成的button按钮值
    changeButtons: function (callback: (actionButtons: ActionButton[]) => void) {
        actionBarRef.value?.changeButtons(callback);
    },

    /**
     * 更新数据列显示状态
     * @param columnKeys 显示列key值数组（不传值表示都展示）
     */
    updateTableColumnsShowStatus(columnKeys?: string[]) {
        dataTableRef.value?.updateTableColumnsShowStatus(columnKeys);
    }
});
</script>
