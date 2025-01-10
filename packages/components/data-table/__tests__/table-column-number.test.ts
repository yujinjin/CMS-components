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

describe("TableColumnNumber", () => {
    const createWrapper = (props = {}) => {
        return mount(TableColumnNumber, {
            props
        });
    };

    test("renders dash when value is null", () => {
        const wrapper = createWrapper({ value: null });
        expect(wrapper.text()).toBe("-");
    });

    test("renders dash when value is undefined", () => {
        const wrapper = createWrapper({ value: undefined });
        expect(wrapper.text()).toBe("-");
    });

    test("renders dash when value is empty string", () => {
        const wrapper = createWrapper({ value: "" });
        expect(wrapper.text()).toBe("-");
    });

    test("renders zero correctly", () => {
        const wrapper = createWrapper({ value: 0 });
        expect(wrapper.text()).toBe("0");
    });

    test("renders integer correctly", () => {
        const wrapper = createWrapper({ value: 1234 });
        expect(wrapper.text()).toBe("1,234");
    });

    test("renders decimal correctly", () => {
        const wrapper = createWrapper({ value: "01234.56" });
        expect(wrapper.text()).toBe("1,235");
    });

    test("very large numbers", () => {
        const wrapper = createWrapper({
            value: "1234001234.5678",
            digit: 2
        });
        expect(wrapper.text()).toBe("1,234,001,234.57");
    });
});
