/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2023-04-04 10:45:56
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2023-04-04 14:43:25
 * @项目的路径: \CMS-components\packages\components\svg-icon\__tests__\svg-icon.test.tsx
 * @描述: svg icon 测试用例
 */
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import SvgIcon from "../src/svg-icon.vue";

describe("svg-icon.vue", () => {
    it("render test & class", () => {
        const wrapper = mount(() => <SvgIcon value="" />);
        expect(wrapper.find("i").classes()).toContain("icon");
    });
});
