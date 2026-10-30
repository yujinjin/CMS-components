import { describe, it, expect, vi, afterEach } from "vitest";
import { mount, enableAutoUnmount } from "@vue/test-utils";
import SearchField from "../src/search-field.vue";

enableAutoUnmount(afterEach);
afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
});

describe("查询字段组件", () => {
    const createWrapper = (props = {}) => {
        return mount(SearchField, {
            props
        });
    };

    it("复选查询字段透传自定义取值和展示字段", async () => {
        const wrapper = createWrapper({ type: "checkSelect", data: [{ id: 7, name: "北京" }], optionValueKey: "id", optionLabelKey: "name", modelValue: [] });
        const option = wrapper.findAllComponents({ name: "ElOption" }).find(item => item.props("label") === "北京");
        expect(option?.props("value")).toBe(7);
        await option!.findComponent({ name: "ElCheckbox" }).vm.$emit("change", true);
        expect(wrapper.emitted("update:modelValue")).toEqual([[[7]]]);
        expect(wrapper.emitted("change")).toEqual([[[7]]]);
    });

    it("外部 attrs 变化后更新底层查询输入框占位符", async () => {
        const wrapper = createWrapper({ placeholder: "原占位符" });
        await wrapper.setProps({ placeholder: "新占位符" });
        expect(wrapper.get("input").attributes("placeholder")).toBe("新占位符");
    });

    it("空值同步先发出更新事件再发出字段变更事件", async () => {
        const wrapper = createWrapper({ modelValue: "原值" });
        const order: string[] = [];
        await wrapper.setProps({ "onUpdate:modelValue": () => order.push("update"), "onChange": () => order.push("change") });
        await wrapper.get("input").setValue("");
        expect(wrapper.emitted("update:modelValue")).toEqual([[""]]);
        expect(wrapper.emitted("change")).toEqual([[""]]);
        expect(order).toEqual(["update", "change"]);
    });

    it("启用插槽时渲染默认插槽内容", () => {
        const wrapper = mount(() => (
            <SearchField slot>
                <span>hello word!</span>
            </SearchField>
        ));
        expect(wrapper.text()).toBe("hello word!");
    });

    describe("文本输入类型", () => {
        it("正确渲染文本输入框", () => {
            const wrapper = createWrapper({
                modelValue: "test value"
            });
            expect(wrapper.findComponent({ name: "ElInput" }).exists()).toBe(true);
            expect(wrapper.findComponent({ name: "ElInput" }).props("modelValue")).toBe("test value");
        });

        it("输入变化时移除首尾空白", async () => {
            const wrapper = createWrapper({ type: "input" });
            await wrapper.findComponent({ name: "ElInput" }).vm.$emit("update:modelValue", " test ");

            expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["test"]);
            expect(wrapper.emitted("change")?.[0]).toEqual(["test"]);
        });
    });

    describe("数字输入类型", () => {
        it("正确渲染数字输入框", () => {
            const wrapper = createWrapper({
                type: "inputNumber",
                modelValue: 42
            });
            expect(wrapper.findComponent({ name: "ElInputNumber" }).exists()).toBe(true);
            expect(wrapper.findComponent({ name: "ElInputNumber" }).props("modelValue")).toBe(42);
        });

        it("值变化时回传正确的绑定值", async () => {
            const wrapper = createWrapper({ type: "inputNumber" });
            await wrapper.findComponent({ name: "ElInputNumber" }).vm.$emit("update:modelValue", 42);

            expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([42]);
            expect(wrapper.emitted("change")?.[0]).toEqual([42]);
        });
    });

    describe("下拉选择类型", () => {
        const mockData = [
            { label: "Option 1", value: "1" },
            { label: "Option 2", value: "2", disabled: true }
        ];

        it("正确渲染下拉框及选项", () => {
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

        it("选中后回传对应选项值", async () => {
            const wrapper = createWrapper({
                type: "select",
                data: mockData
            });

            await wrapper.findComponent({ name: "ElSelect" }).vm.$emit("update:modelValue", "1");

            expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["1"]);
            expect(wrapper.emitted("change")?.[0]).toEqual(["1"]);
        });

        it("下拉框支持自定义选项取值与文案字段", () => {
            const customData = [
                { id: "a", name: "Item A" },
                { id: "b", name: "Item B" }
            ];
            const wrapper = createWrapper({
                type: "select",
                data: customData,
                optionValueKey: "id",
                optionLabelKey: "name"
            });
            const options = wrapper.findAllComponents({ name: "ElOption" });
            expect(options).toHaveLength(2);
            expect(options[0].props("value")).toBe("a");
            expect(options[0].props("label")).toBe("Item A");
        });

        it("选项为空时正常渲染下拉框", () => {
            const wrapper = createWrapper({
                type: "select",
                data: []
            });
            expect(wrapper.findComponent({ name: "ElSelect" }).exists()).toBe(true);
            expect(wrapper.findAllComponents({ name: "ElOption" })).toHaveLength(0);
        });
    });

    describe("复选下拉类型", () => {
        const mockData = [
            { label: "Check 1", value: "1" },
            { label: "Check 2", value: "2" }
        ];

        it("正确渲染复选下拉框", () => {
            const wrapper = createWrapper({
                type: "checkSelect",
                data: mockData
            });
            expect(wrapper.findComponent({ name: "CheckSelect" }).exists()).toBe(true);
            expect(wrapper.findComponent({ name: "CheckSelect" }).props("data")).toEqual(mockData);
        });

        it("选中后回传完整选项值数组", async () => {
            const wrapper = createWrapper({
                type: "checkSelect",
                data: mockData
            });

            await wrapper.findComponent({ name: "CheckSelect" }).vm.$emit("update:modelValue", ["1", "2"]);

            expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([["1", "2"]]);
            expect(wrapper.emitted("change")?.[0]).toEqual([["1", "2"]]);
        });

        it("选项为空时正常渲染复选下拉框", () => {
            const wrapper = createWrapper({
                type: "checkSelect",
                data: []
            });
            expect(wrapper.findComponent({ name: "CheckSelect" }).exists()).toBe(true);
        });
    });

    describe("日期选择类型", () => {
        it("正确渲染日期选择器", () => {
            const wrapper = createWrapper({
                type: "datePicker"
            });
            expect(wrapper.findComponent({ name: "ElDatePicker" }).exists()).toBe(true);
        });

        it("选择日期后回传对应值", async () => {
            const wrapper = createWrapper({
                type: "datePicker"
            });
            const date = new Date("2024-01-01");

            await wrapper.findComponent({ name: "ElDatePicker" }).vm.$emit("update:modelValue", date);

            expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([date]);
            expect(wrapper.emitted("change")?.[0]).toEqual([date]);
        });
    });

    it("透传自定义控件属性", () => {
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

    it("透传自定义控件事件", async () => {
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
