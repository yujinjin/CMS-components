<template>
    <div class="demo-box">
        <el-button type="primary" @click="handleOpen">打开表单</el-button>

        <dialog-form v-if="visible" ref="dialogFormRef" :input-form-props="inputFormData" :dialog-props="{ title: '商品信息' }" :buttons="buttons" @close="visible = false">
            <!-- 默认插槽 -->
            <div class="form-tips">
                <el-alert title="请填写完整的商品信息" type="info" :closable="true" />
            </div>
            <template #agreement="scope">
                <div class="form-agreement">
                    <el-checkbox v-model="(scope as InputFormSlotScope).formValue.agreement">我已阅读并同意服务条款</el-checkbox>
                </div>
            </template>
            <template #more>
                <el-dropdown style="margin-right: 12px">
                    <el-button>
                        更多操作
                        <el-icon class="el-icon--right"><arrow-down /></el-icon>
                    </el-button>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>预览</el-dropdown-item>
                            <el-dropdown-item>禁用</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </template>
        </dialog-form>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
import { ArrowDown } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { withBase } from "vitepress";
import { DialogForm, type InputFormProps, type DialogFormButton, type DialogFormRef, type InputFormSlotScope } from "@yujinjin/cms-components/index";

const visible = ref(false);

const dialogFormRef = ref<DialogFormRef>();

const uploadRequest = async (file: File) => {
    return withBase("/03.jpeg");
};

const inputFormData = reactive<InputFormProps>({
    fields: [
        { name: "name", label: "商品名称", type: "input", rules: [{ required: true, message: "请输入姓名" }] },
        { name: "price", label: "价格", type: "inputNumber", props: { min: 0, precision: 2 }, rules: [{ required: true, message: "请输入姓名" }] },
        { name: "images", label: "商品图片", type: "imgUpload", value: [], props: { uploadRequest } },
        { name: "description", label: "描述", type: "input", props: { type: "textarea" } },
        { name: "agreement", slot: "agreement", value: true }
    ]
});

const handleOpen = () => {
    visible.value = true;
};

const handleSubmit = async (data: any) => {
    await dialogFormRef.value?.validate();
    ElMessage.info(`提交数据: ${JSON.stringify(data)}`);
};

const handleCancel = () => {
    ElMessage.info("取消");
};

const buttons = ref<DialogFormButton[]>([{ slot: "more" }, { type: "primary", contents: "提交", click: handleSubmit }, { type: "danger", contents: "取消", click: handleCancel }]);
</script>
<style lang="scss" scoped>
.form-tips {
    margin-bottom: 20px;
}
.form-agreement {
    margin-top: 20px;
    text-align: center;
}
.dialog-footer {
    text-align: right;
}
</style>
