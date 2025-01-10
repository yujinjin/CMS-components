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

describe("TableColumnEnum", () => {
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

    describe("Basic Rendering", () => {
        test("renders dash when value is null", () => {
            const wrapper = createWrapper();
            expect(wrapper.text()).toBe("-");
        });

        test("renders dash when value is empty string", () => {
            const wrapper = createWrapper({ value: "" });
            expect(wrapper.text()).toBe("-");
        });

        test("renders dash when enums is empty", () => {
            const wrapper = createWrapper({
                value: 1,
                data: []
            });
            expect(wrapper.text()).toBe("1");
        });

        test("renders original value when no matching enum found", () => {
            const wrapper = createWrapper({
                value: 999
            });
            expect(wrapper.text()).toBe("999");
        });
    });

    describe("Single Value Rendering", () => {
        test("renders correct label for single value", () => {
            const wrapper = createWrapper({
                value: 1
            });
            expect(wrapper.text()).toBe("Active");
        });

        test("handles boolean values correctly", () => {
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

    describe("Multiple Values Rendering", () => {
        test("renders multiple values with default separator", () => {
            const wrapper = createWrapper({
                value: "1,2"
            });
            expect(wrapper.text()).toBe("Active,Pending");
        });

        test("renders multiple values with custom separator", () => {
            const wrapper = createWrapper({
                value: "1|2",
                separator: "|"
            });
            expect(wrapper.text()).toBe("Active|Pending");
        });
        test("handles invalid values in array", () => {
            const wrapper = createWrapper({
                value: "1,999,2"
            });
            expect(wrapper.text()).toBe("Active,999,Pending");
        });
    });
});
