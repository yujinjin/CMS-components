import { describe, test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import TableColumnDate from "../src/table-column-date.vue";

describe("TableColumnDate", () => {
    const createWrapper = (props = {}) => {
        return mount(TableColumnDate, {
            props: {
                formate: "YYYY-MM-DD",
                ...props
            }
        });
    };

    describe("Single date value", () => {
        test("renders dash when value is null", () => {
            const wrapper = createWrapper();
            expect(wrapper.text()).toBe("-");
        });

        test("renders dash when value is empty string", () => {
            const wrapper = createWrapper({ value: "" });
            expect(wrapper.text()).toBe("-");
        });

        test("formats date string correctly", () => {
            const wrapper = createWrapper({
                value: "2024-01-01"
            });
            expect(wrapper.text()).toBe("2024-01-01");
        });

        test("formats timestamp correctly", () => {
            const wrapper = createWrapper({
                value: 1704067200000 // 2024-01-01 00:00:00
            });
            expect(wrapper.text()).toBe("2024-01-01");
        });

        test("respects custom format", () => {
            const wrapper = createWrapper({
                value: "2024-01-01",
                formate: "YYYY/MM/DD"
            });
            expect(wrapper.text()).toBe("2024/01/01");
        });

        test("accepts number value", () => {
            const wrapper = createWrapper({
                value: 1704067200000,
                formate: "YYYY-MM-DD HH:mm:ss"
            });
            expect(() => wrapper.vm.$props.value).not.toThrow();
            expect(wrapper.text()).toBe("2024-01-01 08:00:00");
        });
    });

    describe("Array of dates", () => {
        test("handles empty array", () => {
            const wrapper = createWrapper({
                value: []
            });
            expect(wrapper.text()).toBe("-");
        });

        test("formats array of dates with default separator", () => {
            const wrapper = createWrapper({
                value: ["2024-01-01", "2024-01-02"]
            });
            expect(wrapper.text()).toBe("2024-01-01 ~ 2024-01-02");
        });

        test("formats array of dates with custom separator", () => {
            const wrapper = createWrapper({
                value: ["2024-01-01", "2024-01-02"],
                separator: " to "
            });
            expect(wrapper.text()).toBe("2024-01-01 to 2024-01-02");
        });

        test("handles array with empty values", () => {
            const wrapper = createWrapper({
                value: ["2024-01-01", "", "2024-01-03"]
            });
            expect(wrapper.text()).toBe("2024-01-01 ~  ~ 2024-01-03");
        });

        test("handles array with mixed date formats", () => {
            const wrapper = createWrapper({
                value: ["2024-01-01", 1704153600000] // Second value is 2024-01-02 00:00:00
            });
            expect(wrapper.text()).toBe("2024-01-01 ~ 2024-01-02");
        });
    });

    describe("Edge cases", () => {
        test("handles invalid date string", () => {
            const wrapper = createWrapper({
                value: "invalid-date"
            });
            expect(wrapper.text()).toBe("0NaN-NaN-NaN");
        });

        test("handles different date formats in same array", () => {
            const wrapper = createWrapper({
                value: ["2024/01/01", "2024-01-02"],
                formate: "YYYY-MM-DD"
            });
            expect(wrapper.text()).toBe("2024-01-01 ~ 2024-01-02");
        });
    });
});
