/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2024-12-30 11:12:23
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-02 09:33:27
 * @项目的路径: \CMS-components\packages\components\data-table\__tests__\table-column-image.test.ts
 * @描述: 图片数据列测试用例
 */
import { describe, test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import TableColumnImage from "../src/table-column-image.vue";

describe("TableColumnImage", () => {
    const createWrapper = (props = {}) => {
        return mount(TableColumnImage, {
            props
        });
    };

    describe("Basic Rendering", () => {
        test("renders dash when value is null", () => {
            const wrapper = createWrapper({ value: null });
            expect(wrapper.text()).toBe("没有图片");
        });

        test("renders dash when value is empty string", () => {
            const wrapper = createWrapper({ value: "" });
            expect(wrapper.text()).toBe("没有图片");
        });

        test("renders dash when value is empty array", () => {
            const wrapper = createWrapper({ value: [] });
            expect(wrapper.text()).toBe("没有图片");
        });

        test("renders single image correctly", () => {
            const wrapper = createWrapper({
                value: "https://example.com/image.jpg"
            });
            const image = wrapper.findComponent({ name: "ElImage" });
            expect(image.exists()).toBe(true);
            expect(image.props("src")).toBe("https://example.com/image.jpg");
        });
    });

    describe("Multiple Images Rendering", () => {
        test("renders multiple images correctly", () => {
            const images = ["https://example.com/image1.jpg", "https://example.com/image2.jpg"];
            const wrapper = createWrapper({ value: images });
            const imageComponents = wrapper.findAllComponents({ name: "ElImage" });

            expect(imageComponents).toHaveLength(2);
            expect(imageComponents[0].props("src")).toBe(images[0]);
            expect(imageComponents[1].props("src")).toBe(images[1]);
        });

        test("handles empty values in array", () => {
            const images = ["https://example.com/image1.jpg", "", "https://example.com/image2.jpg"];
            const wrapper = createWrapper({ value: images });
            const imageComponents = wrapper.findAllComponents({ name: "ElImage" });

            expect(imageComponents).toHaveLength(3);
            expect(imageComponents[0].props("src")).toBe(images[0]);
            expect(imageComponents[2].props("src")).toBe(images[2]);
        });

        test("renders multiple images by separator correctly", () => {
            const images = "https://example.com/image1.jpg,https://example.com/image2.jpg";
            const wrapper = createWrapper({ value: images, separator: "," });
            const imageComponents = wrapper.findAllComponents({ name: "ElImage" });

            expect(imageComponents).toHaveLength(2);
            expect(imageComponents[0].props("src")).toBe(images.split(",")[0]);
            expect(imageComponents[1].props("src")).toBe(images.split(",")[1]);
        });
    });
});
