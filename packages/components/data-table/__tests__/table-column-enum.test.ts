/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2024-12-30 11:11:12
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-02 09:30:28
 * @项目的路径: \CMS-components\packages\components\data-table\__tests__\table-column-enum.test.ts
 * @描述: 枚举数据列测试用例
 */
import { describe, test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import TableColumnEnum from "../src/table-column-enum.vue";

describe("表格枚举列组件", () => {
    const mockEnums = [
        { label: "Active", value: 1 },
        { label: "Inactive", value: 0 },
        { label: "Pending", value: 2 },
        { label: "Error", value: 3 }
    ];

    const createWrapper = (props = {}) => {
        return mount(TableColumnEnum, {
            props: {
                data: mockEnums,
                ...props
            }
        });
    };

    describe("基础渲染", () => {
        test("值为 null 时显示占位符", () => {
            const wrapper = createWrapper();
            expect(wrapper.text()).toBe("-");
        });

        test("值为空字符串时显示占位符", () => {
            const wrapper = createWrapper({ value: "" });
            expect(wrapper.text()).toBe("-");
        });

        test("枚举列表为空时显示占位符", () => {
            const wrapper = createWrapper({
                value: 1,
                data: []
            });
            expect(wrapper.text()).toBe("1");
        });

        test("未匹配到枚举项时展示原值", () => {
            const wrapper = createWrapper({
                value: 999
            });
            expect(wrapper.text()).toBe("999");
        });
    });

    describe("单值展示", () => {
        test("展示单个枚举值对应的文案", () => {
            const wrapper = createWrapper({
                value: 1
            });
            expect(wrapper.text()).toBe("Active");
        });

        test("正确匹配布尔类型的枚举值", () => {
            const boolEnums = [
                { label: "Yes", value: true },
                { label: "No", value: false }
            ];

            const wrapper = createWrapper({
                value: true,
                data: boolEnums
            });
            expect(wrapper.text()).toBe("Yes");
        });
    });

    describe("多值展示", () => {
        test("使用默认分隔符展示多个枚举值", () => {
            const wrapper = createWrapper({
                value: "1,2"
            });
            expect(wrapper.text()).toBe("Active,Pending");
        });

        test("使用自定义分隔符展示多个枚举值", () => {
            const wrapper = createWrapper({
                value: "1|2",
                separator: "|"
            });
            expect(wrapper.text()).toBe("Active|Pending");
        });
        test("正确处理多个枚举值中的无效项", () => {
            const wrapper = createWrapper({
                value: "1,999,2"
            });
            expect(wrapper.text()).toBe("Active,999,Pending");
        });

        test("正确处理分隔字符串中的空项", () => {
            const wrapper = createWrapper({
                value: "1,,2"
            });
            expect(wrapper.text()).toBe("Active,,Pending");
        });

        test("字符串值能够匹配数值类型的枚举项", () => {
            const wrapper = createWrapper({
                value: "1"
            });
            expect(wrapper.text()).toBe("Active");
        });
    });

    describe("自定义字段配置", () => {
        test("使用自定义枚举取值字段", () => {
            const customEnums = [
                { name: "Active", code: "A" },
                { name: "Inactive", code: "I" }
            ];
            const wrapper = createWrapper({
                value: "A",
                data: customEnums,
                valueKey: "code",
                textKey: "name"
            });
            expect(wrapper.text()).toBe("Active");
        });
    });

    describe("布尔值", () => {
        test("正确展示布尔假值对应的文案", () => {
            const boolEnums = [
                { label: "Yes", value: true },
                { label: "No", value: false }
            ];
            const wrapper = createWrapper({
                value: false,
                data: boolEnums
            });
            expect(wrapper.text()).toBe("No");
        });

        test("布尔值不进行字符串拆分", () => {
            const wrapper = createWrapper({
                value: true,
                data: [{ label: "Yes", value: true }]
            });
            // Boolean 类型不应走 split 逻辑，应直接匹配
            expect(wrapper.text()).toBe("Yes");
        });
    });
});
