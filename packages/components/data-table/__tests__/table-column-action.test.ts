import { describe, test, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import TableColumnAction from "../src/table-column-action.vue";

describe("表格操作列组件", () => {
    const mockButtons = [
        {
            contents: "Edit",
            handleCode: "edit",
            click: vi.fn()
        },
        {
            contents: "Delete",
            handleCode: "delete",
            click: vi.fn()
        },
        {
            contents: "View",
            handleCode: "view",
            click: vi.fn()
        },
        {
            contents: "Download",
            handleCode: "download",
            click: vi.fn()
        }
    ];

    const createWrapper = (props = {}) => {
        return mount(TableColumnAction, {
            props: {
                buttons: mockButtons,
                row: {},
                maxNumShow: 3,
                ...props
            }
        });
    };

    test("正确渲染直接展示的按钮", () => {
        const wrapper = createWrapper();
        const visibleButtons = wrapper.findAllComponents({ name: "ElButton" });
        expect(visibleButtons).toHaveLength(3); // 直接展示的按钮数量上限为 3
    });

    test("超出展示数量的按钮收起至下拉菜单", () => {
        const wrapper = createWrapper();
        expect(wrapper.findComponent({ name: "ElDropdown" }).exists()).toBe(true);
        const dropdownItems = wrapper.findAllComponents({ name: "ElDropdownItem" });
        expect(dropdownItems).toHaveLength(1); // 第四个按钮应收起到下拉菜单中
    });

    test("应用默认按钮属性", () => {
        const wrapper = createWrapper();
        const button = wrapper.findComponent({ name: "ElButton" });
        expect(button.props()).toMatchObject({
            loading: false,
            link: true,
            type: "primary"
        });
    });

    test("点击按钮时执行对应行操作", async () => {
        const wrapper = createWrapper();
        const button = wrapper.findAllComponents({ name: "ElButton" })[0];

        await button.trigger("click");
        expect(mockButtons[0].click).toHaveBeenCalledWith({}, expect.any(Object));
    });

    test("加载期间阻止重复点击", async () => {
        const wrapper = createWrapper();
        const button = wrapper.findAllComponents({ name: "ElButton" })[0];

        // 模拟长时间执行的按钮回调
        mockButtons[0].click.mockImplementation(async () => {
            await new Promise(resolve => setTimeout(resolve, 100));
        });

        await button.trigger("click");
        await button.trigger("click");
        await button.trigger("click");

        expect(mockButtons[0].click).toHaveBeenCalledTimes(1);
    });

    test("选择下拉菜单项时执行对应操作", async () => {
        const wrapper = createWrapper();
        await wrapper.findComponent({ name: "ElDropdown" }).vm.$emit("command", 0);
        expect(mockButtons[3].click).toHaveBeenCalled(); // 第四个按钮对应索引 3
    });

    test("根据显示回调决定是否生成按钮", () => {
        const buttonsWithDisplay = [
            {
                contents: "Conditional",
                handleCode: "conditional",
                display: (row: any) => row.showButton
            }
        ];

        // 不应展示该按钮
        const wrapper1 = createWrapper({
            buttons: buttonsWithDisplay,
            row: { showButton: false }
        });
        expect(wrapper1.findComponent({ name: "ElButton" }).exists()).toBe(false);

        // 应展示该按钮
        const wrapper2 = createWrapper({
            buttons: buttonsWithDisplay,
            row: { showButton: true }
        });
        expect(wrapper2.findComponent({ name: "ElButton" }).exists()).toBe(true);
    });

    test("捕获行操作按钮的回调异常", async () => {
        const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
        const error = new Error("Test error");
        mockButtons[0].click.mockRejectedValue(error);

        const wrapper = createWrapper();
        const button = wrapper.findAllComponents({ name: "ElButton" })[0];

        await button.trigger("click");

        expect(consoleError).toHaveBeenCalledWith(error);
        consoleError.mockRestore();
    });

    test("属性变化时更新按钮", async () => {
        const wrapper = createWrapper();
        const newButtons = [{ contents: "New Button", handleCode: "new", click: vi.fn() }];

        await wrapper.setProps({ buttons: newButtons });
        expect(wrapper.findAllComponents({ name: "ElButton" })).toHaveLength(1);
        expect(wrapper.findComponent({ name: "ElButton" }).text()).toBe("New Button");
    });

    test("按照配置限制直接展示的按钮数量", async () => {
        const wrapper = createWrapper({ maxNumShow: 2 });
        expect(wrapper.findAllComponents({ name: "ElButton" })).toHaveLength(2);
        expect(wrapper.findAllComponents({ name: "ElDropdownItem" })).toHaveLength(2);
    });

    test("正确处理按钮加载状态", async () => {
        const wrapper = createWrapper();
        const button = wrapper.findAllComponents({ name: "ElButton" })[0];
        vi.useFakeTimers();
        // 模拟按钮加载状态
        mockButtons[0].click.mockImplementation(() => new Promise(resolve => setTimeout(() => resolve(1), 50)));
        await button.trigger("click");
        expect((wrapper.vm as any).actionButtons[0].loading).toBe(true);
        vi.runAllTimers();
        await nextTick();
        expect((wrapper.vm as any).actionButtons[0].loading).toBe(false);
    });

    test("内部按钮状态不修改原始配置", () => {
        const originalButton = { contents: "Test", handleCode: "test", click: vi.fn() };
        mount(TableColumnAction, {
            props: {
                buttons: [originalButton],
                row: {},
                maxNumShow: 3
            }
        });
        // 验证原始对象没有被添加 loading/isShow/link/type 属性
        expect(Object.prototype.hasOwnProperty.call(originalButton, "loading")).toBe(false);
        expect(Object.prototype.hasOwnProperty.call(originalButton, "isShow")).toBe(false);
    });

    test("全部显示回调返回否时不渲染按钮", () => {
        const hiddenButtons = [{ contents: "Hidden", handleCode: "hidden", display: () => false }];
        const wrapper = createWrapper({ buttons: hiddenButtons });
        expect(wrapper.findComponent({ name: "ElButton" }).exists()).toBe(false);
        expect(wrapper.findComponent({ name: "ElDropdown" }).exists()).toBe(false);
    });

    test("按钮数量未超出上限时隐藏下拉菜单", () => {
        const fewButtons = [
            { contents: "Btn1", handleCode: "btn1", click: vi.fn() },
            { contents: "Btn2", handleCode: "btn2", click: vi.fn() }
        ];
        const wrapper = createWrapper({ buttons: fewButtons, maxNumShow: 3 });
        expect(wrapper.findComponent({ name: "ElDropdown" }).exists()).toBe(false);
    });
});
