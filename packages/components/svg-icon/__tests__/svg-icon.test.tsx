/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2023-04-04 10:45:56
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-02-12 10:05:59
 * @项目的路径: \CMS-components\packages\components\svg-icon\__tests__\svg-icon.test.tsx
 * @描述: svg icon 测试用例
 */
import { defineComponent, h, markRaw } from "vue";
import { mount, enableAutoUnmount } from "@vue/test-utils";
import { describe, expect, test, afterEach, vi } from "vitest";
import SvgIcon from "../src/svg-icon.vue";

enableAutoUnmount(afterEach);
afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
});

describe("矢量图标组件", () => {
    test("动态切换图标来源并清除旧样式", async () => {
        const wrapper = mount(SvgIcon, { props: { value: "edit", color: "red", size: 24 } });
        expect(wrapper.get("use").element.getAttribute("xlink:href")).toBe("#icon-edit");
        const icon = markRaw({ render: () => h("span", { class: "component-icon" }) });
        await wrapper.setProps({ value: icon, color: "", size: "" });
        expect(wrapper.find("use").exists()).toBe(false);
        expect(wrapper.find(".component-icon").exists()).toBe(true);
        expect(wrapper.get("i").element.style.color).toBe("");
        expect(wrapper.get("i").element.style.fontSize).toBe("");
    });

    test("正确渲染组件及样式类", () => {
        const wrapper = mount(() => <SvgIcon value="" />);
        expect(wrapper.find("i").classes()).toContain("cms-icon");
    });

    test("根据图标值引用对应图标", () => {
        const value = "open";
        const wrapper = mount(() => <SvgIcon value={value} />);
        expect(wrapper.find("i.cms-icon > svg.svg-icon > use").element.getAttribute("xlink:href")).toEqual("#icon-" + value);
    });

    test("按照图标值设置无障碍标签", () => {
        const wrapper = mount(() => <SvgIcon value="edit" />);
        expect(wrapper.find("i").attributes("aria-label")).toBe("edit");

        // value 为空时不应设置 aria-label
        const emptyWrapper = mount(() => <SvgIcon value="" />);
        expect(emptyWrapper.find("i").attributes("aria-label")).toBeUndefined();
    });

    describe("颜色属性", () => {
        test("按照配置设置图标颜色", () => {
            const wrapper = mount(() => <SvgIcon value="edit" color="red" />);
            expect(wrapper.find("i").element.style.color).toBe("red");
        });

        test("颜色为空时不设置内联颜色", () => {
            const wrapper = mount(() => <SvgIcon value="edit" color="" />);
            expect(wrapper.find("i").element.style.color).toBe("");
        });
    });

    describe("尺寸属性", () => {
        test("数字尺寸自动补充像素单位", () => {
            const wrapper = mount(() => <SvgIcon value="edit" size={16} />);
            expect(wrapper.find("i").element.style.fontSize).toBe("16px");
        });

        test("纯数字字符串尺寸自动补充像素单位", () => {
            const wrapper = mount(() => <SvgIcon value="edit" size="24" />);
            expect(wrapper.find("i").element.style.fontSize).toBe("24px");
        });

        test("带单位的字符串尺寸保持原值", () => {
            const wrapper = mount(() => <SvgIcon value="edit" size="2em" />);
            expect(wrapper.find("i").element.style.fontSize).toBe("2em");
        });

        test("尺寸为空时不设置内联字号", () => {
            const wrapper = mount(() => <SvgIcon value="edit" size="" />);
            expect(wrapper.find("i").element.style.fontSize).toBe("");
        });
    });

    test("图标值为组件对象时渲染该组件", () => {
        const MockComponent = defineComponent({
            name: "MockIcon",
            render() {
                return h("span", { class: "mock-icon" }, "mock");
            }
        });
        const wrapper = mount(() => <SvgIcon value={MockComponent} />);
        // value 是 Component 时，不应渲染 svg，而应渲染 component
        expect(wrapper.find("svg").exists()).toBe(false);
        expect(wrapper.find(".mock-icon").exists()).toBe(true);
    });

    test("正确渲染默认插槽内容", () => {
        const wrapper = mount(() => (
            <SvgIcon value="">
                <span class="slot-content">slot text</span>
            </SvgIcon>
        ));
        expect(wrapper.find(".slot-content").exists()).toBe(true);
        expect(wrapper.find(".slot-content").text()).toBe("slot text");
    });
});
