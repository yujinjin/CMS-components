<template>
    <div class="example-page">
        <h3>动态表单项</h3>
        <el-button type="primary" @click="handleOpen">打开表单</el-button>

        <dialog-form v-if="visible" ref="dialogFormRef" :input-form-props="{ fields, value: formData }" :dialog-props="{ title: '动态表单' }" :buttons="buttons" @close="visible = false">
            <template #specs="scope">
                <div class="specs-list">
                    <div v-for="(spec, index) in (scope as InputFormSlotScope).value" :key="index" class="spec-item">
                        <el-input v-model="spec.name" placeholder="规格名称" />
                        <el-input v-model="spec.value" placeholder="规格值" />
                        <el-button type="danger" @click="removeSpec(index, (scope as InputFormSlotScope).value)">删除</el-button>
                    </div>
                    <el-button type="primary" @click="addSpec((scope as InputFormSlotScope).value)">添加规格</el-button>
                </div>
            </template>

            <template #attributes="scope">
                <div class="dynamic-form">
                    <el-form v-for="(attr, index) in (scope as InputFormSlotScope).value" :key="index" inline>
                        <el-form-item>
                            <el-input v-model="attr.key" placeholder="属性名" />
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="attr.value" placeholder="属性值" />
                        </el-form-item>
                        <el-form-item>
                            <el-button type="danger" @click="removeAttribute(index, (scope as InputFormSlotScope).value)">删除</el-button>
                        </el-form-item>
                    </el-form>
                    <el-button type="primary" @click="addAttribute((scope as InputFormSlotScope).value)">添加属性</el-button>
                </div>
            </template>
        </dialog-form>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { type DialogFormRef, type DialogFormButton, type InputFormField, type InputFormSlotScope, DialogForm } from "@yujinjin/cms-components-main/index";

const visible = ref(false);

const dialogFormRef = ref<DialogFormRef>();

const formData = ref({
    name: "",
    category: "",
    specs: [{ name: "", value: "" }],
    attributes: [{ key: "", value: "" }]
});

const fields: InputFormField[] = [
    { name: "name", label: "商品名称", type: "input", rules: [{ required: true, message: "请输入商品名称" }] },
    {
        name: "category",
        label: "商品分类",
        type: "select",
        rules: [{ required: true, message: "请选择商品分类" }],
        data: [
            { label: "分类1", value: "1" },
            { label: "分类2", value: "2" }
        ]
    },
    { name: "specs", label: "规格", slot: "specs" },
    { name: "attributes", label: "属性", slot: "attributes" }
];

const handleOpen = () => {
    formData.value = {
        name: "",
        category: "",
        specs: [{ name: "", value: "" }],
        attributes: [{ key: "", value: "" }]
    };
    visible.value = true;
};

const addSpec = (value: Array<{ name: string; value: string }>) => {
    value.push({ name: "", value: "" });
};

const removeSpec = (index: number, value: Array<{ name: string; value: string }>) => {
    value.splice(index, 1);
};

const addAttribute = (value: Array<{ key: string; value: string }>) => {
    value.push({ key: "", value: "" });
};

const removeAttribute = (index: number, value: Array<{ key: string; value: string }>) => {
    value.splice(index, 1);
};

const handleSubmit = async (data: any) => {
    await dialogFormRef.value?.validate();
    ElMessage.info("提交数据:" + JSON.stringify(data));
};

const handleCancel = () => {
    ElMessage.info("取消");
};

const buttons = ref<DialogFormButton[]>([
    { type: "primary", contents: "提交", click: handleSubmit },
    { type: "danger", contents: "取消", click: handleCancel }
]);
</script>
<style lang="scss" scoped>
.example-page {
    padding: 12px;
}
.specs-list {
    .spec-item {
        display: flex;
        gap: 10px;
        margin-bottom: 10px;
    }
}
.dynamic-form {
    :deep(.el-form) {
        margin-bottom: 10px;
    }
}
</style>
