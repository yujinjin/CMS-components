import { defineComponent, h, nextTick } from "vue";
import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { mount, enableAutoUnmount } from "@vue/test-utils";
import ElementPlus, { ElInput, ElInputNumber, ElForm, ElFormItem, formContextKey, formItemContextKey } from "element-plus";
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

enableAutoUnmount(afterEach);
afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
});

describe("输入字段组件", () => {
    beforeEach(() => {
        // 模拟富文本编辑器引擎
        vi.mock("quill", () => {
            return {
                default: vi.fn(() => ({
                    on: vi.fn(),
                    off: vi.fn(),
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

    test.each([
        ["inputNumber", "ElInputNumber"],
        ["datePicker", "ElDatePicker"],
        ["switch", "ElSwitch"],
        ["slider", "ElSlider"],
        ["selectV2", "ElSelectV2"],
        ["timePicker", "ElTimePicker"],
        ["timeSelect", "ElTimeSelect"],
        ["autocomplete", "ElAutocomplete"],
        ["cascader", "ElCascader"],
        ["colorPicker", "ElColorPicker"]
    ])("将 %s 分发到已注册的 %s 控件", (type, name) => {
        // SelectV2 的 options 是必填属性；该用例验证组件解析，不测试缺失必填参数。
        const wrapper = mount(InputField, {
            props: { type: type as any, ...(type === "selectV2" ? { props: { options: [] } } : {}) },
            global: { plugins: [ElementPlus], provide: formProvide }
        });
        expect(wrapper.findComponent({ name }).exists()).toBe(true);
    });

    test("新增已注册控件无需更新分发组件并保留双向绑定", async () => {
        const customPicker = defineComponent({
            name: "ElCustomPicker",
            props: { modelValue: { type: String, default: "" } },
            emits: ["update:modelValue"],
            setup(props, { emit }) {
                return () => h("input", { value: props.modelValue, onInput: (event: Event) => emit("update:modelValue", (event.target as HTMLInputElement).value) });
            }
        });
        const wrapper = createWrapper({ type: "customPicker", modelValue: "初始值" }, { ElCustomPicker: customPicker });
        expect(wrapper.get("input").element.value).toBe("初始值");
        await wrapper.get("input").setValue("新值");
        expect(wrapper.emitted("update:modelValue")).toEqual([["新值"]]);
    });

    test("外部 attrs 变化后更新底层输入框占位符", async () => {
        const wrapper = createWrapper({ placeholder: "原占位符" });
        await wrapper.setProps({ placeholder: "新占位符" });
        expect(wrapper.get("input").attributes("placeholder")).toBe("新占位符");
    });

    test("复选下拉字段透传自定义取值和展示字段", async () => {
        const wrapper = createWrapper({ type: "checkSelect", data: [{ id: 7, name: "北京" }], optionValueKey: "id", optionLabelKey: "name", modelValue: [] });
        const option = wrapper.findAllComponents({ name: "ElOption" }).find(item => item.props("label") === "北京");
        expect(option?.props("value")).toBe(7);
        await option!.findComponent({ name: "ElCheckbox" }).vm.$emit("change", true);
        expect(wrapper.emitted("update:modelValue")).toEqual([[[7]]]);
    });

    test("启用插槽时展示自定义内容", () => {
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

    test("标签类型正确展示绑定值", () => {
        const wrapper = createWrapper({
            type: "label",
            modelValue: "Label Text"
        });
        expect(wrapper.find(".cms-input-field_label-contents").text()).toBe("Label Text");
    });

    test("标签类型支持 null 值", () => {
        const wrapper = createWrapper({
            type: "label",
            modelValue: null
        });
        expect(wrapper.find(".cms-input-field_label-contents").exists()).toBe(true);
    });

    test("标签类型支持未定义的值", () => {
        const wrapper = createWrapper({
            type: "label",
            modelValue: undefined
        });
        expect(wrapper.find(".cms-input-field_label-contents").exists()).toBe(true);
    });

    test("正确分发图片上传类型并传递绑定值", () => {
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

    test("正确分发富文本类型并传递绑定值", () => {
        const wrapper = createWrapper({
            type: "webEditor",
            modelValue: "<span>hello word!</span>"
        });
        expect(wrapper.findComponent({ name: "WebEditor" }).exists()).toBe(true);
        expect(wrapper.findComponent({ name: "WebEditor" }).props("modelValue")).toEqual("<span>hello word!</span>");
    });

    test("正确渲染下拉选择框及选项", () => {
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

    test("正确渲染复选下拉框及选项", async () => {
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

    test("正确渲染复选框组", () => {
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

    test("正确渲染单选框组", () => {
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

    test("正确解析底层组件名称", () => {
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

    test("将驼峰类型转换为短横线组件名", () => {
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

    test("按照驼峰类型分发日期选择器", () => {
        // datePicker → el-date-picker，验证动态组件名称转换逻辑
        const wrapper = mount(InputField, { props: { type: "datePicker" }, global: { plugins: [ElementPlus] } });
        expect(wrapper.findComponent({ name: "ElDatePicker" }).exists()).toBe(true);
    });

    test("值变化时发出双向绑定更新事件", async () => {
        const wrapper = createWrapper({ type: "input" });
        const newValue = "new value";

        await wrapper.findComponent({ name: "ElInput" }).vm.$emit("update:modelValue", newValue);
        await nextTick();

        expect(wrapper.emitted("update:modelValue")).toBeTruthy();
        expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([newValue]);
    });

    test("透传并执行自定义控件事件", async () => {
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

    test("透传自定义控件属性", () => {
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
