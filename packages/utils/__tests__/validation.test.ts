/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2023-03-24 15:29:09
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2023-03-27 11:15:04
 * @项目的路径: \CMS-components\packages\utils\__tests__\validation.test.ts
 * @描述: 头部注释配置模板
 */
import { describe, expect, it } from "vitest";
import { chinaIDCardValidate } from "../index";

describe("utils validation", () => {
    /******************************** chinaIDCardValidate start *******************************/
    it("正确数据：18位身份证号且只有数字", () => {
        expect(chinaIDCardValidate("130701199310302288")).toBeTruthy();
    });
    it("正确数据：18位身份证号且最后一位为X", () => {
        expect(chinaIDCardValidate("52030219891209794X")).toBeTruthy();
    });
    it("正确数据：香港身份证号", () => {
        expect(chinaIDCardValidate("B165432(8)")).toBeTruthy();
    });
    it("正确数据：台湾身份证号", () => {
        expect(chinaIDCardValidate("B165432167")).toBeTruthy();
    });
    it("正确数据：澳门身份证号", () => {
        expect(chinaIDCardValidate("1781267(6)")).toBeTruthy();
    });
    it("错误数据：18位数字但最后数字错误", () => {
        expect(chinaIDCardValidate("130701199310302284")).toBeFalsy();
    });
    it("错误数据：18位身份证号且最后一位为除X外的字母", () => {
        expect(chinaIDCardValidate("52030219891209794Y")).toBeFalsy();
    });
    it("错误数据：不是18位", () => {
        expect(chinaIDCardValidate("32031177070600")).toBeFalsy();
    });
    it("错误数据：18位出生日期不对", () => {
        expect(chinaIDCardValidate("130701199315302288")).toBeFalsy();
    });
    it("错误数据：含有字母", () => {
        expect(chinaIDCardValidate("5203021989120979412")).toBeFalsy();
    });
    it("错误数据：含有特殊字符", () => {
        expect(chinaIDCardValidate("520@#￥%&×302198912")).toBeFalsy();
    });
    /******************************** chinaIDCardValidate end *******************************/
});
