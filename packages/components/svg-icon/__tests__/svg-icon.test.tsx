/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2023-04-04 10:45:56
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-02-12 10:05:59
 * @项目的路径: \CMS-components\packages\components\svg-icon\__tests__\svg-icon.test.tsx
 * @描述: svg icon 测试用例
 */
import { defineComponent, h } from "vue";
import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";
import SvgIcon from "../src/svg-icon.vue";

describe("SvgIcon", () => {
    test("render test & class", () => {
        const wrapper = mount(() => <SvgIcon value="" />);
        expect(wrapper.find("i").classes()).toContain("cms-icon");
    });

    test("value", () => {
        const value = "open";
        const wrapper = mount(() => <SvgIcon value={value} />);
        expect(wrapper.find("i.cms-icon > svg.svg-icon > use").element.getAttribute("xlink:href")).toEqual("#icon-" + value);
    });

    test("aria-label attribute", () => {
        const wrapper = mount(() => <SvgIcon value="edit" />);
        expect(wrapper.find("i").attributes("aria-label")).toBe("edit");

        // value 为空时不应设置 aria-label
        const emptyWrapper = mount(() => <SvgIcon value="" />);
        expect(emptyWrapper.find("i").attributes("aria-label")).toBeUndefined();
    });

    describe("color prop", () => {
        test("sets color style", () => {
            const wrapper = mount(() => <SvgIcon value="edit" color="red" />);
            expect(wrapper.find("i").element.style.color).toBe("red");
        });

        test("does not set color when empty", () => {
            const wrapper = mount(() => <SvgIcon value="edit" color="" />);
            expect(wrapper.find("i").element.style.color).toBe("");
        });
    });

    describe("size prop", () => {
        test("sets fontSize with number value", () => {
            const wrapper = mount(() => <SvgIcon value="edit" size={16} />);
            expect(wrapper.find("i").element.style.fontSize).toBe("16px");
        });

        test("sets fontSize with numeric string value", () => {
            const wrapper = mount(() => <SvgIcon value="edit" size="24" />);
            expect(wrapper.find("i").element.style.fontSize).toBe("24px");
        });

        test("sets fontSize with unit string value", () => {
            const wrapper = mount(() => <SvgIcon value="edit" size="2em" />);
            expect(wrapper.find("i").element.style.fontSize).toBe("2em");
        });

        test("does not set fontSize when empty string", () => {
            const wrapper = mount(() => <SvgIcon value="edit" size="" />);
            expect(wrapper.find("i").element.style.fontSize).toBe("");
        });
    });

    test("renders component when value is a Component", () => {
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

    test("renders slot content", () => {
        const wrapper = mount(() => (
            <SvgIcon value="">
                <span class="slot-content">slot text</span>
            </SvgIcon>
        ));
        expect(wrapper.find(".slot-content").exists()).toBe(true);
        expect(wrapper.find(".slot-content").text()).toBe("slot text");
    });
});
