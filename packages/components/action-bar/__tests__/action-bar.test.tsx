import { type MockedFunction, describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { ElButton } from "element-plus";
import { type ActionButton } from "../src/action-bar";
import ActionBar from "../src/action-bar.vue";

describe("ActionBar", () => {
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
            icon: "Edit", // component icon
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

    it("renders properly with default props", () => {
        const wrapper = createWrapper();
        expect(wrapper.find(".cms-action-bar-panel").exists()).toBe(true);
        expect(wrapper.find(".buttons-panel").exists()).toBe(true);
        expect(wrapper.findAllComponents(ElButton)).toHaveLength(mockButtons.length);
    });

    it("aligns buttons correctly", async () => {
        const wrapper = createWrapper({ align: "right" });
        expect(wrapper.find(".buttons-panel").attributes("style")).toContain("text-align: right");

        await wrapper.setProps({ align: "center" });
        expect(wrapper.find(".buttons-panel").attributes("style")).toContain("text-align: center");
    });

    it("renders string icons correctly", () => {
        const wrapper = createWrapper();
        const buttonWithStringIcon = wrapper.findAll(".el-button")[1];
        expect(buttonWithStringIcon.find("i.el-icon-edit").exists()).toBe(true);
    });

    it("renders component icons correctly", () => {
        const wrapper = createWrapper();
        const buttonWithComponentIcon = wrapper.findAll(".el-button")[2];
        expect(buttonWithComponentIcon.find(".el-icon").exists()).toBe(true);
    });

    it("handles button clicks correctly", async () => {
        const wrapper = createWrapper();
        const buttons = wrapper.findAll(".el-button");

        await buttons[0].trigger("click");
        expect(mockButtons[0].click).toBeCalled();
    });

    it("prevents multiple clicks while loading", async () => {
        const wrapper = createWrapper();
        const button = wrapper.findAll(".el-button")[0];

        // Simulate a long-running click handler
        (mockButtons[0].click as MockedFunction<any>).mockImplementation(async () => {
            await new Promise(resolve => setTimeout(resolve, 100));
        });

        // Click multiple times rapidly
        await button.trigger("click");
        await button.trigger("click");
        await button.trigger("click");

        // Should only be called once
        expect(mockButtons[0].click).toHaveBeenCalledTimes(1);
    });

    it("handles click errors gracefully", async () => {
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

    it("renders slot content when provided", () => {
        const wrapper = mount(() => (
            <ActionBar align={"left"} buttons={mockButtons}>
                <div class="custom-slot">Custom Content</div>
            </ActionBar>
        ));
        expect(wrapper.find(".custom-slot").text()).toBe("Custom Content");
        expect(wrapper.find(".custom-slot").element.previousElementSibling?.className).contains("buttons-panel");
    });

    it("updates buttons when props change", async () => {
        const wrapper = createWrapper();
        const newButtons = [{ contents: "New Button", handleCode: "new", click: vi.fn() }];

        await wrapper.setProps({ buttons: newButtons });
        expect(wrapper.findAllComponents(ElButton)).toHaveLength(1);
        expect(wrapper.find(".el-button").text()).toContain("New Button");
    });

    it("exposes changeButtons method", async () => {
        const wrapper = createWrapper();
        const callback = vi.fn(buttons => {
            buttons[0].disabled = true;
        });

        wrapper.vm.changeButtons(callback);

        expect(callback).toHaveBeenCalled();
        expect((wrapper.vm as any).actionButtons[0].disabled).toBe(true);
    });
});
