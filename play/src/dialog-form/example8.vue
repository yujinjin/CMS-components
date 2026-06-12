<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2026-06-11 10:00:00
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2026-06-11 10:00:00
 * @项目的路径: \CMS-components\play\src\dialog-form\example8.vue
 * @描述: dialog-form组件的dialogProps与阻止关闭示例
-->
<template>
    <div class="example-page">
        <h3>dialogProps 与阻止关闭</h3>
        <p class="demo-desc">通过 dialogProps 自定义弹窗属性（宽度、标题等），按钮 click 返回 false 可阻止弹窗自动关闭。</p>

        <div class="button-panel">
            <el-button type="primary" @click="openDialog('normal')">普通弹窗（正常关闭）</el-button>
            <el-button type="warning" @click="openDialog('prevent')">阻止关闭弹窗</el-button>
        </div>

        <!-- 普通弹窗 -->
        <dialog-form
            v-if="normalVisible"
            :input-form-props="{ fields, value: formData }"
            :dialog-props="{ title: '普通弹窗', width: '500px' }"
            :buttons="normalButtons"
            @close="normalVisible = false"
        />

        <!-- 阻止关闭弹窗 -->
        <dialog-form
            v-if="preventVisible"
            :input-form-props="{ fields, value: formData }"
            :dialog-props="{ title: '阻止关闭弹窗（验证失败不关闭）', width: '600px' }"
            :buttons="preventButtons"
            @close="preventVisible = false"
        />
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { type DialogFormButton, type InputFormField, DialogForm } from "@yujinjin/cms-components-main/index";

// 普通弹窗是否可见
const normalVisible = ref(false);

// 阻止关闭弹窗是否可见
const preventVisible = ref(false);

// 表单数据
const formData = ref({
    name: "",
    age: null,
    gender: ""
});

// 表单字段配置
const fields: InputFormField[] = [
    { name: "name", label: "姓名", type: "input", rules: [{ required: true, message: "请输入姓名" }] },
    { name: "age", label: "年龄", type: "inputNumber" },
    {
        name: "gender",
        label: "性别",
        type: "select",
        data: [
            { label: "男", value: "male" },
            { label: "女", value: "female" }
        ]
    }
];

/** 打开弹窗 */
const openDialog = (type: string) => {
    formData.value = { name: "", age: null, gender: "" };
    if (type === "normal") {
        normalVisible.value = true;
    } else {
        preventVisible.value = true;
    }
};

// 普通弹窗按钮 - 确认后直接关闭
const normalButtons = ref<DialogFormButton[]>([
    {
        type: "primary",
        contents: "确认提交",
        click: () => {
            ElMessage.success("提交成功，弹窗将自动关闭");
            return true;
        }
    },
    {
        contents: "取消",
        click: () => {
            return true;
        }
    }
]);

// 阻止关闭弹窗按钮 - 确认时验证失败返回 false 阻止关闭
const preventButtons = ref<DialogFormButton[]>([
    {
        type: "primary",
        contents: "确认（验证失败阻止关闭）",
        click: async (_value: any, formRef: any) => {
            try {
                if (formRef) {
                    await formRef.validate();
                }
                ElMessage.success("验证通过，弹窗将关闭");
                return true;
            } catch {
                ElMessage.error("验证失败，弹窗不会关闭");
                return false;
            }
        }
    },
    {
        contents: "取消",
        click: () => {
            return true;
        }
    }
]);
</script>
