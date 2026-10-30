import { describe, test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import TableColumnDate from "../src/table-column-date.vue";

describe("表格日期列组件", () => {
    const createWrapper = (props = {}) => {
        return mount(TableColumnDate, {
            props: {
                formate: "YYYY-MM-DD",
                ...props
            }
        });
    };

    describe("单个日期值", () => {
        test("值为 null 时显示占位符", () => {
            const wrapper = createWrapper();
            expect(wrapper.text()).toBe("-");
        });

        test("值为空字符串时显示占位符", () => {
            const wrapper = createWrapper({ value: "" });
            expect(wrapper.text()).toBe("-");
        });

        test("正确格式化日期字符串", () => {
            const wrapper = createWrapper({
                value: "2024-01-01"
            });
            expect(wrapper.text()).toBe("2024-01-01");
        });

        test("正确格式化时间戳", () => {
            const wrapper = createWrapper({
                value: 1704067200000 // 2024-01-01 00:00:00
            });
            expect(wrapper.text()).toBe("2024-01-01");
        });

        test("按照自定义格式展示日期", () => {
            const wrapper = createWrapper({
                value: "2024-01-01",
                formate: "YYYY/MM/DD"
            });
            expect(wrapper.text()).toBe("2024/01/01");
        });

        test("支持数值形式的日期", () => {
            const wrapper = createWrapper({
                value: 1704067200000,
                formate: "YYYY-MM-DD HH:mm:ss"
            });
            expect(() => wrapper.vm.$props.value).not.toThrow();
            expect(wrapper.text()).toBe("2024-01-01 08:00:00");
        });
    });

    describe("日期数组", () => {
        test("正确处理空数组", () => {
            const wrapper = createWrapper({
                value: []
            });
            expect(wrapper.text()).toBe("-");
        });

        test("使用默认分隔符拼接日期数组", () => {
            const wrapper = createWrapper({
                value: ["2024-01-01", "2024-01-02"]
            });
            expect(wrapper.text()).toBe("2024-01-01 ~ 2024-01-02");
        });

        test("使用自定义分隔符拼接日期数组", () => {
            const wrapper = createWrapper({
                value: ["2024-01-01", "2024-01-02"],
                separator: " to "
            });
            expect(wrapper.text()).toBe("2024-01-01 to 2024-01-02");
        });

        test("保留日期数组中空值对应的分隔位置", () => {
            const wrapper = createWrapper({
                value: ["2024-01-01", "", "2024-01-03"]
            });
            expect(wrapper.text()).toBe("2024-01-01 ~  ~ 2024-01-03");
        });

        test("支持混合日期字符串与时间戳的数组", () => {
            const wrapper = createWrapper({
                value: ["2024-01-01", 1704153600000] // 第二个值对应 2024-01-02 00:00:00
            });
            expect(wrapper.text()).toBe("2024-01-01 ~ 2024-01-02");
        });
    });

    describe("边界场景", () => {
        test("正确处理无效日期字符串", () => {
            const wrapper = createWrapper({
                value: "invalid-date"
            });
            expect(wrapper.text()).toBe("0NaN-NaN-NaN");
        });

        test("支持同一数组中的不同日期格式", () => {
            const wrapper = createWrapper({
                value: ["2024/01/01", "2024-01-02"],
                formate: "YYYY-MM-DD"
            });
            expect(wrapper.text()).toBe("2024-01-01 ~ 2024-01-02");
        });

        test("日期值为零时按现有约定显示占位符", () => {
            const wrapper = createWrapper({ value: 0 });
            // 0 是 falsy 值，应显示为 "-"
            expect(wrapper.text()).toBe("-");
        });

        test("正确处理未定义的值", () => {
            const wrapper = createWrapper({ value: undefined });
            expect(wrapper.text()).toBe("-");
        });
    });
});
