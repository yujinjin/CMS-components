<template>
    <div class="demo-box">
        <input-form :value="formData" :fields="fields" label-width="100px" @field-value-change="fieldValueChangeHandle" />
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { type InputFormField } from "@yujinjin/cms-components-main/index";

const formData = ref({
    province: "",
    city: "",
    area: ""
});

// 模拟数据
const provinces = [
    { label: "北京", value: "beijing" },
    { label: "上海", value: "shanghai" }
];

const cities = {
    beijing: [{ label: "北京市", value: "beijingCity" }],
    shanghai: [{ label: "上海市", value: "beijingCity" }]
};

const areas = {
    beijingCity: [
        { label: "朝阳区", value: "chaoyang" },
        { label: "海淀区", value: "haidian" }
    ],
    shanghaiCity: [
        { label: "浦东新区", value: "pudong" },
        { label: "黄浦区", value: "huangpu" }
    ]
};

const fields = ref<InputFormField[]>([
    {
        name: "province",
        label: "省份",
        type: "select",
        data: provinces,
        rules: [{ required: true, message: "请选择省份" }]
    },
    {
        name: "city",
        label: "城市",
        type: "select",
        isShow: false,
        data: [],
        rules: [{ required: true, message: "请选择城市" }]
    },
    {
        name: "area",
        label: "区域",
        type: "select",
        isShow: false,
        data: [],
        rules: [{ required: true, message: "请选择区域" }]
    }
]);

const fieldValueChangeHandle = function (field: InputFormField, fieldValue: any, formFields: InputFormField[], inputFormValue: Record<string, any>) {
    if (field.name === "province") {
        inputFormValue.city = "";
        inputFormValue.area = "";
        if (fieldValue) {
            formFields.find(item => {
                if (item.name === "city") {
                    item.isShow = true;
                    item.data = cities[fieldValue] || [];
                    return true;
                }
                return false;
            });
        } else {
            formFields.find(item => item.name === "city")!.isShow = false;
        }
        formFields.find(item => item.name === "area")!.isShow = false;
    } else if (field.name === "city") {
        inputFormValue.area = "";
        if (fieldValue) {
            formFields.find(item => {
                if (item.name === "area") {
                    item.isShow = true;
                    item.data = areas[fieldValue] || [];
                    return true;
                }
            });
        } else {
            formFields.find(item => item.name === "area")!.isShow = false;
        }
    }
};
</script>
