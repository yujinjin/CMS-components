import { describe, test, expect, vi } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import { nextTick } from "vue";
import { ElLoading } from "element-plus";
import SearchPage from "../src/search-page.vue";
import { type SearchFormProps } from "@yujinjin/cms-components-modules/search-form";
import { type ActionBarProps } from "@yujinjin/cms-components-modules/action-bar";
import { type DataTableProps } from "@yujinjin/cms-components-modules/data-table";

describe("SearchPage", () => {
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
                buttons: [
                    {
                        contents: "Edit",
                        handleCode: "edit",
                        click: vi.fn()
                    }
                ]
            }
        ],
        query: vi.fn().mockResolvedValue({ rows: mockData, total: 100 })
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

    describe("Component Initialization", () => {
        test("initializes with loading state", () => {
            const wrapper = createWrapper({ isLoadingForInit: true });
            expect(wrapper.classes()).toContain("search-page");
            expect(wrapper.findComponent({ name: "SearchForm" }).exists()).toBe(true);
            expect(wrapper.findComponent({ name: "ActionBar" }).exists()).toBe(true);
            expect(wrapper.findComponent({ name: "DataTable" }).exists()).toBe(true);
        });

        test("initializes without components when props are not provided", () => {
            const emptyWrapper = createWrapper({
                searchFormProps: null,
                actionBarProps: null,
                dataTableProps: null
            });
            expect(emptyWrapper.findComponent({ name: "SearchForm" }).exists()).toBe(false);
            expect(emptyWrapper.findComponent({ name: "ActionBar" }).exists()).toBe(false);
            expect(emptyWrapper.findComponent({ name: "DataTable" }).exists()).toBe(false);
        });
    });

    describe("SearchForm Integration", async () => {
        test("handles search form value changes", async () => {
            const wrapper = createWrapper();
            const field = mockSearchFormProps.fields[0];
            await wrapper.findComponent({ name: "SearchForm" }).vm.$emit("change", field, mockSearchFormProps.fields);
            expect(wrapper.emitted("searchValueChange")).toBeTruthy();
            expect(wrapper.emitted("searchValueChange")?.[0]).toEqual([field, mockSearchFormProps.fields]);
        });

        test("handles search form fields changes", async () => {
            const wrapper = createWrapper();
            // await wrapper.findComponent({ name: "SearchForm" }).vm.$emit("fieldsChange");
            expect(wrapper.emitted("searchFieldsChange")).toBeTruthy();
            expect(wrapper.emitted("searchFieldsChange")?.[0]).toMatchObject([mockSearchFormProps.fields]);
        });

        test("handles search action", async () => {
            const wrapper = createWrapper();
            await nextTick();
            const searchValue = { name: "test", status: 1 };
            await wrapper.findComponent({ name: "SearchForm" }).vm.$emit("search", searchValue);
            expect((wrapper.vm as any).searchFormValue).toEqual(searchValue);
            expect(mockDataTableProps.query).toHaveBeenCalled();
        });
    });

    describe("DataTable Integration", () => {
        test("handles data table loading state", async () => {
            const wrapper = createWrapper();
            await wrapper.findComponent({ name: "DataTable" }).vm.$emit("search", true);
            expect((wrapper.vm as any).isSearchLoading).toBe(true);
        });

        test("updates selected rows", async () => {
            const wrapper = createWrapper();
            await wrapper.findComponent({ name: "DataTable" }).vm.$emit("update:selectRows", mockData);
            expect((wrapper.vm as any).selectRows).toEqual(mockData);
            await nextTick();
            expect(wrapper.emitted("selectRowsChange")).toBeTruthy();
            expect(wrapper.emitted("selectRowsChange")?.[0]).toEqual([mockData]);
            expect(wrapper.findComponent({ name: "ActionBar" }).props("selectRows")).toEqual(mockData);
        });
    });

    describe("Exposed Methods", () => {
        test("query method triggers data table query", async () => {
            const wrapper = createWrapper();
            await wrapper.vm.query();
            expect(mockDataTableProps.query).toHaveBeenCalled();
        });

        test("getSearchingValue returns current search values", () => {
            const wrapper = createWrapper();
            wrapper.findComponent({ name: "SearchForm" }).vm.formFields[2].value = "2024-01-01";
            const searchValue = wrapper.vm.getSearchingValue();

            expect(searchValue).toMatchObject({ name: "admin", status: 1, date: "2024-01-01" });
        });

        test("getSearchedValue returns current filters", async () => {
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

        test("changeFormFields updates form fields", async () => {
            const wrapper = createWrapper();
            const changeFormFieldsCallback = vi.fn();
            wrapper.vm.changeFormFields(changeFormFieldsCallback);
            expect(changeFormFieldsCallback).toHaveBeenCalled();
            expect(changeFormFieldsCallback).toHaveBeenCalledWith(wrapper.findComponent({ name: "SearchForm" }).vm.formFields);
        });

        test("changeButtons updates action buttons", async () => {
            const wrapper = createWrapper();
            const changeButtonsCallback = vi.fn();
            await wrapper.vm.changeButtons(changeButtonsCallback);
            expect(changeButtonsCallback).toHaveBeenCalled();
            expect(changeButtonsCallback).toHaveBeenCalledWith(wrapper.findComponent({ name: "ActionBar" }).vm.actionButtons);
        });

        test("updateTableColumnsShowStatus updates table columns", async () => {
            const wrapper = createWrapper();
            const columnKeys = ["id", "name"];
            await wrapper.vm.updateTableColumnsShowStatus(columnKeys);
            expect((wrapper.findComponent({ name: "DataTable" }).vm as any).columnList[3].isShow).toBe(false);
        });
    });

    describe("Slots", () => {
        test("renders search form slots", async () => {
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

        test("renders action bar slots", async () => {
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

        test("renders data table slots", () => {
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

    describe("Watch Effects", () => {
        test("watches isLoadingForInit changes", async () => {
            const wrapper = createWrapper({ isLoadingForInit: true });
            await wrapper.setProps({ isLoadingForInit: false });
            await nextTick();
            expect(mockDataTableProps.query).toHaveBeenCalled();
        });
    });
});
