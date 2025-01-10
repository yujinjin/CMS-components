import { describe, test, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import TableColumnAction from "../src/table-column-action.vue";

describe("TableColumnAction", () => {
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

    test("renders visible buttons correctly", () => {
        const wrapper = createWrapper();
        const visibleButtons = wrapper.findAllComponents({ name: "ElButton" });
        expect(visibleButtons).toHaveLength(3); // maxNumShow is 3
    });

    test("renders dropdown for overflow buttons", () => {
        const wrapper = createWrapper();
        expect(wrapper.findComponent({ name: "ElDropdown" }).exists()).toBe(true);
        const dropdownItems = wrapper.findAllComponents({ name: "ElDropdownItem" });
        expect(dropdownItems).toHaveLength(1); // 4th button should be in dropdown
    });

    test("applies default button props", () => {
        const wrapper = createWrapper();
        const button = wrapper.findComponent({ name: "ElButton" });
        expect(button.props()).toMatchObject({
            loading: false,
            link: true,
            type: "primary"
        });
    });

    test("handles button click correctly", async () => {
        const wrapper = createWrapper();
        const button = wrapper.findAllComponents({ name: "ElButton" })[0];

        await button.trigger("click");
        expect(mockButtons[0].click).toHaveBeenCalledWith({}, expect.any(Object));
    });

    test("prevents multiple clicks while loading", async () => {
        const wrapper = createWrapper();
        const button = wrapper.findAllComponents({ name: "ElButton" })[0];

        // Simulate a long-running click handler
        mockButtons[0].click.mockImplementation(async () => {
            await new Promise(resolve => setTimeout(resolve, 100));
        });

        await button.trigger("click");
        await button.trigger("click");
        await button.trigger("click");

        expect(mockButtons[0].click).toHaveBeenCalledTimes(1);
    });

    test("handles dropdown command correctly", async () => {
        const wrapper = createWrapper();
        await wrapper.findComponent({ name: "ElDropdown" }).vm.$emit("command", 0);
        expect(mockButtons[3].click).toHaveBeenCalled(); // 4th button (index 3)
    });

    test("respects display function for buttons", () => {
        const buttonsWithDisplay = [
            {
                contents: "Conditional",
                handleCode: "conditional",
                display: row => row.showButton
            }
        ];

        // Button should not show
        const wrapper1 = createWrapper({
            buttons: buttonsWithDisplay,
            row: { showButton: false }
        });
        expect(wrapper1.findComponent({ name: "ElButton" }).exists()).toBe(false);

        // Button should show
        const wrapper2 = createWrapper({
            buttons: buttonsWithDisplay,
            row: { showButton: true }
        });
        expect(wrapper2.findComponent({ name: "ElButton" }).exists()).toBe(true);
    });

    test("handles error in button click", async () => {
        const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
        const error = new Error("Test error");
        mockButtons[0].click.mockRejectedValue(error);

        const wrapper = createWrapper();
        const button = wrapper.findAllComponents({ name: "ElButton" })[0];

        await button.trigger("click");

        expect(consoleError).toHaveBeenCalledWith(error);
        consoleError.mockRestore();
    });

    test("updates buttons when props change", async () => {
        const wrapper = createWrapper();
        const newButtons = [{ contents: "New Button", handleCode: "new", click: vi.fn() }];

        await wrapper.setProps({ buttons: newButtons });
        expect(wrapper.findAllComponents({ name: "ElButton" })).toHaveLength(1);
        expect(wrapper.findComponent({ name: "ElButton" }).text()).toBe("New Button");
    });

    test("respects maxNumShow prop", async () => {
        const wrapper = createWrapper({ maxNumShow: 2 });
        expect(wrapper.findAllComponents({ name: "ElButton" })).toHaveLength(2);
        expect(wrapper.findAllComponents({ name: "ElDropdownItem" })).toHaveLength(2);
    });

    test("handles loading state correctly", async () => {
        const wrapper = createWrapper();
        const button = wrapper.findAllComponents({ name: "ElButton" })[0];
        vi.useFakeTimers();
        // Simulate loading state
        mockButtons[0].click.mockImplementation(() => new Promise(resolve => setTimeout(() => resolve(1), 50)));
        await button.trigger("click");
        expect((wrapper.vm as any).actionButtons[0].loading).toBe(true);
        vi.runAllTimers();
        await nextTick();
        expect((wrapper.vm as any).actionButtons[0].loading).toBe(false);
    });
});
