import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import SearchField from "../src/search-field.vue";

describe("SearchField", () => {
    const createWrapper = (props = {}) => {
        return mount(SearchField, {
            props
        });
    };

    it("renders slot when slot prop is true", () => {
        const wrapper = mount(() => (
            <SearchField slot>
                <span>hello word!</span>
            </SearchField>
        ));
        expect(wrapper.text()).toBe("hello word!");
    });

    describe("Input type", () => {
        it("renders el-input correctly", () => {
            const wrapper = createWrapper({
                modelValue: "test value"
            });
            expect(wrapper.findComponent({ name: "ElInput" }).exists()).toBe(true);
            expect(wrapper.findComponent({ name: "ElInput" }).props("modelValue")).toBe("test value");
        });

        it("trims input value on change", async () => {
            const wrapper = createWrapper({ type: "input" });
            await wrapper.findComponent({ name: "ElInput" }).vm.$emit("update:modelValue", " test ");

            expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["test"]);
            expect(wrapper.emitted("change")?.[0]).toEqual(["test"]);
        });
    });

    describe("InputNumber type", () => {
        it("renders el-input-number correctly", () => {
            const wrapper = createWrapper({
                type: "inputNumber",
                modelValue: 42
            });
            expect(wrapper.findComponent({ name: "ElInputNumber" }).exists()).toBe(true);
            expect(wrapper.findComponent({ name: "ElInputNumber" }).props("modelValue")).toBe(42);
        });

        it("emits correct value on change", async () => {
            const wrapper = createWrapper({ type: "inputNumber" });
            await wrapper.findComponent({ name: "ElInputNumber" }).vm.$emit("update:modelValue", 42);

            expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([42]);
            expect(wrapper.emitted("change")?.[0]).toEqual([42]);
        });
    });

    describe("Select type", () => {
        const mockData = [
            { label: "Option 1", value: "1" },
            { label: "Option 2", value: "2", disabled: true }
        ];

        it("renders el-select with options correctly", () => {
            const wrapper = createWrapper({
                type: "select",
                data: mockData,
                optionLabelKey: "label",
                optionValueKey: "value"
            });

            expect(wrapper.findComponent({ name: "ElSelect" }).exists()).toBe(true);
            const options = wrapper.findAllComponents({ name: "ElOption" });
            expect(options).toHaveLength(2);
            expect(options[1].props("disabled")).toBe(true);
        });

        it("emits selected value", async () => {
            const wrapper = createWrapper({
                type: "select",
                data: mockData
            });

            await wrapper.findComponent({ name: "ElSelect" }).vm.$emit("update:modelValue", "1");

            expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["1"]);
            expect(wrapper.emitted("change")?.[0]).toEqual(["1"]);
        });
    });

    describe("CheckSelect type", () => {
        const mockData = [
            { label: "Check 1", value: "1" },
            { label: "Check 2", value: "2" }
        ];

        it("renders check-select correctly", () => {
            const wrapper = createWrapper({
                type: "checkSelect",
                data: mockData
            });
            expect(wrapper.findComponent({ name: "CheckSelect" }).exists()).toBe(true);
            expect(wrapper.findComponent({ name: "CheckSelect" }).props("data")).toEqual(mockData);
        });

        it("emits selected values", async () => {
            const wrapper = createWrapper({
                type: "checkSelect",
                data: mockData
            });

            await wrapper.findComponent({ name: "CheckSelect" }).vm.$emit("update:modelValue", ["1", "2"]);

            expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([["1", "2"]]);
            expect(wrapper.emitted("change")?.[0]).toEqual([["1", "2"]]);
        });
    });

    describe("DatePicker type", () => {
        it("renders el-date-picker correctly", () => {
            const wrapper = createWrapper({
                type: "datePicker"
            });
            expect(wrapper.findComponent({ name: "ElDatePicker" }).exists()).toBe(true);
        });

        it("emits selected date", async () => {
            const wrapper = createWrapper({
                type: "datePicker"
            });
            const date = new Date("2024-01-01");

            await wrapper.findComponent({ name: "ElDatePicker" }).vm.$emit("update:modelValue", date);

            expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([date]);
            expect(wrapper.emitted("change")?.[0]).toEqual([date]);
        });
    });

    it("passes through custom props", () => {
        const customProps = {
            placeholder: "Custom placeholder",
            clearable: true
        };

        const wrapper = createWrapper({
            type: "input",
            props: customProps
        });
        const input = wrapper.findComponent({ name: "el-input" });
        expect(input.props("clearable")).toEqual(true);
        expect(input.props("placeholder")).toEqual("Custom placeholder");
    });

    it("handles custom events", async () => {
        const onFocus = vi.fn();
        const wrapper = createWrapper({
            type: "input",
            events: {
                focus: onFocus
            }
        });

        await wrapper.find("input").trigger("focus");
        expect(onFocus).toHaveBeenCalled();
    });
});
