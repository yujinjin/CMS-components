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

describe("表格图片列组件", () => {
    const createWrapper = (props = {}) => {
        return mount(TableColumnImage, {
            props
        });
    };

    describe("基础渲染", () => {
        test("图片值为 null 时展示无图片提示", () => {
            const wrapper = createWrapper({ value: null });
            expect(wrapper.text()).toBe("没有图片");
        });

        test("图片值为空字符串时展示无图片提示", () => {
            const wrapper = createWrapper({ value: "" });
            expect(wrapper.text()).toBe("没有图片");
        });

        test("图片数组为空时展示无图片提示", () => {
            const wrapper = createWrapper({ value: [] });
            expect(wrapper.text()).toBe("没有图片");
        });

        test("正确渲染单张图片", () => {
            const wrapper = createWrapper({
                value: "https://example.com/image.jpg"
            });
            const image = wrapper.findComponent({ name: "ElImage" });
            expect(image.exists()).toBe(true);
            expect(image.props("src")).toBe("https://example.com/image.jpg");
        });
    });

    describe("多图片展示", () => {
        test("正确渲染多张图片", () => {
            const images = ["https://example.com/image1.jpg", "https://example.com/image2.jpg"];
            const wrapper = createWrapper({ value: images });
            const imageComponents = wrapper.findAllComponents({ name: "ElImage" });

            expect(imageComponents).toHaveLength(2);
            expect(imageComponents[0].props("src")).toBe(images[0]);
            expect(imageComponents[1].props("src")).toBe(images[1]);
        });

        test("正确处理图片数组中的空项", () => {
            const images = ["https://example.com/image1.jpg", "", "https://example.com/image2.jpg"];
            const wrapper = createWrapper({ value: images });
            const imageComponents = wrapper.findAllComponents({ name: "ElImage" });

            expect(imageComponents).toHaveLength(3);
            expect(imageComponents[0].props("src")).toBe(images[0]);
            expect(imageComponents[2].props("src")).toBe(images[2]);
        });

        test("按照指定分隔符拆分并展示图片", () => {
            const images = "https://example.com/image1.jpg,https://example.com/image2.jpg";
            const wrapper = createWrapper({ value: images, separator: "," });
            const imageComponents = wrapper.findAllComponents({ name: "ElImage" });

            expect(imageComponents).toHaveLength(2);
            expect(imageComponents[0].props("src")).toBe(images.split(",")[0]);
            expect(imageComponents[1].props("src")).toBe(images.split(",")[1]);
        });
    });

    describe("图片预览配置", () => {
        test("为单张图片配置预览列表", () => {
            const wrapper = createWrapper({ value: "https://example.com/image.jpg" });
            const image = wrapper.findComponent({ name: "ElImage" });
            expect(image.props("previewSrcList")).toEqual(["https://example.com/image.jpg"]);
        });

        test("为多张图片配置完整预览列表", () => {
            const images = ["https://example.com/img1.jpg", "https://example.com/img2.jpg"];
            const wrapper = createWrapper({ value: images });
            const image = wrapper.findComponent({ name: "ElImage" });
            expect(image.props("previewSrcList")).toEqual(images);
        });

        test("图片值为空时展示无图片提示", () => {
            const wrapper = createWrapper({ value: null });
            expect(wrapper.find(".no-image").exists()).toBe(true);
            expect(wrapper.find(".no-image").text()).toBe("没有图片");
        });
    });

    describe("组件标识", () => {
        test("能够通过组件名称定位实例", () => {
            const wrapper = createWrapper({ value: "https://example.com/image.jpg" });
            expect(wrapper.findComponent({ name: "TableColumnImage" }).exists()).toBe(true);
        });
    });
});
