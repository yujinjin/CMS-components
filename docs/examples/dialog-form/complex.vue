<template>
    <div class="demo-box">
        <el-button type="primary" @click="handleOpen">打开表单</el-button>

        <dialog-form
            v-if="visible"
            ref="dialogFormRef"
            :input-form-props="{ fields: currentFields, value: formData }"
            :dialog-props="{ title: '分步表单' }"
            :buttons="buttons"
            @close="visible = false"
        >
            <el-steps :active="currentStep" finish-status="success" style="padding-bottom: 20px">
                <el-step title="基本信息" />
                <el-step title="详细信息" />
                <el-step title="确认信息" />
            </el-steps>
        </dialog-form>
    </div>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import { ElMessage } from "element-plus";
import { type DialogFormRef, type DialogFormButton, type InputFormField, DialogForm } from "@yujinjin/cms-components-main/index";

const visible = ref(false);
const currentStep = ref(0);

const dialogFormRef = ref<DialogFormRef>();

const fields: InputFormField[][] = [
    [
        { name: "name", label: "商品名称", type: "input", rules: [{ required: true, message: "请输入用户名" }] },
        {
            name: "type",
            label: "商品类型",
            type: "select",
            rules: [{ required: true, message: "请选择商品类型" }],
            data: [
                { label: "类型1", value: "1" },
                { label: "类型2", value: "2" }
            ]
        }
    ],
    [
        { name: "description", label: "商品描述", type: "input", rules: [{ required: true, message: "请填写商品描述" }] },
        { name: "price", label: "价格", type: "inputNumber", rules: [{ required: true, message: "请填写价格" }] },
        { name: "stock", label: "库存", type: "inputNumber", rules: [{ required: true, message: "请填写库存" }] }
    ],
    [{ name: "remark", label: "备注", type: "input", props: { type: "textarea" } }]
];

const currentFields = computed(() => fields[currentStep.value]);

const formData = ref({
    // 步骤1：基本信息
    name: "",
    type: "",
    // 步骤2：详细信息
    description: "",
    price: null,
    stock: null,
    // 步骤3：确认信息
    remark: ""
});

const handleOpen = () => {
    currentStep.value = 0;
    visible.value = true;
    formData.value = {
        name: "",
        type: "",
        description: "",
        price: null,
        stock: null,
        remark: ""
    };
};

const handleNext = async () => {
    await dialogFormRef.value?.validate();
    formData.value = Object.assign(formData.value, dialogFormRef.value?.getInputValue());
    if (currentStep.value < 2) {
        currentStep.value++;
    }
    dialogFormRef.value?.changeButtons(buttons => {
        buttons[0].isShow = true;
        buttons[1].isShow = currentStep.value < 2;
        buttons[2].isShow = currentStep.value === 2;
    });
    return false;
};

const handlePrev = async () => {
    await dialogFormRef.value?.validate();
    formData.value = Object.assign(formData.value, dialogFormRef.value?.getInputValue());
    if (currentStep.value > 0) {
        currentStep.value--;
    }
    dialogFormRef.value?.changeButtons(buttons => {
        buttons[0].isShow = currentStep.value > 0;
        buttons[1].isShow = true;
        buttons[2].isShow = false;
    });
    return false;
};

const handleSubmit = async (data: any) => {
    await dialogFormRef.value?.validate();
    Object.assign(formData.value, data);
    ElMessage.info("提交数据:" + JSON.stringify(formData.value));
};

const handleCancel = () => {
    ElMessage.info("取消");
};

const buttons = ref<DialogFormButton[]>([
    { type: "primary", contents: "上一步", isShow: false, click: handlePrev },
    { type: "primary", contents: "下一步", click: handleNext },
    { type: "primary", contents: "提交", click: handleSubmit },
    { type: "danger", contents: "取消", click: handleCancel }
]);
</script>
<style scoped>
.dialog-footer {
    text-align: right;
}
:deep(.el-steps) {
    margin-bottom: 20px;
}
</style>
