import { nextTick } from "vue";
import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { mount } from "@vue/test-utils";
import { ElInput, ElInputNumber } from "element-plus";
import InputField from "../src/input-field.vue";

describe("InputField", () => {
    beforeEach(() => {
        // Mock Quill
        vi.mock("quill", () => {
            return {
                default: vi.fn(() => ({
                    on: vi.fn(),
                    getSemanticHTML: vi.fn(() => "<p>test content</p>"),
                    setContents: vi.fn(),
                    clipboard: {
                        convert: vi.fn()
                    },
                    enable: vi.fn(),
                    getSelection: vi.fn(() => ({ range: 0 })),
                    focus: vi.fn(),
                    insertEmbed: vi.fn()
                }))
            };
        });
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    const createWrapper = (props, components = {}) => {
        return mount(InputField, {
            props,
            global: {
                components
            }
        });
    };

    test("renders slot when slot is true", () => {
        const wrapper = mount(() => (
            <InputField slot>
                <span>hello word!</span>
            </InputField>
        ));
        expect(wrapper.text()).toBe("hello word!");
    });

    test("renders label type correctly", () => {
        const wrapper = createWrapper({
            type: "label",
            modelValue: "Label Text"
        });
        expect(wrapper.find(".label-contents").text()).toBe("Label Text");
    });

    test("renders imgUpload type correctly", () => {
        const wrapper = createWrapper({
            type: "imgUpload",
            modelValue: "/static/img/1.jpg",
            props: {
                uploadRequest: vi.fn()
            }
        });
        expect(wrapper.findComponent({ name: "ImgUpload" }).exists()).toBe(true);
        expect(wrapper.findComponent({ name: "ImgUpload" }).props("modelValue")).toEqual("/static/img/1.jpg");
    });

    test("renders webEditor type correctly", () => {
        const wrapper = createWrapper({
            type: "webEditor",
            modelValue: "<span>hello word!</span>"
        });
        expect(wrapper.findComponent({ name: "WebEditor" }).exists()).toBe(true);
        expect(wrapper.findComponent({ name: "WebEditor" }).props("modelValue")).toEqual("<span>hello word!</span>");
    });

    test("renders select type with options correctly", () => {
        const wrapper = createWrapper({
            type: "select",
            data: [
                { label: "Option 1", value: "1" },
                { label: "Option 2", value: "2" }
            ]
        });
        expect(wrapper.findComponent({ name: "ElSelect" }).exists()).toBe(true);
        expect(wrapper.findAllComponents({ name: "ElOption" })).toHaveLength(2);
    });

    test("renders checkSelect type with options correctly", async () => {
        const wrapper = createWrapper({
            type: "checkSelect",
            data: [
                { label: "Option 1", value: "1" },
                { label: "Option 2", value: "2" }
            ]
        });
        expect(wrapper.findComponent({ name: "CheckSelect" }).exists()).toBe(true);
        expect(wrapper.findComponent({ name: "ElSelect" }).exists()).toBe(true);
        await nextTick();
        expect(wrapper.findAllComponents({ name: "ElOption" })).toHaveLength(3);
        expect(wrapper.findAllComponents({ name: "ElCheckbox" }).length).toBe(3);
    });

    test("renders checkbox group correctly", () => {
        const wrapper = createWrapper({
            type: "checkbox",
            data: [
                { label: "Checkbox 1", value: "1" },
                { label: "Checkbox 2", value: "2" }
            ]
        });
        expect(wrapper.findComponent({ name: "ElCheckboxGroup" }).exists()).toBe(true);
        expect(wrapper.findAllComponents({ name: "ElCheckbox" })).toHaveLength(2);
    });

    test("renders radio group correctly", () => {
        const wrapper = createWrapper({
            type: "radio",
            data: [
                { label: "Radio 1", value: "1" },
                { label: "Radio 2", value: "2" }
            ]
        });
        expect(wrapper.findComponent({ name: "ElRadioGroup" }).exists()).toBe(true);
        expect(wrapper.findAllComponents({ name: "ElRadio" })).toHaveLength(2);
    });

    test("converts element component names correctly", () => {
        const wrapper = createWrapper(
            {
                type: "input"
            },
            {
                ElInput
            }
        );
        expect(wrapper.findComponent({ name: "ElInput" }).exists()).toBe(true);
    });

    test("emits update:modelValue when value changes", async () => {
        const wrapper = createWrapper({});
        const newValue = "new value";

        await wrapper.vm.changeValue(newValue);

        expect(wrapper.emitted("update:modelValue")).toBeTruthy();
        expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([newValue]);
    });

    test("handles custom events correctly", async () => {
        const onFocus = vi.fn();
        const wrapper = createWrapper(
            {
                type: "inputNumber",
                events: {
                    focus: onFocus
                }
            },
            { ElInputNumber }
        );
        expect(wrapper.findComponent({ name: "el-input-number" }).exists()).toBe(true);
        await wrapper.find("input").trigger("focus");
        expect(onFocus).toHaveBeenCalled();
    });

    test("handles custom props correctly", () => {
        const wrapper = createWrapper(
            {
                type: "input",
                props: {
                    clearable: true,
                    placeholder: "Custom placeholder"
                }
            },
            {
                ElInput
            }
        );

        const input = wrapper.findComponent({ name: "el-input" });
        expect(input.props("clearable")).toEqual(true);
        expect(input.props("placeholder")).toEqual("Custom placeholder");
    });
});
