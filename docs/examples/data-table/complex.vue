<template>
    <div class="demo-box">
        <data-table :columns="columns" :query="queryList" :pagination="{ pageSize: 50 }" :props="{ height: 300 }">
            <template #dataTable_orderNo="{ row }">
                <table-column-copy :value="row.orderNo" />
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
        </data-table>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { type DataTableColumn } from "@yujinjin/cms-components/index";
import { QuestionFilled } from "@element-plus/icons-vue";
import tableColumnCopy from "./table-column-copy.vue";

// 订单状态枚举值
const ORDER_STATUS_ENUM = [
    {
        label: "订单取消",
        value: -1
    },
    {
        label: "售后中",
        value: -6
    },
    {
        label: "退款中",
        value: -7
    },
    {
        label: "已退款",
        value: -5
    },
    {
        label: "待付款",
        value: 10
    },
    {
        label: "待发货",
        value: 20
    },
    {
        label: "已发货",
        value: 30
    },
    {
        label: "已签收",
        value: 40
    },
    {
        label: "交易关闭",
        value: 50
    }
];

const DEVICE_SOURCE_ENUM = [
    {
        value: "H5",
        label: "移动端H5"
    },
    {
        value: "WXH5",
        label: "微信H5"
    },
    {
        value: "WXXCX",
        label: "微信小程序"
    },
    {
        value: "iOSApp",
        label: "iOS App"
    },
    {
        value: "androidApp",
        label: "android App"
    }
];

const columns = ref<DataTableColumn<any>[]>([
    {
        label: "选择",
        type: "selection",
        align: "center",
        width: 50
    },
    {
        label: "订单编号",
        prop: "orderNo",
        minWidth: 150,
        slot: "dataTable_orderNo"
    },
    {
        label: "订单状态",
        prop: "orderStatus",
        type: "enum",
        slotHeader: "dataTable_orderStatusHeader",
        width: 100,
        data: ORDER_STATUS_ENUM
    },
    {
        label: "下单设备",
        prop: "deviceSource",
        type: "enum",
        width: 100,
        data: DEVICE_SOURCE_ENUM
    },
    {
        label: "订单金额",
        prop: "orderAmount",
        type: "number",
        digit: 2,
        width: 100
    },
    {
        label: "实际支付金额",
        prop: "payAmount",
        type: "number",
        digit: 2,
        width: 120
    },
    {
        label: "订单时间",
        prop: "createTime",
        type: "date",
        formate: "YYYY-MM-DD HH:mm:ss",
        width: 140
    },
    {
        label: "支付时间",
        prop: "payTime",
        type: "date",
        formate: "YYYY-MM-DD HH:mm:ss",
        width: 200
    },
    {
        label: "订单商品数量",
        prop: "goodsNumber",
        width: 120
    },
    {
        label: "订单商品数量",
        prop: "goodsNumber",
        width: 120
    },
    {
        label: "订单商品图片",
        prop: "goodsImgs",
        type: "image",
        separator: ",",
        minWidth: 150
    },
    {
        label: "下单用户ID",
        prop: "buyerId",
        minWidth: 150
    },
    {
        label: "下单用户名称",
        prop: "buyerName",
        minWidth: 140
    },
    {
        label: "下单用户手机号",
        prop: "buyerMobileNumber",
        minWidth: 150
    },
    {
        label: "收货人",
        prop: "receiver",
        minWidth: 100
    },
    {
        label: "收货人电话",
        prop: "receiverMobileNumber",
        minWidth: 100
    },
    {
        label: "订单备注",
        isShow: false,
        prop: "remark",
        minWidth: 150,
        showOverflowTooltip: true
    },
    {
        type: "action",
        width: 120,
        buttons: [
            {
                contents: "查看",
                handleCode: "SEARCH"
            },
            {
                contents: "取消订单",
                handleCode: "CANCEL",
                display: function (row) {
                    return row.orderStatus === 10;
                }
            }
        ]
    }
]);

const queryList = async function () {
    return new Promise(resolve =>
        setTimeout(
            () =>
                resolve({
                    rows: [
                        {
                            orderNo: "ON201401131203340186",
                            orderAmount: 6049.2,
                            deviceSource: "WXXCX",
                            payAmount: 6579.4,
                            orderStatus: -7,
                            goodsNumber: 6,
                            buyerId: "UR548521864199",
                            buyerName: "吕平",
                            buyerMobileNumber: "15214436485",
                            receiver: "贾超",
                            receiverMobileNumber: "15012180463",
                            remark: "型除说论林开应务存党象每平工拉元改达手量信花照会连利手传交三并技角路小江交者理变图至术线主务即证相调速青低制图十基广音同强会约石论消酸参需设他总按热需这打。",
                            goodsImgs:
                                "http://dummyimage.com/200x200/79f27b/FFF.png&text=UR,http://dummyimage.com/200x200/79f2bc/FFF.png&text=VPKJJ,http://dummyimage.com/200x200/79f294/FFF.png&text=CMWP,http://dummyimage.com/200x200/9ff279/FFF.png&text=HWEFV,http://dummyimage.com/200x200/f29979/FFF.png&text=VUG",
                            payTime: 1734358087713,
                            createTime: 1734391212106
                        },
                        {
                            orderNo: "ON198208132361381178",
                            orderAmount: 7904.3,
                            deviceSource: "H5",
                            payAmount: 6286.73,
                            orderStatus: -5,
                            goodsNumber: 10,
                            buyerId: "UR465085177568",
                            buyerName: "梁强",
                            buyerMobileNumber: "13543931168",
                            receiver: "田勇",
                            receiverMobileNumber: "17561519635",
                            remark: "运只写象办证张手列直联比八一然省体体权省使社和世给深现压后应手手机四见国头难先。",
                            goodsImgs:
                                "http://dummyimage.com/200x200/8f79f2/FFF.png&text=GKI,http://dummyimage.com/200x200/f279a9/FFF.png&text=KESYM,http://dummyimage.com/200x200/f2b279/FFF.png&text=VOY,http://dummyimage.com/200x200/f279d2/FFF.png&text=QSINE,http://dummyimage.com/200x200/f28a79/FFF.png&text=WNCC,http://dummyimage.com/200x200/79f2ad/FFF.png&text=FUM,http://dummyimage.com/200x200/79f2ef/FFF.png&text=QRCSR,http://dummyimage.com/200x200/79b3f2/FFF.png&text=SSI,http://dummyimage.com/200x200/79f284/FFF.png&text=VBBH",
                            payTime: 1734720477273,
                            createTime: 1734362637364
                        },
                        {
                            orderNo: "ON200507190329223435",
                            orderAmount: 4466.2,
                            deviceSource: "iOSApp",
                            payAmount: 8854.4,
                            orderStatus: -6,
                            goodsNumber: 3,
                            buyerId: "UR436542723811",
                            buyerName: "韩明",
                            buyerMobileNumber: "18097863914",
                            receiver: "丁娟",
                            receiverMobileNumber: "14490874548",
                            remark: "斗月内流根带知市层先样山易代见例同建张小日前必划技面给常广处教温位方现过会天此级花直至装集油强难较军正调每名么工委打次义老合声式眼完中但细然全。",
                            goodsImgs: "http://dummyimage.com/200x200/7f79f2/FFF.png&text=HDW,http://dummyimage.com/200x200/79c3f2/FFF.png&text=EQHKW",
                            payTime: null,
                            createTime: 1734149566691
                        },
                        {
                            orderNo: "ON201201112059436986",
                            orderAmount: 9924.7,
                            deviceSource: "iOSApp",
                            payAmount: 9091.9,
                            orderStatus: -1,
                            goodsNumber: 13,
                            buyerId: "UR715572751494",
                            buyerName: "段涛",
                            buyerMobileNumber: "14215276704",
                            receiver: "蔡强",
                            receiverMobileNumber: "13774373627",
                            remark: "难济性属路技在学场表第好之党水按江千候花子较统江声全命他院无酸快只学还求我而采会平义切系原米物本压认确万级看体了全转。",
                            goodsImgs:
                                "http://dummyimage.com/200x200/da79f2/FFF.png&text=RII,http://dummyimage.com/200x200/f27987/FFF.png&text=KCP,http://dummyimage.com/200x200/cdf279/FFF.png&text=WNQ,http://dummyimage.com/200x200/f279c8/FFF.png&text=EAS,http://dummyimage.com/200x200/b179f2/FFF.png&text=UXI,http://dummyimage.com/200x200/79aaf2/FFF.png&text=NSJFW",
                            payTime: 1734807308661,
                            createTime: 1733980143724
                        }
                    ],
                    total: 40
                }),
            500
        )
    );
};
</script>
<style lang="scss" scoped>
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
