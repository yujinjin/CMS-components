import { describe, test, expect, vi, afterEach } from "vitest";
import { mount, flushPromises, enableAutoUnmount } from "@vue/test-utils";
import { nextTick } from "vue";
import { ElLoading } from "element-plus";
import SearchPage from "../src/search-page.vue";
import { type SearchFormProps } from "@yujinjin/cms-components-modules/search-form";
import { type ActionBarProps } from "@yujinjin/cms-components-modules/action-bar";
import { type DataTableProps } from "@yujinjin/cms-components-modules/data-table";

enableAutoUnmount(afterEach);
afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
});

describe("查询页面组件", () => {
    const mockSearchFormProps: SearchFormProps = {
        fields: [
            { name: "name", label: "Name", type: "input", value: "admin" },
            {
                name: "status",
                label: "Status",
                type: "select",
                value: 1,
                data: [
                    { label: "Active", value: 1 },
                    { label: "Inactive", value: 0 }
                ]
            },
            { name: "date", label: "Date", type: "datePicker", value: "" }
        ],
        buttons: [
            { handleCode: "search", contents: "Search", click: vi.fn() },
            { handleCode: "reset", contents: "Reset", click: vi.fn() }
        ]
    };

    const mockActionBarProps: ActionBarProps = {
        buttons: [
            { handleCode: "add", contents: "Add", click: vi.fn() },
            { handleCode: "delete", contents: "Delete", click: vi.fn() },
            { handleCode: "export", contents: "Export", click: vi.fn() }
        ]
    };

    const mockData = [
        { id: 1, name: "Item 1", status: 1, createTime: "2024-01-01", orderAmount: 3456.23, goodsImgs: "https://example.com/image1.jpg,https://example.com/image2.jpg" },
        { id: 2, name: "Item 2", status: 0, createTime: "2024-01-02", orderAmount: 1234, goodsImgs: "https://example.com/image1.jpg" }
    ];

    const mockDataTableProps: DataTableProps = {
        columns: [
            { type: "selection" },
            { prop: "id", label: "ID" },
            { prop: "name", label: "Name" },
            {
                prop: "status",
                label: "Status",
                type: "enum",
                data: [
                    { label: "Active", value: 1 },
                    { label: "Inactive", value: 0 }
                ]
            },
            { prop: "createTime", label: "订单时间", type: "date" },
            { prop: "orderAmount", label: "订单金额", digit: 2, type: "number" },
            { prop: "goodsImgs", label: "订单商品图片", separator: ",", type: "image" },
            {
                type: "action",
                width: 120,
                buttons: [{ contents: "Edit", handleCode: "edit", click: vi.fn() }]
            }
        ],
        query: vi.fn(() => Promise.resolve({ rows: mockData, total: 100 }))
    };

    const createWrapper = (props = {}) => {
        return mount(SearchPage, {
            props: {
                searchFormProps: mockSearchFormProps,
                actionBarProps: mockActionBarProps,
                dataTableProps: mockDataTableProps,
                isLoadingForInit: false,
                ...props
            },
            global: {
                plugins: [ElLoading]
            }
        });
    };

    test("实时读取条件与查询使用相同的固定筛选优先级", async () => {
        const query = vi.fn().mockResolvedValue({ rows: [], total: 0 });
        const wrapper = createWrapper({ searchFormProps: { fields: [{ name: "status", type: "input", value: "draft" }] }, dataTableProps: { columns: [], query, filters: { status: "approved" } } });
        await flushPromises();
        expect(wrapper.vm.getSearchingValue()).toEqual({ status: "approved" });
        await wrapper.vm.query();
        expect(query).toHaveBeenLastCalledWith({ status: "approved", pageNo: 1, pageSize: 20 });
        expect(wrapper.vm.getSearchedValue()).toEqual({ status: "approved" });
    });

    test("初始化加载结束只查询一次", async () => {
        const query = vi.fn().mockResolvedValue({ rows: [], total: 0 });
        const wrapper = createWrapper({ isLoadingForInit: true, dataTableProps: { columns: [], query } });
        await flushPromises();
        expect(query).not.toHaveBeenCalled();
        await wrapper.setProps({ isLoadingForInit: false });
        await flushPromises();
        expect(query).toHaveBeenCalledTimes(1);
    });

    describe("组件初始化", () => {
        test("同一事件循环内连续查询仅提交第一组条件", async () => {
            const query = vi.fn().mockResolvedValue({ rows: [], total: 0 });
            const wrapper = createWrapper({ searchFormProps: { fields: [] }, dataTableProps: { columns: [], query } });
            await flushPromises();
            query.mockClear();
            const form = wrapper.findComponent({ name: "SearchForm" });
            form.vm.$emit("search", { keyword: "第一次" });
            form.vm.$emit("search", { keyword: "第二次" });
            await flushPromises();
            expect(query).toHaveBeenCalledExactlyOnceWith({ keyword: "第一次", pageNo: 1, pageSize: 20 });
            expect(wrapper.vm.getSearchedValue()).toEqual({ keyword: "第一次" });
        });

        test("请求期间忽略新查询时保留已经提交的筛选条件", async () => {
            let finish!: (result: any) => void;
            const query = vi
                .fn()
                .mockImplementationOnce(() => new Promise(resolve => (finish = resolve)))
                .mockResolvedValue({ rows: [], total: 0 });
            const wrapper = createWrapper({ searchFormProps: { fields: [{ name: "keyword", type: "input", value: "原条件" }] }, dataTableProps: { columns: [], query } });
            await flushPromises();
            expect(query).toHaveBeenCalledTimes(1);
            wrapper.findComponent({ name: "SearchForm" }).vm.$emit("search", { keyword: "新条件" });
            await flushPromises();
            expect(query).toHaveBeenCalledTimes(1);
            expect(wrapper.vm.getSearchedValue()).toEqual({ keyword: "原条件" });
            finish({ rows: [], total: 0 });
            await flushPromises();
            wrapper.findComponent({ name: "SearchForm" }).vm.$emit("search", { keyword: "新条件" });
            await flushPromises();
            expect(query).toHaveBeenLastCalledWith({ keyword: "新条件", pageNo: 1, pageSize: 20 });
            expect(wrapper.vm.getSearchedValue()).toEqual({ keyword: "新条件" });
        });

        test("初始化加载期间正确渲染页面", () => {
            const wrapper = createWrapper({ isLoadingForInit: true });
            expect(wrapper.classes()).toContain("cms-search-page");
            expect(wrapper.findComponent({ name: "SearchForm" }).exists()).toBe(true);
            expect(wrapper.findComponent({ name: "ActionBar" }).exists()).toBe(true);
            expect(wrapper.findComponent({ name: "DataTable" }).exists()).toBe(true);
        });

        test("未提供区域配置时不渲染对应组件", () => {
            const emptyWrapper = createWrapper({
                searchFormProps: null,
                actionBarProps: null,
                dataTableProps: null
            });
            expect(emptyWrapper.findComponent({ name: "SearchForm" }).exists()).toBe(false);
            expect(emptyWrapper.findComponent({ name: "ActionBar" }).exists()).toBe(false);
            expect(emptyWrapper.findComponent({ name: "DataTable" }).exists()).toBe(false);
        });

        test("仅配置查询区时只渲染查询表单", () => {
            const wrapper = createWrapper({ actionBarProps: null, dataTableProps: null });
            expect(wrapper.findComponent({ name: "SearchForm" }).exists()).toBe(true);
            expect(wrapper.findComponent({ name: "ActionBar" }).exists()).toBe(false);
            expect(wrapper.findComponent({ name: "DataTable" }).exists()).toBe(false);
        });
    });

    describe("查询表单联动", async () => {
        test("转发查询字段值变化事件", async () => {
            const wrapper = createWrapper();
            const field = mockSearchFormProps.fields[0];
            await wrapper.findComponent({ name: "SearchForm" }).vm.$emit("change", field, mockSearchFormProps.fields);
            expect(wrapper.emitted("searchValueChange")).toBeTruthy();
            expect(wrapper.emitted("searchValueChange")?.[0]).toEqual([field, mockSearchFormProps.fields]);
        });

        test("转发查询字段列表变化事件", async () => {
            const wrapper = createWrapper();
            expect(wrapper.emitted("searchFieldsChange")).toBeTruthy();
            expect(wrapper.emitted("searchFieldsChange")?.[0]).toMatchObject([mockSearchFormProps.fields]);
        });

        test("提交查询条件后触发表格查询", async () => {
            const wrapper = createWrapper();
            await nextTick();
            const searchValue = { name: "test", status: 1 };
            await wrapper.findComponent({ name: "SearchForm" }).vm.$emit("search", searchValue);
            expect((wrapper.vm as any).searchFormValue).toEqual(searchValue);
            expect(mockDataTableProps.query).toHaveBeenCalled();
        });
    });

    describe("数据表格联动", () => {
        test("同步数据表格的查询加载状态", async () => {
            const wrapper = createWrapper();
            await wrapper.findComponent({ name: "DataTable" }).vm.$emit("search", true);
            expect((wrapper.vm as any).isSearchLoading).toBe(true);
        });

        test("同步选中行并传递给操作栏", async () => {
            const wrapper = createWrapper();
            await wrapper.findComponent({ name: "DataTable" }).vm.$emit("update:selectRows", mockData);
            expect((wrapper.vm as any).selectRows).toEqual(mockData);
            await nextTick();
            expect(wrapper.emitted("selectRowsChange")).toBeTruthy();
            expect(wrapper.emitted("selectRowsChange")?.[0]).toEqual([mockData]);
            expect(wrapper.findComponent({ name: "ActionBar" }).props("selectRows")).toEqual(mockData);
        });
    });

    describe("公开实例方法", () => {
        test("调用查询方法时触发表格查询", async () => {
            const wrapper = createWrapper();
            await wrapper.vm.query();
            expect(mockDataTableProps.query).toHaveBeenCalled();
        });

        test("表格实例不存在时查询返回未定义值", async () => {
            const wrapper = createWrapper({ dataTableProps: null });
            const result = await wrapper.vm.query();
            expect(result).toBeUndefined();
        });

        test("获取当前实时查询条件", () => {
            const wrapper = createWrapper();
            wrapper.findComponent({ name: "SearchForm" }).vm.formFields[2].value = "2024-01-01";
            const searchValue = wrapper.vm.getSearchingValue();

            expect(searchValue).toMatchObject({ name: "admin", status: 1, date: "2024-01-01" });
        });

        test("查询表单不存在时返回空条件", () => {
            const wrapper = createWrapper({ searchFormProps: null });
            expect(wrapper.vm.getSearchingValue()).toEqual({});
        });

        test("获取最近一次提交的筛选条件", async () => {
            const wrapper = createWrapper();
            await flushPromises();
            expect(wrapper.vm.getSearchedValue()).toMatchObject({ name: "admin", status: 1, date: "" });
            wrapper.findComponent({ name: "SearchForm" }).vm.formFields[2].value = "2024-01-01";
            expect(wrapper.vm.getSearchedValue()).toMatchObject({ name: "admin", status: 1, date: "" });
            await wrapper.vm.query();
            await flushPromises();
            await nextTick();
            expect(wrapper.vm.getSearchedValue()).toMatchObject({ name: "admin", status: 1, date: "2024-01-01" });
        });

        test("通过页面实例修改查询字段配置", async () => {
            const wrapper = createWrapper();
            const changeFormFieldsCallback = vi.fn();
            wrapper.vm.changeFormFields(changeFormFieldsCallback);
            expect(changeFormFieldsCallback).toHaveBeenCalled();
            expect(changeFormFieldsCallback).toHaveBeenCalledWith(wrapper.findComponent({ name: "SearchForm" }).vm.formFields);
        });

        test("通过页面实例修改操作栏按钮", async () => {
            const wrapper = createWrapper();
            const changeButtonsCallback = vi.fn();
            await wrapper.vm.changeButtons(changeButtonsCallback);
            expect(changeButtonsCallback).toHaveBeenCalled();
            expect(changeButtonsCallback).toHaveBeenCalledWith(wrapper.findComponent({ name: "ActionBar" }).vm.actionButtons);
        });

        test("通过页面实例修改表格列显隐", async () => {
            const wrapper = createWrapper();
            const columnKeys = ["id", "name"];
            await wrapper.vm.updateTableColumnsShowStatus(columnKeys);
            expect((wrapper.findComponent({ name: "DataTable" }).vm as any).columnList[3].isShow).toBe(false);
        });
    });

    describe("插槽", () => {
        test("向查询表单分发对应插槽", async () => {
            const wrapper = mount(SearchPage, {
                props: {
                    searchFormProps: mockSearchFormProps,
                    actionBarProps: mockActionBarProps,
                    dataTableProps: mockDataTableProps
                },
                slots: {
                    // eslint-disable-next-line camelcase
                    searchForm_custom: '<div class="search-form-slot">Custom Search Form Content</div>',
                    default: "",
                    // eslint-disable-next-line camelcase
                    actionBar_default: ""
                },
                global: {
                    plugins: [ElLoading]
                }
            });
            await nextTick();
            expect(wrapper.findComponent({ name: "SearchForm" }).vm.$slots.searchForm_custom).toBeTruthy();
        });

        test("向操作栏分发对应插槽", async () => {
            const wrapper = mount(SearchPage, {
                props: {
                    searchFormProps: mockSearchFormProps,
                    actionBarProps: mockActionBarProps,
                    dataTableProps: mockDataTableProps
                },
                slots: {
                    // eslint-disable-next-line camelcase
                    actionBar_custom: '<div class="action-bar-slot">Custom Action Bar Content</div>',
                    default: "",
                    // eslint-disable-next-line camelcase
                    actionBar_default: ""
                },
                global: {
                    plugins: [ElLoading]
                }
            });
            await nextTick();
            expect(wrapper.findComponent({ name: "ActionBar" }).vm.$slots.actionBar_custom).toBeTruthy();
        });

        test("向数据表格分发对应插槽", () => {
            const wrapper = mount(SearchPage, {
                props: {
                    searchFormProps: mockSearchFormProps,
                    actionBarProps: mockActionBarProps,
                    dataTableProps: mockDataTableProps
                },
                slots: {
                    // eslint-disable-next-line camelcase
                    dataTable_custom: '<div class="data-table-slot">Custom Data Table Content</div>',
                    default: "",
                    // eslint-disable-next-line camelcase
                    actionBar_default: ""
                },
                global: {
                    plugins: [ElLoading]
                }
            });
            expect(wrapper.findComponent({ name: "DataTable" }).vm.$slots.dataTable_custom).toBeTruthy();
        });
    });

    describe("状态监听", () => {
        test("初始化加载结束后触发查询", async () => {
            const wrapper = createWrapper({ isLoadingForInit: true });
            await wrapper.setProps({ isLoadingForInit: false });
            await nextTick();
            expect(mockDataTableProps.query).toHaveBeenCalled();
        });
    });

    describe("筛选条件合并", () => {
        test("合并固定筛选条件与查询表单值", async () => {
            const wrapper = createWrapper({
                dataTableProps: {
                    ...mockDataTableProps,
                    filters: { extraFilter: "value" }
                }
            });
            await nextTick();
            const searchedValue = wrapper.vm.getSearchedValue();
            expect(searchedValue).toHaveProperty("extraFilter", "value");
        });
    });
});
