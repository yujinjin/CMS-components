/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2024-12-30 11:13:42
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-02 09:36:40
 * @项目的路径: \CMS-components\packages\components\data-table\__tests__\table-column-number.test.ts
 * @描述: 数字数据列测试用例
 */
import { describe, test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import TableColumnNumber from "../src/table-column-number.vue";

describe("表格数字列组件", () => {
    const createWrapper = (props = {}) => {
        return mount(TableColumnNumber, {
            props
        });
    };

    test("值为 null 时显示占位符", () => {
        const wrapper = createWrapper({ value: null });
        expect(wrapper.text()).toBe("-");
    });

    test("值未定义时显示占位符", () => {
        const wrapper = createWrapper({ value: undefined });
        expect(wrapper.text()).toBe("-");
    });

    test("值为空字符串时显示占位符", () => {
        const wrapper = createWrapper({ value: "" });
        expect(wrapper.text()).toBe("-");
    });

    test("正确格式化零值", () => {
        const wrapper = createWrapper({ value: 0 });
        expect(wrapper.text()).toBe("0");
    });

    test("正确格式化整数", () => {
        const wrapper = createWrapper({ value: 1234 });
        expect(wrapper.text()).toBe("1,234");
    });

    test("正确格式化小数", () => {
        const wrapper = createWrapper({ value: "01234.56" });
        expect(wrapper.text()).toBe("1,235");
    });

    test("正确格式化大数值", () => {
        const wrapper = createWrapper({
            value: "1234001234.5678",
            digit: 2
        });
        expect(wrapper.text()).toBe("1,234,001,234.57");
    });

    test("正确格式化负数", () => {
        const wrapper = createWrapper({ value: -1234.5, digit: 1 });
        expect(wrapper.text()).toContain("-");
    });

    test("按照指定小数位格式化数字字符串", () => {
        const wrapper = createWrapper({ value: "1234.5678", digit: 2 });
        expect(wrapper.text()).toBe("1,234.57");
    });

    test("小数位为零时展示整数", () => {
        const wrapper = createWrapper({ value: 1234.5678, digit: 0 });
        expect(wrapper.text()).toBe("1,235");
    });
});
