import { describe, test, expect, vi } from "vitest";
import { nextTick } from "vue";
import { mount, flushPromises } from "@vue/test-utils";
import { ElLoading } from "element-plus";
import { type DataTableColumn } from "../src/data-table";
import DataTable from "../src/data-table.vue";

describe("DataTable", () => {
    const mockColumns: DataTableColumn<any>[] = [
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
    ];

    const mockData = [
        { id: 1, name: "Item 1", status: 1, createTime: "2024-01-01", orderAmount: 3456.23, goodsImgs: "https://example.com/image1.jpg,https://example.com/image2.jpg" },
        { id: 2, name: "Item 2", status: 0, createTime: "2024-01-02", orderAmount: 1234, goodsImgs: "https://example.com/image1.jpg" }
    ];

    const createWrapper = (props = {}) => {
        return mount(DataTable, {
            props: {
                columns: mockColumns,
                query: vi.fn(() => {
                    return new Promise(resolve => setTimeout(() => resolve((props as any).isShowPagination === false ? mockData : { rows: mockData, total: 100 }), 100));
                }),
                ...props
            },
            global: {
                plugins: [ElLoading]
            }
        });
    };

    describe("Basic Rendering", () => {
        test("renders table with correct columns", async () => {
            vi.useFakeTimers();
            const wrapper = createWrapper();
            vi.runAllTimers();
            await flushPromises();
            expect(wrapper.props("query")).toHaveBeenCalled();
            expect(wrapper.findAllComponents({ name: "ElTableColumn" })).toHaveLength(mockColumns.length);
            expect(wrapper.findComponent({ name: "ElTable" }).exists()).toBe(true);
            expect(wrapper.findComponent({ name: "TableColumnAction" }).exists()).toBe(true);
            expect(wrapper.findComponent({ name: "TableColumnDate" }).exists()).toBe(true);
            expect(wrapper.findComponent({ name: "TableColumnEnum" }).exists()).toBe(true);
            expect(wrapper.findComponent({ name: "TableColumnImgage" }).exists()).toBe(true);
            expect(wrapper.findComponent({ name: "TableColumnNumber" }).exists()).toBe(true);
        });

        test("renders data correctly", async () => {
            vi.useFakeTimers();
            const wrapper = createWrapper();
            await flushPromises();
            vi.runAllTimers();
            await nextTick();
            expect((wrapper.findComponent({ name: "DataTable" }).vm as any).dataList).toEqual(mockData);
        });

        test("renders pagination when showPagination is true", () => {
            const wrapper = createWrapper({ isShowPagination: true });
            expect(wrapper.findComponent({ name: "ElPagination" }).exists()).toBe(true);
        });

        test("hides pagination when showPagination is false", () => {
            const wrapper = createWrapper({ isShowPagination: false });
            expect(wrapper.findComponent({ name: "ElPagination" }).exists()).toBe(false);
        });

        test("shows loading overlay when loading is true", async () => {
            const wrapper = createWrapper();
            await flushPromises();
            await nextTick();
            expect((wrapper.findComponent({ name: "DataTable" }).vm as any).isLoadingForSearch).toBe(true);
        });
    });

    describe("Column Configuration", () => {
        test("applies column width correctly", () => {
            const columnsWithWidth = [{ prop: "id", label: "ID", width: "100px" }];
            const wrapper = createWrapper({ columns: columnsWithWidth });
            const column = wrapper.findComponent({ name: "ElTableColumn" });
            expect(column.props("width")).toBe("100px");
        });

        test("handles fixed columns", () => {
            const columnsWithFixed = [{ prop: "id", label: "ID", fixed: "left" }];
            const wrapper = createWrapper({ columns: columnsWithFixed });
            const column = wrapper.findComponent({ name: "ElTableColumn" });
            expect(column.props("fixed")).toBe("left");
        });

        test("applies custom column class", () => {
            const columnsWithClass = [{ prop: "id", label: "ID", className: "custom-column" }];
            const wrapper = createWrapper({ columns: columnsWithClass });
            const column = wrapper.findComponent({ name: "ElTableColumn" });
            expect(column.props("className")).toBe("custom-column");
        });
    });

    describe("Pagination Functionality", () => {
        test("emits page-change event", async () => {
            const wrapper = createWrapper({ showPagination: true });
            await wrapper.findComponent({ name: "ElPagination" }).vm.$emit("current-change", 2);
            expect(wrapper.props("query")).toHaveBeenCalledWith({ pageNo: 2, pageSize: 20 });
            // expect(wrapper.emitted("page-change")).toBeTruthy();
            // expect(wrapper.emitted("page-change")?.[0]).toEqual([2]);
        });

        test("emits size-change event", async () => {
            const wrapper = createWrapper({ showPagination: true });
            await wrapper.findComponent({ name: "ElPagination" }).vm.$emit("size-change", 50);
            expect(wrapper.props("query")).toHaveBeenCalledWith({ pageNo: 1, pageSize: 50 });
            // expect(wrapper.emitted("size-change")).toBeTruthy();
            // expect(wrapper.emitted("size-change")?.[0]).toEqual([50]);
        });

        test("respects pageSize prop", async () => {
            const wrapper = createWrapper({
                pagination: {
                    pageSize: 10
                }
            });
            await flushPromises();
            await nextTick();
            expect(wrapper.findComponent({ name: "ElPagination" }).props("pageSize")).toBe(10);
            expect(wrapper.props("query")).toHaveBeenCalledWith({ pageNo: 1, pageSize: 10 });
        });
    });

    describe("Selection Functionality", () => {
        test("handles row selection", async () => {
            vi.useFakeTimers();
            const wrapper = createWrapper({ columns: [{ type: "selection", label: "选择", width: 50 }, ...mockColumns] });
            vi.runAllTimers();
            await flushPromises();
            // 模拟选择行
            await wrapper.findComponent({ name: "ElTable" }).vm.$emit("selection-change", [mockData[0]]);
            expect(wrapper.emitted("update:selectRows")).toBeTruthy();
            expect(wrapper.emitted("update:selectRows")?.[0]).toEqual([[mockData[0]]]);
        });

        test("adds selection column when selectable is true", () => {
            const wrapper = createWrapper({ columns: [{ type: "selection", label: "选择", width: 50 }, ...mockColumns] });
            const columns = wrapper.findAllComponents({ name: "ElTableColumn" });
            expect(columns[0].props("type")).toBe("selection");
        });
    });

    describe("Empty State", () => {
        test("shows empty text when no data", () => {
            const wrapper = createWrapper({
                query: vi.fn(() => ({ total: 0, rows: [] })),
                props: {
                    emptyText: "No Data Available"
                }
            });
            expect(wrapper.findComponent({ name: "ElTable" }).props("emptyText")).toBe("No Data Available");
        });
    });

    describe("Exposed Methods", () => {
        test("exposes initTableMaxHeight method", async () => {
            const wrapper = createWrapper();
            expect(typeof wrapper.vm.initTableMaxHeight).toBe("function");
            await wrapper.vm.initTableMaxHeight();
            await nextTick();
            expect(wrapper.findComponent({ name: "ElTable" }).props("maxHeight")).toBe(100);
        });

        test("exposes queryDataList method", async () => {
            vi.useFakeTimers();
            const wrapper = createWrapper();
            expect(typeof wrapper.vm.queryDataList).toBe("function");
            wrapper.vm.queryDataList();
            vi.runAllTimers();
            await flushPromises();
            expect(wrapper.props("query")).toHaveBeenCalledWith({ pageNo: 1, pageSize: 20 });
        });

        test("exposes updateTableColumnsShowStatus method", async () => {
            const wrapper = createWrapper();
            expect(typeof wrapper.vm.updateTableColumnsShowStatus).toBe("function");
            wrapper.vm.updateTableColumnsShowStatus(["id", "name", "status"]);
            await nextTick();
            const columns = wrapper.findAllComponents({ name: "ElTableColumn" });
            expect(columns).toHaveLength(4);
        });
    });
});
