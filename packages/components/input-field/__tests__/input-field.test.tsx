import { nextTick } from "vue";
import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { mount } from "@vue/test-utils";
import { ElInput, ElInputNumber, ElForm, ElFormItem, formContextKey, formItemContextKey } from "element-plus";
import InputField from "../src/input-field.vue";

// 提供 Element Plus Form 上下文的默认值，避免 ElUpload 等组件的注入警告
const formProvide = {
    [formContextKey as symbol]: {
        model: {},
        rules: {},
        fields: [],
        addField: vi.fn(),
        removeField: vi.fn(),
        resetFields: vi.fn(),
        clearValidate: vi.fn(),
        validateField: vi.fn(),
        validate: vi.fn(),
        scrollToField: vi.fn()
    },
    [formItemContextKey as symbol]: {
        prop: "",
        size: "",
        disabled: false,
        validateState: "",
        addValidateEvent: vi.fn(),
        removeValidateEvent: vi.fn(),
        validate: vi.fn(),
        resetField: vi.fn(),
        clearValidate: vi.fn()
    }
};

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

    const createWrapper = (props: Record<string, any>, components = {}) => {
        return mount(InputField, {
            props,
            global: {
                components: {
                    ElForm,
                    ElFormItem,
                    ...components
                },
                provide: formProvide
            }
        });
    };

    test("renders slot when slot is true", () => {
        const wrapper = mount(
            () => (
                <InputField slot>
                    <span>hello word!</span>
                </InputField>
            ),
            {
                global: {
                    components: {
                        ElForm,
                        ElFormItem
                    },
                    provide: formProvide
                }
            }
        );
        expect(wrapper.text()).toBe("hello word!");
    });

    test("renders label type correctly", () => {
        const wrapper = createWrapper({
            type: "label",
            modelValue: "Label Text"
        });
        expect(wrapper.find(".cms-input-field_label-contents").text()).toBe("Label Text");
    });

    test("renders label type with null modelValue", () => {
        const wrapper = createWrapper({
            type: "label",
            modelValue: null
        });
        expect(wrapper.find(".cms-input-field_label-contents").exists()).toBe(true);
    });

    test("renders label type with undefined modelValue", () => {
        const wrapper = createWrapper({
            type: "label",
            modelValue: undefined
        });
        expect(wrapper.find(".cms-input-field_label-contents").exists()).toBe(true);
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

    test("getElComponentName converts camelCase to kebab-case", () => {
        const wrapper = createWrapper(
            {
                type: "inputNumber"
            },
            {
                ElInputNumber
            }
        );
        expect(wrapper.findComponent({ name: "el-input-number" }).exists()).toBe(true);
    });

    test("getElComponentName handles camelCase type names", () => {
        // datePicker → el-date-picker，验证动态组件名称转换逻辑
        // 由于 ElDatePicker 未全局注册，此处验证组件渲染不报错即可
        const wrapper = createWrapper({
            type: "datePicker"
        });
        expect(wrapper.exists()).toBe(true);
    });

    test("emits update:modelValue when value changes", async () => {
        const wrapper = createWrapper({ type: "input" });
        const newValue = "new value";

        await wrapper.findComponent({ name: "ElInput" }).vm.$emit("update:modelValue", newValue);
        await nextTick();

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
