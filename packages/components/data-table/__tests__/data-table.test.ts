import { describe, test, expect, vi, afterEach } from "vitest";
import { h, nextTick } from "vue";
import { mount, flushPromises, enableAutoUnmount } from "@vue/test-utils";
import { ElLoading } from "element-plus";
import { type DataTableColumn } from "../src/data-table";
import DataTable from "../src/data-table.vue";

enableAutoUnmount(afterEach);
afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
});

describe("数据表格组件", () => {
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
                    return Promise.resolve((props as any).isShowPagination === false ? mockData : { rows: mockData, total: 100 });
                }),
                ...props
            },
            global: {
                plugins: [ElLoading]
            }
        });
    };

    test("请求未结束时不切换页码或每页条数", async () => {
        let finish!: (value: any) => void;
        const query = vi.fn(() => new Promise(resolve => (finish = resolve)));
        const wrapper = createWrapper({ query });
        await flushPromises();
        const pagination = wrapper.findComponent({ name: "ElPagination" });
        pagination.vm.$emit("current-change", 2);
        pagination.vm.$emit("size-change", 50);
        await nextTick();
        expect(pagination.props("currentPage")).toBe(1);
        expect(pagination.props("pageSize")).toBe(20);
        expect(query).toHaveBeenCalledTimes(1);
        finish({ rows: [{ id: 1 }], total: 1 });
        await flushPromises();
        expect(wrapper.findComponent({ name: "ElTable" }).props("data")).toEqual([{ id: 1 }]);
    });

    test("查询失败后释放加载状态并允许重新查询", async () => {
        vi.spyOn(console, "error").mockImplementation(() => {});
        const query = vi
            .fn()
            .mockRejectedValueOnce(new Error("网络错误"))
            .mockResolvedValueOnce({ rows: [{ id: 2 }], total: 1 });
        const wrapper = createWrapper({ query });
        await flushPromises();
        expect(wrapper.emitted("search")).toEqual([[true], [false]]);
        await wrapper.vm.queryDataList();
        expect(query).toHaveBeenCalledTimes(2);
        expect(wrapper.findComponent({ name: "ElTable" }).props("data")).toEqual([{ id: 2 }]);
        expect(wrapper.emitted("search")).toEqual([[true], [false], [true], [false]]);
    });

    test("参数加工异常后不发送请求且释放加载状态", async () => {
        vi.spyOn(console, "error").mockImplementation(() => {});
        const query = vi.fn();
        const wrapper = createWrapper({
            query,
            queryParametersProcess: () => {
                throw new Error("参数错误");
            }
        });
        await flushPromises();
        expect(query).not.toHaveBeenCalled();
        expect(wrapper.emitted("search")).toEqual([[true], [false]]);
    });

    test("无分页查询直接接收数组且不注入分页参数", async () => {
        const query = vi.fn().mockResolvedValue([{ id: 3 }]);
        const wrapper = createWrapper({ query, isShowPagination: false, filters: { status: 0 } });
        await flushPromises();
        expect(query).toHaveBeenCalledExactlyOnceWith({ status: 0 });
        expect(wrapper.findComponent({ name: "ElTable" }).props("data")).toEqual([{ id: 3 }]);
    });

    test("日期数组列透传展示分隔符", async () => {
        const wrapper = createWrapper({ columns: [{ prop: "dates", type: "date", separator: " 至 " }], query: () => ({ rows: [{ dates: ["2024-01-01", "2024-01-02"] }], total: 1 }) });
        await flushPromises();
        expect(wrapper.get(".el-table__body .cms-table-column-date").text()).toBe("2024-01-01 至 2024-01-02");
    });

    test("隐藏与恢复列不改变无 prop 的选择列", async () => {
        const wrapper = createWrapper({ columns: [{ type: "selection" }, { prop: "id" }, { prop: "name" }] });
        wrapper.vm.updateTableColumnsShowStatus([]);
        await nextTick();
        expect(wrapper.findAllComponents({ name: "ElTableColumn" })).toHaveLength(1);
        wrapper.vm.updateTableColumnsShowStatus();
        await nextTick();
        expect(wrapper.findAllComponents({ name: "ElTableColumn" })).toHaveLength(3);
    });

    describe("基础渲染", () => {
        test("按照配置渲染表格列", async () => {
            const wrapper = createWrapper();
            await flushPromises();
            expect(wrapper.props("query")).toHaveBeenCalled();
            expect(wrapper.findAllComponents({ name: "ElTableColumn" })).toHaveLength(mockColumns.length);
            expect(wrapper.findComponent({ name: "ElTable" }).exists()).toBe(true);
            expect(wrapper.findComponent({ name: "TableColumnAction" }).exists()).toBe(true);
            expect(wrapper.findComponent({ name: "TableColumnDate" }).exists()).toBe(true);
            expect(wrapper.findComponent({ name: "TableColumnEnum" }).exists()).toBe(true);
            expect(wrapper.findComponent({ name: "TableColumnImage" }).exists()).toBe(true);
            expect(wrapper.findComponent({ name: "TableColumnNumber" }).exists()).toBe(true);
        });

        test("正确展示查询结果", async () => {
            const wrapper = createWrapper();
            await flushPromises();
            await nextTick();
            expect((wrapper.findComponent({ name: "DataTable" }).vm as any).dataList).toEqual(mockData);
        });

        test("开启分页时显示分页器", () => {
            const wrapper = createWrapper({ isShowPagination: true });
            expect(wrapper.findComponent({ name: "ElPagination" }).exists()).toBe(true);
        });

        test("关闭分页时隐藏分页器", () => {
            const wrapper = createWrapper({ isShowPagination: false });
            expect(wrapper.findComponent({ name: "ElPagination" }).exists()).toBe(false);
        });

        test("查询期间显示加载状态", async () => {
            const wrapper = createWrapper({ query: () => new Promise(() => {}) });
            await flushPromises();
            await nextTick();
            expect((wrapper.findComponent({ name: "DataTable" }).vm as any).isLoadingForSearch).toBe(true);
        });
    });

    describe("数据列配置", () => {
        test("应用自定义列宽", () => {
            const columnsWithWidth = [{ prop: "id", label: "ID", width: "100px" }];
            const wrapper = createWrapper({ columns: columnsWithWidth });
            const column = wrapper.findComponent({ name: "ElTableColumn" });
            expect(column.props("width")).toBe("100px");
        });

        test("应用固定列配置", () => {
            const columnsWithFixed = [{ prop: "id", label: "ID", fixed: "left" }];
            const wrapper = createWrapper({ columns: columnsWithFixed });
            const column = wrapper.findComponent({ name: "ElTableColumn" });
            expect(column.props("fixed")).toBe("left");
        });

        test("应用自定义列样式类", () => {
            const columnsWithClass = [{ prop: "id", label: "ID", className: "custom-column" }];
            const wrapper = createWrapper({ columns: columnsWithClass });
            const column = wrapper.findComponent({ name: "ElTableColumn" });
            expect(column.props("className")).toBe("custom-column");
        });
    });

    describe("分页操作", () => {
        test("切换页码时使用新页码查询", async () => {
            const wrapper = createWrapper({ isShowPagination: true });
            await flushPromises();
            await wrapper.findComponent({ name: "ElPagination" }).vm.$emit("current-change", 2);
            expect(wrapper.props("query")).toHaveBeenCalledWith({ pageNo: 2, pageSize: 20 });
            // expect(wrapper.emitted("page-change")).toBeTruthy();
            // expect(wrapper.emitted("page-change")?.[0]).toEqual([2]);
        });

        test("修改每页条数后从第一页查询", async () => {
            const wrapper = createWrapper({ isShowPagination: true });
            await wrapper.findComponent({ name: "ElPagination" }).vm.$emit("size-change", 50);
            expect(wrapper.props("query")).toHaveBeenCalledWith({ pageNo: 1, pageSize: 50 });
            // expect(wrapper.emitted("size-change")).toBeTruthy();
            // expect(wrapper.emitted("size-change")?.[0]).toEqual([50]);
        });

        test("使用配置的每页条数查询", async () => {
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

    describe("行选择操作", () => {
        test("行选择变化时同步选中数据", async () => {
            const wrapper = createWrapper({ columns: [{ type: "selection", label: "选择", width: 50 }, ...mockColumns] });
            await flushPromises();
            // 模拟选择行
            await wrapper.findComponent({ name: "ElTable" }).vm.$emit("selection-change", [mockData[0]]);
            expect(wrapper.emitted("update:selectRows")).toBeTruthy();
            expect(wrapper.emitted("update:selectRows")?.[0]).toEqual([[mockData[0]]]);
        });

        test("按照配置渲染选择列", () => {
            const wrapper = createWrapper({ columns: [{ type: "selection", label: "选择", width: 50 }, ...mockColumns] });
            const columns = wrapper.findAllComponents({ name: "ElTableColumn" });
            expect(columns[0].props("type")).toBe("selection");
        });
    });

    describe("空数据状态", () => {
        test("使用自定义空数据提示", () => {
            const wrapper = createWrapper({
                query: vi.fn(() => ({ total: 0, rows: [] })),
                props: {
                    emptyText: "No Data Available"
                }
            });
            expect(wrapper.findComponent({ name: "ElTable" }).props("emptyText")).toBe("No Data Available");
        });
    });

    describe("公开实例方法", () => {
        test("暴露并执行表格最大高度计算方法", async () => {
            const wrapper = createWrapper();
            expect(typeof wrapper.vm.initTableMaxHeight).toBe("function");
            await wrapper.vm.initTableMaxHeight();
            await nextTick();
            expect(wrapper.findComponent({ name: "ElTable" }).props("maxHeight")).toBe(100);
        });

        test("暴露并执行数据查询方法", async () => {
            const wrapper = createWrapper();
            expect(typeof wrapper.vm.queryDataList).toBe("function");
            wrapper.vm.queryDataList();
            await flushPromises();
            expect(wrapper.props("query")).toHaveBeenCalledWith({ pageNo: 1, pageSize: 20 });
        });

        test("通过公开方法控制列显隐", async () => {
            const wrapper = createWrapper();
            expect(typeof wrapper.vm.updateTableColumnsShowStatus).toBe("function");
            wrapper.vm.updateTableColumnsShowStatus(["id", "name", "status"]);
            await nextTick();
            const columns = wrapper.findAllComponents({ name: "ElTableColumn" });
            expect(columns).toHaveLength(4);
        });
    });

    describe("查询数据加工", () => {
        test("请求前加工查询参数", async () => {
            const processFn = vi.fn(params => ({ ...params, extra: "test" }));
            const wrapper = createWrapper({ queryParametersProcess: processFn });
            await flushPromises();
            expect(processFn).toHaveBeenCalled();
            const queryMock = wrapper.props("query") as ReturnType<typeof vi.fn>;
            const lastCall = queryMock.mock.calls[queryMock.mock.calls.length - 1];
            expect(lastCall[0]).toHaveProperty("extra", "test");
        });

        test("请求后加工响应结果", async () => {
            const processFn = vi.fn(result => result);
            createWrapper({
                queryResponseProcess: processFn,
                // 使用同步返回值避免 isLoadingForSearch 锁问题
                query: vi.fn(() => ({ rows: mockData, total: 100 }))
            });
            await flushPromises();
            await nextTick();
            expect(processFn).toHaveBeenCalled();
        });
    });

    describe("多字段数据列", () => {
        test("读取逗号分隔的多个字段并展示日期区间", async () => {
            const multiPropColumns: DataTableColumn<any>[] = [{ prop: "start,end", type: "date", label: "日期区间" }];
            const multiPropData = [{ start: "2024-01-01", end: "2024-01-02" }];
            const wrapper = mount(DataTable, {
                props: {
                    columns: multiPropColumns,
                    query: vi.fn(() => Promise.resolve({ rows: multiPropData, total: 1 })),
                    isShowPagination: true
                },
                global: { plugins: [ElLoading] }
            });
            await flushPromises();
            await nextTick();
            expect(wrapper.get(".el-table__body .cms-table-column-date").text()).toBe("2024-01-01 ~ 2024-01-02");
        });
    });

    describe("数据列插槽", () => {
        test("单元格插槽收到当前行并替代默认内容", async () => {
            const slotColumns: DataTableColumn<any>[] = [{ prop: "id", label: "ID", slot: "idSlot" }];
            const wrapper = mount(DataTable, {
                props: {
                    columns: slotColumns,
                    query: vi.fn(() => ({ rows: [{ id: 42 }], total: 1 }))
                },
                slots: { idSlot: ({ row }: any) => h("span", { class: "custom-cell" }, "编号:" + row.id) },
                global: { plugins: [ElLoading] }
            });
            await flushPromises();
            expect(wrapper.get(".el-table__body .custom-cell").text()).toBe("编号:42");
        });

        test("表头插槽替代列默认标题", async () => {
            const slotHeaderColumns: DataTableColumn<any>[] = [{ prop: "id", label: "ID", slotHeader: "idHeaderSlot" }];
            const wrapper = mount(DataTable, {
                props: {
                    columns: slotHeaderColumns,
                    query: vi.fn(() => ({ rows: [], total: 0 }))
                },
                slots: { idHeaderSlot: () => h("span", { class: "custom-header" }, "自定义编号") },
                global: { plugins: [ElLoading] }
            });
            await flushPromises();
            expect(wrapper.get(".el-table__header .custom-header").text()).toBe("自定义编号");
        });
    });
});
