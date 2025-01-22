<template>
    <div class="example-page">
        <h3>自定义布局</h3>
        <search-page ref="searchPageRef" :search-form-props="searchFormProps" :action-bar-props="actionBarProps" :data-table-props="dataTableProps">
            <template #dataTable_orderNo="{ row }">
                <table-column-copy :value="row.orderNo" />
            </template>
            <template #actionBar_default>
                <el-radio-group v-model="dataTableProps.filters!.orderStatus" @change="refreshHandle">
                    <el-radio-button value="">全部订单({{ orertReportData.allCount }})</el-radio-button>
                    <el-radio-button :value="10">待付款({{ orertReportData.pendingCount }})</el-radio-button>
                    <el-radio-button :value="20">待发货({{ orertReportData.paidCount }})</el-radio-button>
                    <el-radio-button :value="30">已发货({{ orertReportData.deliveredCount }})</el-radio-button>
                    <el-radio-button :value="40">已签收({{ orertReportData.completedCount }})</el-radio-button>
                    <el-radio-button :value="-1">已取消({{ orertReportData.cancelledCount }})</el-radio-button>
                    <el-radio-button :value="-5">已退款({{ orertReportData.refundedCount }})</el-radio-button>
                </el-radio-group>
            </template>
            <template #dataTable_orderStatusHeader>
                <div class="order-status-header">
                    订单状态
                    <el-popover width="450" trigger="hover" popper-style="padding: 0px">
                        <div class="tips-popover">
                            <div class="title-text">订单状态说明</div>
                            <div class="subtitle-text">1.订单取消</div>
                            <div class="contents-text">订单因为某些原因被取消，比如用户取消订单或者商家无法完成订单。</div>
                            <div class="subtitle-text">2.售后中</div>
                            <div class="contents-text">用户在付款后发货前申请退款，或商家发货后用户申请退款、换货，都会产生这种订单状态。</div>
                            <div class="subtitle-text">3.退款中</div>
                            <div class="contents-text">当买家在待发货的时候，选择了订单中某个商品进行退款，此时订单进入状态“退款中”。</div>
                            <div class="subtitle-text">4.已退款</div>
                            <div class="contents-text">买家已经申请了售后服务退款，并且卖家已经同意退款，款项已经成功退回到买家的账户中。</div>
                            <div class="subtitle-text">5.待付款</div>
                            <div class="contents-text">用户刚提交订单，尚未付款，等待用户支付。由于待付款状态会锁定存，所以一般会设置超时自动取消功能。</div>
                            <div class="subtitle-text">6.待发货</div>
                            <div class="contents-text">用户付款之后，等待仓库出仓发货。</div>
                            <div class="subtitle-text">7.已发货</div>
                            <div class="contents-text">仓库已经将商品发出，用户可以通过物流信息了解商品的运输情况。</div>
                            <div class="subtitle-text">8.已签收</div>
                            <div class="contents-text">商品已经被用户签收，订单完成。</div>
                            <div class="subtitle-text">9.交易关闭</div>
                            <div class="contents-text">当售后完成后的订单状态。“已取消”的订单状态可以合并到“交易关闭”中。</div>
                        </div>
                        <template #reference>
                            <el-icon>
                                <QuestionFilled />
                            </el-icon>
                        </template>
                    </el-popover>
                </div>
            </template>
        </search-page>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import { SearchPage, type SearchPageRef } from "@yujinjin/cms-components/index";
import { QuestionFilled } from "@element-plus/icons-vue";
import tableColumnCopy from "./table-column-copy.vue";
import useSearchPage from "./use-search-page";

const searchPageRef = ref<SearchPageRef>();

// 当前订单统计数据
const orertReportData = reactive({
    allCount: 0,
    pendingCount: 0,
    paidCount: 0,
    deliveredCount: 0,
    completedCount: 0,
    cancelledCount: 0,
    refundedCount: 0
});

const refreshHandle = function () {
    searchPageRef.value?.query();
};

const showDialogHandle = function (rows, { handleCode }) {
    if (handleCode === "CREATE") {
        ElMessage.info("新建");
    } else if (handleCode === "CUSTOMCOLUMN") {
        ElMessage.info("隐藏数据列");
        searchPageRef.value?.updateTableColumnsShowStatus(["orderNo", "orderStatus", "deviceSource", "orderAmount", "payAmount", "createTime", "payTime", "goodsNumber", "goodsNumber"]);
    } else if (handleCode === "SEARCH") {
        ElMessage.info("查看");
    }
};

const excelExportHandle = function () {
    ElMessage.info("导出Excel");
};

const cancelOrderHandle = function (row: any) {
    ElMessage.info("取消订单，订单编号：" + row.orderNo);
};

const { searchFormProps, actionBarProps, dataTableProps } = useSearchPage({ showDialogHandle, excelExportHandle, cancelOrderHandle, orertReportData });
</script>
<style lang="scss" scoped>
.example-page {
    padding: 12px;
}
.order-status-header {
    display: flex;
    align-items: center;

    .el-icon {
        color: #999;
        font-size: 16px;
        margin-left: 4px;
    }
}
.tips-popover {
    padding: 12px 24px;
    max-height: 300px;
    overflow-y: auto;

    .title-text {
        text-align: center;
        padding-bottom: 5px;
        line-height: 30px;
        font-size: 18px;
        color: #000;
    }

    .subtitle-text {
        padding: 5px 0px;
        line-height: 25px;
        font-size: 15px;
        color: #000;
    }

    .contents-text {
        line-height: 20px;
        font-size: 13px;
    }
}
</style>
