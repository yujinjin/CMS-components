/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2023-04-04 10:45:56
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-02-12 10:05:59
 * @项目的路径: \CMS-components\packages\components\svg-icon\__tests__\svg-icon.test.tsx
 * @描述: svg icon 测试用例
 */
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
});
