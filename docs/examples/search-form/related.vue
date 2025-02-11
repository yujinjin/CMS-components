<template>
    <div class="demo-box">
        <search-form :fields="fields" @search="handleSearch" @change="fieldsChangeHandle" />
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { type SearchFormField } from "@yujinjin/cms-components/index";

// 模拟数据
const categories = [
    { label: "电子产品", value: "electronics" },
    { label: "服装", value: "clothing" }
];

const subCategoryData = {
    electronics: [
        { label: "手机", value: "phone" },
        { label: "电脑", value: "computer" }
    ],
    clothing: [
        { label: "上衣", value: "tops" },
        { label: "裤子", value: "pants" }
    ]
};

const productData = {
    phone: [
        { label: "iPhone", value: "iphone" },
        { label: "华为", value: "huawei" }
    ],
    computer: [
        { label: "MacBook", value: "macbook" },
        { label: "ThinkPad", value: "thinkpad" }
    ],
    tops: [
        { label: "T恤", value: "tshirt" },
        { label: "衬衫", value: "shirt" }
    ],
    pants: [
        { label: "牛仔裤", value: "jeans" },
        { label: "休闲裤", value: "casual" }
    ]
};

const fields = ref<SearchFormField[]>([
    { name: "name", label: "名称", type: "input" },
    {
        name: "status",
        label: "状态",
        type: "select",
        data: [
            { label: "启用", value: "1" },
            { label: "禁用", value: "0" }
        ]
    },
    {
        name: "priority",
        label: "优先级",
        type: "select",
        data: [
            { label: "高", value: "high" },
            { label: "中", value: "medium" },
            { label: "低", value: "low" }
        ]
    },
    {
        name: "tags",
        label: "标签",
        type: "checkSelect",
        data: [
            { label: "标签1", value: "1" },
            { label: "标签2", value: "2" },
            { label: "标签3", value: "3" }
        ]
    },
    { name: "dateRange", label: "日期范围", props: { type: "daterange" }, type: "datePicker" },
    {
        name: "category",
        label: "主分类",
        type: "select",
        data: categories
    },
    {
        name: "subCategory",
        label: "子分类",
        type: "select",
        isShow: false,
        data: []
    },
    {
        name: "product",
        label: "产品",
        type: "select",
        isShow: false,
        data: []
    }
]);

const fieldsChangeHandle = function (formField: SearchFormField, formFields: SearchFormField[]) {
    if (formField.name === "category") {
        formFields[6].isShow = !!formField.value;
        formFields[6].value = "";
        formFields[7].isShow = false;
        formFields[7].value = "";
        if (formField.value) {
            formFields[6].data = subCategoryData[formField.value];
        }
    } else if (formField.name === "subCategory") {
        formFields[7].isShow = !!formField.value;
        formFields[7].value = "";
        if (formField.value) {
            formFields[7].data = productData[formField.value];
        }
    }
};

const handleSearch = (data: any) => {
    ElMessage.success("搜索数据:" + JSON.stringify(data));
};
</script>
