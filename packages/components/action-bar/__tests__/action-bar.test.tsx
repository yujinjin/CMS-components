import { type MockedFunction, describe, it, expect, vi, afterEach } from "vitest";
import { mount, enableAutoUnmount } from "@vue/test-utils";
import { ElButton } from "element-plus";
import { type ActionButton } from "../src/action-bar";
import ActionBar from "../src/action-bar.vue";

enableAutoUnmount(afterEach);
afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
});

describe("列表操作栏组件", () => {
    const mockButtons: ActionButton[] = [
        {
            contents: "Button 1",
            handleCode: "btn1",
            type: "primary",
            click: vi.fn()
        },
        {
            contents: "Button 2",
            handleCode: "btn2",
            customIcon: "el-icon-edit",
            click: vi.fn()
        },
        {
            contents: "Button 3",
            handleCode: "btn3",
            icon: "Edit", // 组件图标
            click: vi.fn()
        }
    ];

    const createWrapper = (props = {}) => {
        return mount(ActionBar, {
            props: {
                buttons: mockButtons,
                selectRows: [],
                align: "left",
                ...props
            }
        });
    };

    it("异步操作只锁定当前按钮并传入选择行副本配置", async () => {
        let finish!: () => void;
        const click = vi.fn((_rows: Record<string, any>[], _button: ActionButton) => new Promise<void>(resolve => (finish = resolve)));
        const otherClick = vi.fn();
        const buttons = [
            { contents: "保存", click },
            { contents: "查看", click: otherClick }
        ];
        const rows = [{ id: 7 }];
        const wrapper = createWrapper({ buttons, selectRows: rows });
        const controls = wrapper.findAllComponents(ElButton);
        await controls[0].trigger("click");
        await controls[0].trigger("click");
        await controls[1].trigger("click");
        expect(click).toHaveBeenCalledTimes(1);
        expect(click.mock.calls[0]?.[0]).toEqual([{ id: 7 }]);
        expect(click.mock.calls[0]?.[1]).not.toBe(buttons[0]);
        expect(otherClick).toHaveBeenCalledTimes(1);
        expect(buttons[0]).not.toHaveProperty("loading");
        finish();
        await Promise.resolve();
        await controls[0].vm.$nextTick();
        expect(controls[0].props("loading")).toBe(false);
    });

    it("使用默认属性正确渲染", () => {
        const wrapper = createWrapper();
        expect(wrapper.find(".cms-action-bar-panel").exists()).toBe(true);
        expect(wrapper.find(".buttons-panel").exists()).toBe(true);
        expect(wrapper.findAllComponents(ElButton)).toHaveLength(mockButtons.length);
    });

    it("按照配置对齐按钮", async () => {
        const wrapper = createWrapper({ align: "right" });
        expect(wrapper.find(".buttons-panel").attributes("style")).toContain("text-align: right");

        await wrapper.setProps({ align: "center" });
        expect(wrapper.find(".buttons-panel").attributes("style")).toContain("text-align: center");
    });

    it("正确渲染字符串图标", () => {
        const wrapper = createWrapper();
        const buttonWithStringIcon = wrapper.findAll(".el-button")[1];
        expect(buttonWithStringIcon.find("i.el-icon-edit").exists()).toBe(true);
    });

    it("正确渲染组件图标", () => {
        const wrapper = createWrapper();
        const buttonWithComponentIcon = wrapper.findAll(".el-button")[2];
        expect(buttonWithComponentIcon.find(".el-icon").exists()).toBe(true);
    });

    it("点击按钮时执行对应操作", async () => {
        const wrapper = createWrapper();
        const buttons = wrapper.findAll(".el-button");

        await buttons[0].trigger("click");
        expect(mockButtons[0].click).toBeCalled();
    });

    it("加载期间阻止重复点击", async () => {
        const wrapper = createWrapper();
        const button = wrapper.findAll(".el-button")[0];

        // 模拟长时间执行的按钮回调
        (mockButtons[0].click as MockedFunction<any>).mockImplementation(async () => {
            await new Promise(resolve => setTimeout(resolve, 100));
        });

        // 连续快速点击按钮
        await button.trigger("click");
        await button.trigger("click");
        await button.trigger("click");

        // 回调应仅执行一次
        expect(mockButtons[0].click).toHaveBeenCalledTimes(1);
    });

    it("捕获按钮回调异常并恢复状态", async () => {
        const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
        const error = new Error("Test error");
        (mockButtons[0].click as MockedFunction<any>).mockRejectedValue(error);

        const wrapper = createWrapper();
        const button = wrapper.findAll(".el-button")[0];

        await button.trigger("click");

        expect(consoleError).toHaveBeenCalledWith(error);
        expect((wrapper.vm as any).actionButtons[0].loading).toBe(false);

        consoleError.mockRestore();
    });

    it("提供插槽时渲染插槽内容", () => {
        const wrapper = mount(() => (
            <ActionBar align={"left"} buttons={mockButtons}>
                <div class="custom-slot">Custom Content</div>
            </ActionBar>
        ));
        expect(wrapper.find(".custom-slot").text()).toBe("Custom Content");
        expect(wrapper.find(".custom-slot").element.previousElementSibling?.className).contains("buttons-panel");
    });

    it("属性变化时更新按钮", async () => {
        const wrapper = createWrapper();
        const newButtons = [{ contents: "New Button", handleCode: "new", click: vi.fn() }];

        await wrapper.setProps({ buttons: newButtons });
        expect(wrapper.findAllComponents(ElButton)).toHaveLength(1);
        expect(wrapper.find(".el-button").text()).toContain("New Button");
    });

    it("暴露修改按钮的方法", async () => {
        const wrapper = createWrapper();
        const callback = vi.fn(buttons => {
            buttons[0].disabled = true;
        });

        wrapper.vm.changeButtons(callback);

        expect(callback).toHaveBeenCalled();
        expect((wrapper.vm as any).actionButtons[0].disabled).toBe(true);
    });

    it("使用自定义插槽渲染按钮", () => {
        const buttonsWithSlot: ActionButton[] = [{ handleCode: "custom", slot: "customSlot", contents: "Custom" }];
        const wrapper = mount(() => (
            <ActionBar buttons={buttonsWithSlot}>
                {{
                    customSlot: ({ button }: { button: ActionButton }) => <span class="custom-slot-btn">{button.handleCode}</span>
                }}
            </ActionBar>
        ));
        expect(wrapper.find(".custom-slot-btn").exists()).toBe(true);
        expect(wrapper.find(".custom-slot-btn").text()).toBe("custom");
    });

    it("内部按钮状态不修改原始配置", () => {
        const originalButton: ActionButton = { contents: "Test", handleCode: "test", click: vi.fn() };
        mount(ActionBar, {
            props: {
                buttons: [originalButton],
                selectRows: [],
                align: "left"
            }
        });
        // 验证原始对象没有被添加 loading 属性
        expect(Object.prototype.hasOwnProperty.call(originalButton, "loading")).toBe(false);
    });

    it("按钮数组为空时不渲染按钮区域", () => {
        const wrapper = createWrapper({ buttons: [] });
        expect(wrapper.find(".buttons-panel").exists()).toBe(false);
    });
});
