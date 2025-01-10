<template>
    <div class="example-page">
        <data-table :columns="columns" :query="queryList" :pagination="{ pageSize: 50 }">
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
import { type DataTableColumn, DataTable } from "@yujinjin/cms-components/index";
import { ref } from "vue";
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
        width: 140
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
        minWidth: 100
    },
    {
        label: "下单用户手机号",
        prop: "buyerMobileNumber",
        minWidth: 120
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
                        },
                        {
                            orderNo: "ON199706052281603081",
                            orderAmount: 8092.3,
                            deviceSource: "WXXCX",
                            payAmount: 6333.06,
                            orderStatus: -5,
                            goodsNumber: 4,
                            buyerId: "UR943216106897",
                            buyerName: "熊杰",
                            buyerMobileNumber: "15361787547",
                            receiver: "姜秀兰",
                            receiverMobileNumber: "15386593588",
                            remark: "存期又今开号音变劳更多据率角油却例四多管西联各作较口斗段手者那热提原整。",
                            goodsImgs: "http://dummyimage.com/200x200/b4f279/FFF.png&text=CUPH,http://dummyimage.com/200x200/f28479/FFF.png&text=PT",
                            payTime: null,
                            createTime: 1733221462911
                        },
                        {
                            orderNo: "ON202403161437622952",
                            orderAmount: 1106.1,
                            deviceSource: "WXH5",
                            payAmount: 5210.78,
                            orderStatus: -5,
                            goodsNumber: 10,
                            buyerId: "UR037712114274",
                            buyerName: "黄平",
                            buyerMobileNumber: "18672476684",
                            receiver: "罗娜",
                            receiverMobileNumber: "18100406133",
                            remark: "名来重量放织得广结展导社严位院八般过没完产例子安了九习它局话除以除样对件近要以石克文年系却非记整党月代可果命象角性目又己些成产五长响何温越红严三三我点队例温群公形万了路度美级与采才。",
                            goodsImgs:
                                "http://dummyimage.com/200x200/79e2f2/FFF.png&text=MGNC,http://dummyimage.com/200x200/ecf279/FFF.png&text=WI,http://dummyimage.com/200x200/f279e7/FFF.png&text=GPHQ,http://dummyimage.com/200x200/c4f279/FFF.png&text=TZD",
                            payTime: 1734398249897,
                            createTime: 1735458187909
                        },
                        {
                            orderNo: "ON198204300916322639",
                            orderAmount: 9714.8,
                            deviceSource: "WXXCX",
                            payAmount: 953.73,
                            orderStatus: -5,
                            goodsNumber: 12,
                            buyerId: "UR123995284353",
                            buyerName: "蔡军",
                            buyerMobileNumber: "15160055022",
                            receiver: "史艳",
                            receiverMobileNumber: "18576655188",
                            remark: "二场广格应何安保物者万边可干看使除照品酸两段。",
                            goodsImgs:
                                "http://dummyimage.com/200x200/92f279/FFF.png&text=EBLX,http://dummyimage.com/200x200/f279b5/FFF.png&text=ITXIG,http://dummyimage.com/200x200/f279ce/FFF.png&text=UVP,http://dummyimage.com/200x200/f27e79/FFF.png&text=JWJ,http://dummyimage.com/200x200/d3f279/FFF.png&text=VPY,http://dummyimage.com/200x200/79f288/FFF.png&text=THJ,http://dummyimage.com/200x200/c579f2/FFF.png&text=DMEZX,http://dummyimage.com/200x200/f2cf79/FFF.png&text=JQ,http://dummyimage.com/200x200/f2798c/FFF.png&text=ENMS",
                            payTime: 1735050100183,
                            createTime: 1734704429351
                        },
                        {
                            orderNo: "ON197211290915894079",
                            orderAmount: 2596.6,
                            deviceSource: "WXXCX",
                            payAmount: 9097.7,
                            orderStatus: -5,
                            goodsNumber: 13,
                            buyerId: "UR574811438831",
                            buyerName: "易桂英",
                            buyerMobileNumber: "19823693578",
                            receiver: "汤刚",
                            receiverMobileNumber: "18508636438",
                            remark: "。",
                            goodsImgs:
                                "http://dummyimage.com/200x200/f279c4/FFF.png&text=NWK,http://dummyimage.com/200x200/79f2ba/FFF.png&text=COY,http://dummyimage.com/200x200/f279dd/FFF.png&text=FOYVW,http://dummyimage.com/200x200/9c79f2/FFF.png&text=BGT,http://dummyimage.com/200x200/baf279/FFF.png&text=VS,http://dummyimage.com/200x200/7997f2/FFF.png&text=AXWL,http://dummyimage.com/200x200/f2799c/FFF.png&text=LMJX,http://dummyimage.com/200x200/b579f2/FFF.png&text=JYYP,http://dummyimage.com/200x200/e3f279/FFF.png&text=THTC,http://dummyimage.com/200x200/a1f279/FFF.png&text=HXS,http://dummyimage.com/200x200/de79f2/FFF.png&text=NVN",
                            payTime: 1735685086488,
                            createTime: 1735372592131
                        },
                        {
                            orderNo: "ON199810051578918964",
                            orderAmount: 1459.54,
                            deviceSource: "androidApp",
                            payAmount: 2272.5,
                            orderStatus: 10,
                            goodsNumber: 19,
                            buyerId: "UR087545332669",
                            buyerName: "黄杰",
                            buyerMobileNumber: "17223932857",
                            receiver: "尹伟",
                            receiverMobileNumber: "14723483311",
                            remark: "做全例克意向都容共信来去设市验具无先直点快织联观人水回要张除区员况拉比省际道系包商维史点证状厂般却圆没没进美下规什外何领交起我真问向表己山志学工条特内需命好体例且明米据先办何深。",
                            goodsImgs:
                                "http://dummyimage.com/200x200/f279d4/FFF.png&text=YNPKN,http://dummyimage.com/200x200/f2c979/FFF.png&text=MWNC,http://dummyimage.com/200x200/798df2/FFF.png&text=SA,http://dummyimage.com/200x200/79cff2/FFF.png&text=JJ,http://dummyimage.com/200x200/79f2d3/FFF.png&text=SCKDG,http://dummyimage.com/200x200/b1f279/FFF.png&text=MNB,http://dummyimage.com/200x200/f2b079/FFF.png&text=SNK,http://dummyimage.com/200x200/f28779/FFF.png&text=MUX,http://dummyimage.com/200x200/79a6f2/FFF.png&text=GACXD,http://dummyimage.com/200x200/caf279/FFF.png&text=BK,http://dummyimage.com/200x200/f279ab/FFF.png&text=KVC,http://dummyimage.com/200x200/79f2ab/FFF.png&text=RIN,http://dummyimage.com/200x200/8d79f2/FFF.png&text=LHU,http://dummyimage.com/200x200/a679f2/FFF.png&text=DPJOY,http://dummyimage.com/200x200/f279ed/FFF.png&text=WBVP",
                            payTime: 1733343283512,
                            createTime: 1734842672322
                        },
                        {
                            orderNo: "ON199308030014578131",
                            orderAmount: 8317.4,
                            deviceSource: "WXH5",
                            payAmount: 1224.7,
                            orderStatus: 20,
                            goodsNumber: 15,
                            buyerId: "UR958578415478",
                            buyerName: "蒋霞",
                            buyerMobileNumber: "15633553123",
                            receiver: "石杰",
                            receiverMobileNumber: "13197932212",
                            remark: "存江回标此眼七合广到。",
                            goodsImgs: "http://dummyimage.com/200x200/f27979/FFF.png&text=UGH,http://dummyimage.com/200x200/79b6f2/FFF.png&text=XYUE",
                            payTime: 1734611627337,
                            createTime: 1735575574393
                        },
                        {
                            orderNo: "ON201404140113171796",
                            orderAmount: 5315.2,
                            deviceSource: "iOSApp",
                            payAmount: 2846.34,
                            orderStatus: -7,
                            goodsNumber: 8,
                            buyerId: "UR965948293248",
                            buyerName: "苏娟",
                            buyerMobileNumber: "17027426374",
                            receiver: "丁洋",
                            receiverMobileNumber: "16881427117",
                            remark: "科比东通级列交科头期研器工况是转。",
                            goodsImgs: "http://dummyimage.com/200x200/f2d279/FFF.png&text=FKQRC,http://dummyimage.com/200x200/f29179/FFF.png&text=DLQ",
                            payTime: null,
                            createTime: 1734673686718
                        },
                        {
                            orderNo: "ON197912182298449137",
                            orderAmount: 2671.78,
                            deviceSource: "WXH5",
                            payAmount: 2817.78,
                            orderStatus: -1,
                            goodsNumber: 13,
                            buyerId: "UR532620968865",
                            buyerName: "邱军",
                            buyerMobileNumber: "13565952533",
                            receiver: "董平",
                            receiverMobileNumber: "14637523046",
                            remark: "等形文能白文想用她维传海真查层群斯在速做非常此新响铁都度石温识引受类极法总被越区克研总边老根还达无给里入它周联建此正科对连义面色集联点无日且直才实太状养知非离克农山价名调文包切但加计十她及将。",
                            goodsImgs:
                                "http://dummyimage.com/200x200/a079f2/FFF.png&text=XJO,http://dummyimage.com/200x200/79f2a5/FFF.png&text=CHSMB,http://dummyimage.com/200x200/b6f279/FFF.png&text=LUL,http://dummyimage.com/200x200/f2ec79/FFF.png&text=GGW,http://dummyimage.com/200x200/c879f2/FFF.png&text=QT,http://dummyimage.com/200x200/f2c379/FFF.png&text=BVW",
                            payTime: 1735348677560,
                            createTime: 1733780977485
                        },
                        {
                            orderNo: "ON200708060777872450",
                            orderAmount: 658.5,
                            deviceSource: "iOSApp",
                            payAmount: 2505.02,
                            orderStatus: 10,
                            goodsNumber: 15,
                            buyerId: "UR846241717960",
                            buyerName: "郭刚",
                            buyerMobileNumber: "18043683235",
                            receiver: "孙军",
                            receiverMobileNumber: "15456189422",
                            remark: "便级构国原九三门治技正结矿成力程上整族风但米称般与适品是响口效适老角值影路听要铁斗准被南包用法气断间月时或些应物别场将法北相基。",
                            goodsImgs:
                                "http://dummyimage.com/200x200/f279a8/FFF.png&text=CZZ,http://dummyimage.com/200x200/c6f279/FFF.png&text=POI,http://dummyimage.com/200x200/f29b79/FFF.png&text=JLKU,http://dummyimage.com/200x200/f2b479/FFF.png&text=PIPH,http://dummyimage.com/200x200/9df279/FFF.png&text=UJP,http://dummyimage.com/200x200/84f279/FFF.png&text=UYBS,http://dummyimage.com/200x200/b979f2/FFF.png&text=RDV,http://dummyimage.com/200x200/f279e9/FFF.png&text=GVQUA,http://dummyimage.com/200x200/79cbf2/FFF.png&text=UADND,http://dummyimage.com/200x200/eef279/FFF.png&text=LX,http://dummyimage.com/200x200/797af2/FFF.png&text=SGLL,http://dummyimage.com/200x200/79f2d7/FFF.png&text=GLWU",
                            payTime: 1733676822209,
                            createTime: 1734864400062
                        },
                        {
                            orderNo: "ON202108132265219180",
                            orderAmount: 7009.06,
                            deviceSource: "WXH5",
                            payAmount: 7730.8,
                            orderStatus: -6,
                            goodsNumber: 3,
                            buyerId: "UR400951743263",
                            buyerName: "汪丽",
                            buyerMobileNumber: "18776593092",
                            receiver: "萧秀兰",
                            receiverMobileNumber: "18873808531",
                            remark: "话层心快米就结线复济但往或求平实生日儿关算级必看三较四织性电确因化个有想具有带得同据市公很温制起比它消成没阶划第世至根那工。",
                            goodsImgs: "http://dummyimage.com/200x200/79f2ae/FFF.png&text=YMQ",
                            payTime: 1734054706848,
                            createTime: 1734321787580
                        },
                        {
                            orderNo: "ON200302180469627749",
                            orderAmount: 9170.5,
                            deviceSource: "androidApp",
                            payAmount: 1082.37,
                            orderStatus: -7,
                            goodsNumber: 2,
                            buyerId: "UR244789845624",
                            buyerName: "高超",
                            buyerMobileNumber: "13455287959",
                            receiver: "邓敏",
                            receiverMobileNumber: "13768133891",
                            remark: "区理无九该上定义大规对据布调几界委更受管最空回存米农规反采铁只建团难相达际许平历育深按头转消却声起门群分增效那结复来实。",
                            goodsImgs: "http://dummyimage.com/200x200/9a79f2/FFF.png&text=RMGD,http://dummyimage.com/200x200/7980f2/FFF.png&text=HCC",
                            payTime: null,
                            createTime: 1734543950511
                        },
                        {
                            orderNo: "ON197801080352562794",
                            orderAmount: 570.7,
                            deviceSource: "iOSApp",
                            payAmount: 510.85,
                            orderStatus: 40,
                            goodsNumber: 17,
                            buyerId: "UR667476421635",
                            buyerName: "侯勇",
                            buyerMobileNumber: "14292226017",
                            receiver: "曾静",
                            receiverMobileNumber: "19108263168",
                            remark: "可样派深道气文总两低布府许队理全装应保见志同取组分化里严气果据验走路把受市始没天快主际等强等干华所周同层多太。",
                            goodsImgs: "http://dummyimage.com/200x200/f27985/FFF.png&text=MFBY",
                            payTime: 1735458855822,
                            createTime: 1735522385475
                        },
                        {
                            orderNo: "ON200411012083012476",
                            orderAmount: 6276.08,
                            deviceSource: "WXH5",
                            payAmount: 2586.94,
                            orderStatus: 40,
                            goodsNumber: 10,
                            buyerId: "UR352569898161",
                            buyerName: "程丽",
                            buyerMobileNumber: "16978808537",
                            receiver: "邵霞",
                            receiverMobileNumber: "18229122653",
                            remark: "反可结斯高元龙形。",
                            goodsImgs:
                                "http://dummyimage.com/200x200/a379f2/FFF.png&text=KQ,http://dummyimage.com/200x200/79f280/FFF.png&text=HKTA,http://dummyimage.com/200x200/f2c779/FFF.png&text=LWZ,http://dummyimage.com/200x200/79f2c2/FFF.png&text=KIBY,http://dummyimage.com/200x200/9af279/FFF.png&text=SOML",
                            payTime: null,
                            createTime: 1734367416414
                        },
                        {
                            orderNo: "ON200306040141385216",
                            orderAmount: 8227.21,
                            deviceSource: "H5",
                            payAmount: 5640.3,
                            orderStatus: 40,
                            goodsNumber: 14,
                            buyerId: "UR433136143130",
                            buyerName: "毛桂英",
                            buyerMobileNumber: "15434156925",
                            receiver: "方秀兰",
                            receiverMobileNumber: "15826632352",
                            remark: "给东七细界思眼如号局以资始别安她定都出着面土些却各一多国办律类布和际白包精人向快红记治今收据价验指向区无象花量开己水往干快意方空红身委日儿水细道量状维立非党适水率较务门生完该六转火。",
                            goodsImgs: "http://dummyimage.com/200x200/ebf279/FFF.png&text=HXZI,http://dummyimage.com/200x200/f279e6/FFF.png&text=KF",
                            payTime: null,
                            createTime: 1734329236394
                        },
                        {
                            orderNo: "ON200011231983241648",
                            orderAmount: 7048.81,
                            deviceSource: "androidApp",
                            payAmount: 1074.75,
                            orderStatus: 20,
                            goodsNumber: 17,
                            buyerId: "UR458473330171",
                            buyerName: "秦秀兰",
                            buyerMobileNumber: "17653771026",
                            receiver: "郭杰",
                            receiverMobileNumber: "18890121883",
                            remark: "院象增门场院精作被动养者只真先很管派究意化温构其不给铁区住变验很积合家济美满复石指多严红江般照理指号极历置联别属们难。",
                            goodsImgs:
                                "http://dummyimage.com/200x200/c679f2/FFF.png&text=XQWVD,http://dummyimage.com/200x200/d2f279/FFF.png&text=XNMT,http://dummyimage.com/200x200/90f279/FFF.png&text=MFJ,http://dummyimage.com/200x200/79d7f2/FFF.png&text=RNB,http://dummyimage.com/200x200/b9f279/FFF.png&text=MKSP,http://dummyimage.com/200x200/79f2a3/FFF.png&text=UGBZH,http://dummyimage.com/200x200/9d79f2/FFF.png&text=WUDM",
                            payTime: 1734963513497,
                            createTime: 1735419050823
                        },
                        {
                            orderNo: "ON197906221775846872",
                            orderAmount: 2045.47,
                            deviceSource: "H5",
                            payAmount: 645.8,
                            orderStatus: -5,
                            goodsNumber: 14,
                            buyerId: "UR779972989641",
                            buyerName: "朱芳",
                            buyerMobileNumber: "16483484780",
                            receiver: "杨娜",
                            receiverMobileNumber: "14478147171",
                            remark: "温求验色气标单儿生时达听光图重始多分年节家我养京放持员展里列很府除用元已更决清他开队先利期强音资十六美定音标数于还传没别热因提具果下专西对数低局。",
                            goodsImgs:
                                "http://dummyimage.com/200x200/797cf2/FFF.png&text=HAXK,http://dummyimage.com/200x200/f279ec/FFF.png&text=QNIJ,http://dummyimage.com/200x200/f2da79/FFF.png&text=UBK,http://dummyimage.com/200x200/c8f279/FFF.png&text=UXX,http://dummyimage.com/200x200/f2799b/FFF.png&text=VVDG",
                            payTime: 1733446997152,
                            createTime: 1733199362159
                        },
                        {
                            orderNo: "ON199405120254163781",
                            orderAmount: 8563.88,
                            deviceSource: "iOSApp",
                            payAmount: 4328.5,
                            orderStatus: 50,
                            goodsNumber: 10,
                            buyerId: "UR365237927361",
                            buyerName: "彭丽",
                            buyerMobileNumber: "14534687337",
                            receiver: "孔涛",
                            receiverMobileNumber: "19888222957",
                            remark: "特变称然领除业运进约论价阶眼就集却线少细叫最取日专满员严素少组做还时近群北场法克都技空只基以非作量适金但用社四起被受五说院飞点速然民究我又王与素然化满行计金做己该年处必儿响十。",
                            goodsImgs:
                                "http://dummyimage.com/200x200/d8f279/FFF.png&text=MOIH,http://dummyimage.com/200x200/cf79f2/FFF.png&text=FKNT,http://dummyimage.com/200x200/f1f279/FFF.png&text=LNR,http://dummyimage.com/200x200/79f2ee/FFF.png&text=MTEJ,http://dummyimage.com/200x200/f2ca79/FFF.png&text=YYBY,http://dummyimage.com/200x200/79b4f2/FFF.png&text=FFYS,http://dummyimage.com/200x200/79f2ac/FFF.png&text=CYM,http://dummyimage.com/200x200/aff279/FFF.png&text=WMAT",
                            payTime: 1734718374122,
                            createTime: 1734176038943
                        },
                        {
                            orderNo: "ON201703291958326232",
                            orderAmount: 3565.9,
                            deviceSource: "WXH5",
                            payAmount: 8164.4,
                            orderStatus: -7,
                            goodsNumber: 2,
                            buyerId: "UR357833056113",
                            buyerName: "侯超",
                            buyerMobileNumber: "14262652653",
                            receiver: "马刚",
                            receiverMobileNumber: "13759549006",
                            remark: "争定华回。",
                            goodsImgs: "http://dummyimage.com/200x200/d979f2/FFF.png&text=CB,http://dummyimage.com/200x200/f2e379/FFF.png&text=WMW",
                            payTime: 1734350889959,
                            createTime: 1733387053240
                        },
                        {
                            orderNo: "ON200705051048811035",
                            orderAmount: 8981.31,
                            deviceSource: "WXH5",
                            payAmount: 2348.67,
                            orderStatus: -6,
                            goodsNumber: 18,
                            buyerId: "UR782878928138",
                            buyerName: "杜磊",
                            buyerMobileNumber: "18076259516",
                            receiver: "石涛",
                            receiverMobileNumber: "15110146939",
                            remark: "或消流东构文还教矿感美值参白想。",
                            goodsImgs: "http://dummyimage.com/200x200/79f28d/FFF.png&text=UOL",
                            payTime: 1735746651970,
                            createTime: 1734407391594
                        },
                        {
                            orderNo: "ON201304041330645510",
                            orderAmount: 680.4,
                            deviceSource: "WXH5",
                            payAmount: 1859.4,
                            orderStatus: -5,
                            goodsNumber: 6,
                            buyerId: "UR754037516307",
                            buyerName: "姚平",
                            buyerMobileNumber: "15393315747",
                            receiver: "郑勇",
                            receiverMobileNumber: "18057307834",
                            remark: "快高共利都好万九向点常此导青任受持何市联量太物图组究有社却难还白更指何如万已厂那水开斗种当道矿全多其标引共想发组然通争传阶改育府行克队发集外等能思价却根头什名号地心组年己转求接社难门计重车。",
                            goodsImgs: "http://dummyimage.com/200x200/f29c79/FFF.png&text=JSYDE,http://dummyimage.com/200x200/79baf2/FFF.png&text=DKBE",
                            payTime: 1734209626117,
                            createTime: 1734306181151
                        },
                        {
                            orderNo: "ON201503270910017477",
                            orderAmount: 5555.53,
                            deviceSource: "WXXCX",
                            payAmount: 8614.76,
                            orderStatus: 50,
                            goodsNumber: 5,
                            buyerId: "UR414115215123",
                            buyerName: "段强",
                            buyerMobileNumber: "16584559528",
                            receiver: "钱平",
                            receiverMobileNumber: "16515148710",
                            remark: "影习器现江队确低世团格强任风南才前包九半次话习么委亲比适果住议已条节科计其众音研及满少话想元质。",
                            goodsImgs:
                                "http://dummyimage.com/200x200/f28c79/FFF.png&text=WBTHX,http://dummyimage.com/200x200/ba79f2/FFF.png&text=NPJ,http://dummyimage.com/200x200/79f2f1/FFF.png&text=MGL,http://dummyimage.com/200x200/79caf2/FFF.png&text=PMV,http://dummyimage.com/200x200/d379f2/FFF.png&text=GLTY",
                            payTime: 1733971173385,
                            createTime: 1734412258949
                        },
                        {
                            orderNo: "ON199505061710662155",
                            orderAmount: 5411.1,
                            deviceSource: "WXH5",
                            payAmount: 2851.48,
                            orderStatus: 40,
                            goodsNumber: 7,
                            buyerId: "UR378634879173",
                            buyerName: "唐芳",
                            buyerMobileNumber: "13192852488",
                            receiver: "汪强",
                            receiverMobileNumber: "18986731497",
                            remark: "前方则五变月光且极术养山况许低原三增对下光思不指五局商型设那领除气片查带有反高布话界单见例马府些省节传天级根只于织织际做解。",
                            goodsImgs:
                                "http://dummyimage.com/200x200/8279f2/FFF.png&text=GZ,http://dummyimage.com/200x200/ab79f2/FFF.png&text=MDF,http://dummyimage.com/200x200/79f2a0/FFF.png&text=WSI",
                            payTime: 1733729760552,
                            createTime: 1735304688503
                        },
                        {
                            orderNo: "ON199311150259478116",
                            orderAmount: 442.93,
                            deviceSource: "WXXCX",
                            payAmount: 467.18,
                            orderStatus: 10,
                            goodsNumber: 16,
                            buyerId: "UR331137322572",
                            buyerName: "康艳",
                            buyerMobileNumber: "19278323579",
                            receiver: "郭强",
                            receiverMobileNumber: "15774855267",
                            remark: "发得料证技样易同没会在外没。",
                            goodsImgs:
                                "http://dummyimage.com/200x200/f29679/FFF.png&text=YFEK,http://dummyimage.com/200x200/f2d879/FFF.png&text=FOK,http://dummyimage.com/200x200/f2bf79/FFF.png&text=MUAX,http://dummyimage.com/200x200/dd79f2/FFF.png&text=ZEE,http://dummyimage.com/200x200/f279c5/FFF.png&text=MNREV,http://dummyimage.com/200x200/b479f2/FFF.png&text=QHE,http://dummyimage.com/200x200/e3f279/FFF.png&text=AKTXA,http://dummyimage.com/200x200/79a7f2/FFF.png&text=RUXP,http://dummyimage.com/200x200/79f279/FFF.png&text=IZP,http://dummyimage.com/200x200/f2799d/FFF.png&text=LQILD,http://dummyimage.com/200x200/797ff2/FFF.png&text=BYDQ,http://dummyimage.com/200x200/79f291/FFF.png&text=YPQ,http://dummyimage.com/200x200/9b79f2/FFF.png&text=NJP,http://dummyimage.com/200x200/caf279/FFF.png&text=JC",
                            payTime: 1734555408936,
                            createTime: 1734952040078
                        },
                        {
                            orderNo: "ON199209192076143510",
                            orderAmount: 3559.4,
                            deviceSource: "iOSApp",
                            payAmount: 8657.25,
                            orderStatus: 50,
                            goodsNumber: 5,
                            buyerId: "UR034726176213",
                            buyerName: "廖刚",
                            buyerMobileNumber: "18378626451",
                            receiver: "郑涛",
                            receiverMobileNumber: "19965637891",
                            remark: "统特处应干为即体层斯性设第立度电各种片观。",
                            goodsImgs: "http://dummyimage.com/200x200/f2c879/FFF.png&text=FEWGM,http://dummyimage.com/200x200/798ef2/FFF.png&text=SVA",
                            payTime: 1734606056693,
                            createTime: 1733848937344
                        },
                        {
                            orderNo: "ON201510202049220515",
                            orderAmount: 2083.2,
                            deviceSource: "WXXCX",
                            payAmount: 166.18,
                            orderStatus: 50,
                            goodsNumber: 18,
                            buyerId: "UR415118447727",
                            buyerName: "黄娟",
                            buyerMobileNumber: "13516498383",
                            receiver: "陈涛",
                            receiverMobileNumber: "17220915813",
                            remark: "管现时法第据子前权世观包规法如观说能在五应机马只性支义必维增约布走但存以。",
                            goodsImgs:
                                "http://dummyimage.com/200x200/f279e4/FFF.png&text=XTQZ,http://dummyimage.com/200x200/799ef2/FFF.png&text=OGLY,http://dummyimage.com/200x200/f2a079/FFF.png&text=IVP,http://dummyimage.com/200x200/7ff279/FFF.png&text=WCUR,http://dummyimage.com/200x200/79f2dc/FFF.png&text=QVLOW,http://dummyimage.com/200x200/79dff2/FFF.png&text=SWH,http://dummyimage.com/200x200/f2797a/FFF.png&text=EFN,http://dummyimage.com/200x200/7c79f2/FFF.png&text=CYC,http://dummyimage.com/200x200/79f29a/FFF.png&text=OYFMI,http://dummyimage.com/200x200/be79f2/FFF.png&text=LICIS,http://dummyimage.com/200x200/f2b979/FFF.png&text=LOCR,http://dummyimage.com/200x200/e679f2/FFF.png&text=XMGS,http://dummyimage.com/200x200/79f2c3/FFF.png&text=NRIPC,http://dummyimage.com/200x200/9579f2/FFF.png&text=XPC,http://dummyimage.com/200x200/f279a3/FFF.png&text=TVEES,http://dummyimage.com/200x200/f2e179/FFF.png&text=UDW",
                            payTime: 1733982072467,
                            createTime: 1734091672292
                        },
                        {
                            orderNo: "ON199411240091788214",
                            orderAmount: 3558.63,
                            deviceSource: "iOSApp",
                            payAmount: 2576.7,
                            orderStatus: -7,
                            goodsNumber: 10,
                            buyerId: "UR486588531040",
                            buyerName: "崔秀英",
                            buyerMobileNumber: "14559922401",
                            receiver: "韩秀兰",
                            receiverMobileNumber: "15851177596",
                            remark: "人面将织图必事上书内多电原八出装算车因调住干织就战话了极前太果她车以应或结民争往准长义也严其号参难太从学候属八以天通理海深志条近品什新易须于点。",
                            goodsImgs:
                                "http://dummyimage.com/200x200/a8f279/FFF.png&text=BEQ,http://dummyimage.com/200x200/79eff2/FFF.png&text=GSI,http://dummyimage.com/200x200/7985f2/FFF.png&text=WX,http://dummyimage.com/200x200/f2d279/FFF.png&text=SMXY",
                            payTime: null,
                            createTime: 1734969039981
                        },
                        {
                            orderNo: "ON201505150731316250",
                            orderAmount: 4588.9,
                            deviceSource: "WXH5",
                            payAmount: 2880.6,
                            orderStatus: -5,
                            goodsNumber: 18,
                            buyerId: "UR104166863872",
                            buyerName: "邱明",
                            buyerMobileNumber: "16957859434",
                            receiver: "吕平",
                            receiverMobileNumber: "15437626172",
                            remark: "类空展活南运七参走金革文造单听线运照张片步且党光王展教业张真行术指二形列象设么南之查很声里认酸情了设再走美商京需青因回算。",
                            goodsImgs:
                                "http://dummyimage.com/200x200/79f27b/FFF.png&text=HFPSI,http://dummyimage.com/200x200/79f2bd/FFF.png&text=EST,http://dummyimage.com/200x200/f2eb79/FFF.png&text=RGC,http://dummyimage.com/200x200/7994f2/FFF.png&text=MWFI,http://dummyimage.com/200x200/f279db/FFF.png&text=SLZDO,http://dummyimage.com/200x200/e079f2/FFF.png&text=CRHO",
                            payTime: 1735462677562,
                            createTime: 1733364720700
                        },
                        {
                            orderNo: "ON200403011265275346",
                            orderAmount: 8144.4,
                            deviceSource: "iOSApp",
                            payAmount: 8895.9,
                            orderStatus: 10,
                            goodsNumber: 16,
                            buyerId: "UR468361610966",
                            buyerName: "高娟",
                            buyerMobileNumber: "18557807543",
                            receiver: "廖勇",
                            receiverMobileNumber: "17724697603",
                            remark: "深八题农院消么于无是容由且器至农世后正完统数从政必线真所式感列己物去无我复长空林斯下系性手领儿位格无状及克第王教复该外观己低北身维制直别。",
                            goodsImgs:
                                "http://dummyimage.com/200x200/f2b379/FFF.png&text=QC,http://dummyimage.com/200x200/8f79f2/FFF.png&text=BPJV,http://dummyimage.com/200x200/79e5f2/FFF.png&text=UUCT,http://dummyimage.com/200x200/79ccf2/FFF.png&text=FEH,http://dummyimage.com/200x200/c7f279/FFF.png&text=KQXO,http://dummyimage.com/200x200/79f2d6/FFF.png&text=TXRZ,http://dummyimage.com/200x200/eff279/FFF.png&text=CCX,http://dummyimage.com/200x200/79f294/FFF.png&text=KIMP,http://dummyimage.com/200x200/f2db79/FFF.png&text=IYPUE,http://dummyimage.com/200x200/79a3f2/FFF.png&text=VLLC,http://dummyimage.com/200x200/d179f2/FFF.png&text=XR,http://dummyimage.com/200x200/f28a79/FFF.png&text=PEH",
                            payTime: 1733244986732,
                            createTime: 1734470483836
                        },
                        {
                            orderNo: "ON200807040134511027",
                            orderAmount: 9457.8,
                            deviceSource: "androidApp",
                            payAmount: 5214.6,
                            orderStatus: 40,
                            goodsNumber: 16,
                            buyerId: "UR375952777509",
                            buyerName: "方平",
                            buyerMobileNumber: "16677872020",
                            receiver: "郝磊",
                            receiverMobileNumber: "15211972549",
                            remark: "热王被空复七向识地书越代高线道有率合设须研使家真劳国不再已今上流便标到地引此门家决许据局合片马价全中权了地叫儿回委点取极思八安严候新设外数处设细始她。",
                            goodsImgs:
                                "http://dummyimage.com/200x200/f2cc79/FFF.png&text=JWB,http://dummyimage.com/200x200/798af2/FFF.png&text=KOB,http://dummyimage.com/200x200/79b3f2/FFF.png&text=WWNM,http://dummyimage.com/200x200/f279d1/FFF.png&text=MGSS,http://dummyimage.com/200x200/a879f2/FFF.png&text=ISVF,http://dummyimage.com/200x200/f279b8/FFF.png&text=RIMJ,http://dummyimage.com/200x200/f27990/FFF.png&text=GYXMW,http://dummyimage.com/200x200/d6f279/FFF.png&text=OJODJ,http://dummyimage.com/200x200/ea79f2/FFF.png&text=GMDOZ,http://dummyimage.com/200x200/aef279/FFF.png&text=QOWLP,http://dummyimage.com/200x200/8079f2/FFF.png&text=ESC,http://dummyimage.com/200x200/95f279/FFF.png&text=FX,http://dummyimage.com/200x200/79f2c7/FFF.png&text=IUE",
                            payTime: 1734420874852,
                            createTime: 1733806101221
                        },
                        {
                            orderNo: "ON201711221657004227",
                            orderAmount: 2077.2,
                            deviceSource: "iOSApp",
                            payAmount: 108.71,
                            orderStatus: 20,
                            goodsNumber: 11,
                            buyerId: "UR424818651733",
                            buyerName: "曾桂英",
                            buyerMobileNumber: "13851268733",
                            receiver: "尹娜",
                            receiverMobileNumber: "16027738748",
                            remark: "打并过温几斯律口直派调造特正意府资志地论增热清第领那报长老断据府决变亲技受战此研化工战非么据习。",
                            goodsImgs:
                                "http://dummyimage.com/200x200/a4f279/FFF.png&text=QGEIA,http://dummyimage.com/200x200/f27b79/FFF.png&text=WTJW,http://dummyimage.com/200x200/f279c8/FFF.png&text=MKIN,http://dummyimage.com/200x200/79f2b7/FFF.png&text=PMR,http://dummyimage.com/200x200/7981f2/FFF.png&text=NTL,http://dummyimage.com/200x200/79f2e0/FFF.png&text=LXMK,http://dummyimage.com/200x200/79c2f2/FFF.png&text=SES,http://dummyimage.com/200x200/e6f279/FFF.png&text=FZUQK",
                            payTime: 1733983199214,
                            createTime: 1734634169624
                        },
                        {
                            orderNo: "ON198004201453803246",
                            orderAmount: 7677.3,
                            deviceSource: "WXH5",
                            payAmount: 6387.6,
                            orderStatus: -5,
                            goodsNumber: 5,
                            buyerId: "UR453167878622",
                            buyerName: "戴磊",
                            buyerMobileNumber: "15211798753",
                            receiver: "侯强",
                            receiverMobileNumber: "18677324396",
                            remark: "加素种深造后受百而期至件边验那制业取传表持每实状联际上件自科区化它运色以六在战道备进三持般合求百之常美斯改员需。",
                            goodsImgs: "http://dummyimage.com/200x200/79d2f2/FFF.png&text=YJN,http://dummyimage.com/200x200/79f2a8/FFF.png&text=HYLF",
                            payTime: 1733903134952,
                            createTime: 1734094380115
                        },
                        {
                            orderNo: "ON197901071120523592",
                            orderAmount: 8825.61,
                            deviceSource: "WXXCX",
                            payAmount: 9538.6,
                            orderStatus: -5,
                            goodsNumber: 8,
                            buyerId: "UR794104671719",
                            buyerName: "吴明",
                            buyerMobileNumber: "19768634273",
                            receiver: "雷艳",
                            receiverMobileNumber: "13752945587",
                            remark: "越收马那再设动人每们细式称深战白安织九族说类厂切及边决容起出天清产很又片交识可处员装却往何劳连值眼造指局半学研计人济今养上事因过南并把还究件任上然十给军认儿回面到毛号求已去算特为了下七分。",
                            goodsImgs:
                                "http://dummyimage.com/200x200/dcf279/FFF.png&text=JU,http://dummyimage.com/200x200/f27995/FFF.png&text=FWJJ,http://dummyimage.com/200x200/79f27f/FFF.png&text=HUAB,http://dummyimage.com/200x200/79e1f2/FFF.png&text=UEH",
                            payTime: 1735577143625,
                            createTime: 1734156895539
                        },
                        {
                            orderNo: "ON198505140627572321",
                            orderAmount: 6560.78,
                            deviceSource: "iOSApp",
                            payAmount: 509.6,
                            orderStatus: 20,
                            goodsNumber: 1,
                            buyerId: "UR434161285718",
                            buyerName: "刘艳",
                            buyerMobileNumber: "18661305133",
                            receiver: "王洋",
                            receiverMobileNumber: "13852535385",
                            remark: "议程个类用半装做要儿节民头精江第没治提生易参手不流色都众厂专交题结必原自图二空府自战需以华油局形音好历各题流治生广本已入非了参万解。",
                            goodsImgs: "http://dummyimage.com/200x200/f2798c/FFF.png&text=OHU",
                            payTime: 1733884496898,
                            createTime: 1734388740603
                        },
                        {
                            orderNo: "ON197402280367621030",
                            orderAmount: 6642.8,
                            deviceSource: "WXXCX",
                            payAmount: 3036.2,
                            orderStatus: -6,
                            goodsNumber: 14,
                            buyerId: "UR348004160652",
                            buyerName: "邹刚",
                            buyerMobileNumber: "14675936302",
                            receiver: "杨秀兰",
                            receiverMobileNumber: "15055738477",
                            remark: "当使什。",
                            goodsImgs:
                                "http://dummyimage.com/200x200/f279dd/FFF.png&text=UL,http://dummyimage.com/200x200/f2c079/FFF.png&text=CPUYF,http://dummyimage.com/200x200/f279b4/FFF.png&text=HOBM,http://dummyimage.com/200x200/f27e79/FFF.png&text=TESD",
                            payTime: null,
                            createTime: 1733855543442
                        },
                        {
                            orderNo: "ON197010041320578825",
                            orderAmount: 9201.5,
                            deviceSource: "WXH5",
                            payAmount: 3701.18,
                            orderStatus: -1,
                            goodsNumber: 11,
                            buyerId: "UR678535375368",
                            buyerName: "阎洋",
                            buyerMobileNumber: "15143864145",
                            receiver: "史涛",
                            receiverMobileNumber: "18787831288",
                            remark: "验布国观山明间见习比区省风识可重根做给年专约维些长下则样不情时。",
                            goodsImgs:
                                "http://dummyimage.com/200x200/b679f2/FFF.png&text=TJV,http://dummyimage.com/200x200/79a6f2/FFF.png&text=MYVSE,http://dummyimage.com/200x200/f2b079/FFF.png&text=KDOF,http://dummyimage.com/200x200/79f292/FFF.png&text=QSF",
                            payTime: 1735593365196,
                            createTime: 1734228505385
                        },
                        {
                            orderNo: "ON200406240707356176",
                            orderAmount: 9018.83,
                            deviceSource: "iOSApp",
                            payAmount: 4846.6,
                            orderStatus: 20,
                            goodsNumber: 13,
                            buyerId: "UR371177851779",
                            buyerName: "胡平",
                            buyerMobileNumber: "18514108965",
                            receiver: "韩艳",
                            receiverMobileNumber: "18653171153",
                            remark: "局更办联直技头转理他才音号八新须华很日实阶研该断治备装打器入速路具结济活长约常容者几总按团日建公阶验图设生种线天放了色务期何四知展布形还族入话目律斯特查商身分越并火军提路群主给你也包的有积都整的马。",
                            goodsImgs:
                                "http://dummyimage.com/200x200/79f2c4/FFF.png&text=IYB,http://dummyimage.com/200x200/f2a179/FFF.png&text=MRK,http://dummyimage.com/200x200/79f2ab/FFF.png&text=EJU,http://dummyimage.com/200x200/f279d3/FFF.png&text=QIM,http://dummyimage.com/200x200/798df2/FFF.png&text=EH,http://dummyimage.com/200x200/b0f279/FFF.png&text=PCF,http://dummyimage.com/200x200/79f2ed/FFF.png&text=WPGW,http://dummyimage.com/200x200/f2c979/FFF.png&text=KJGDF,http://dummyimage.com/200x200/a679f2/FFF.png&text=XZUC,http://dummyimage.com/200x200/cf79f2/FFF.png&text=VUKFB",
                            payTime: 1734323847242,
                            createTime: 1735037089202
                        },
                        {
                            orderNo: "ON201112220167856304",
                            orderAmount: 7090.1,
                            deviceSource: "androidApp",
                            payAmount: 8173.54,
                            orderStatus: 30,
                            goodsNumber: 3,
                            buyerId: "UR555080627138",
                            buyerName: "秦杰",
                            buyerMobileNumber: "14542244807",
                            receiver: "孙秀英",
                            receiverMobileNumber: "18328468143",
                            remark: "志住记些法见是支系市研状己准。",
                            goodsImgs: "http://dummyimage.com/200x200/79f2b5/FFF.png&text=KCQ,http://dummyimage.com/200x200/f279a1/FFF.png&text=JEH",
                            payTime: 1735102464489,
                            createTime: 1735757679469
                        },
                        {
                            orderNo: "ON198312140864113334",
                            orderAmount: 7150.31,
                            deviceSource: "H5",
                            payAmount: 7854.71,
                            orderStatus: -5,
                            goodsNumber: 5,
                            buyerId: "UR921131566466",
                            buyerName: "黄明",
                            buyerMobileNumber: "14132918274",
                            receiver: "韩平",
                            receiverMobileNumber: "14652118212",
                            remark: "千化较真派相运四就资实果育标及工江需元约前志音声段证此价水相取土根代是价米海因消感九周确况手作外相思道克设拉技响特给力际只价还来新内象华红县育了极或几写管级也团被委种相王品号研立路团联。",
                            goodsImgs:
                                "http://dummyimage.com/200x200/f28279/FFF.png&text=XR,http://dummyimage.com/200x200/79d4f2/FFF.png&text=BI,http://dummyimage.com/200x200/b079f2/FFF.png&text=KEGG,http://dummyimage.com/200x200/79f2a5/FFF.png&text=VWXYI,http://dummyimage.com/200x200/79acf2/FFF.png&text=OE",
                            payTime: 1734781134810,
                            createTime: 1735516920407
                        },
                        {
                            orderNo: "ON199504160452981774",
                            orderAmount: 1573.54,
                            deviceSource: "WXH5",
                            payAmount: 5504.34,
                            orderStatus: -7,
                            goodsNumber: 7,
                            buyerId: "UR485959672565",
                            buyerName: "朱刚",
                            buyerMobileNumber: "16891327931",
                            receiver: "韩超",
                            receiverMobileNumber: "18061382235",
                            remark: "们小压样温战下高值运价得金写联广便资解矿条边明没可强列需六群流造国物们到积解运海别地织天决导什音识何结这学劳公而先与入消道明车及上具平布标能收目本红向公后号两。",
                            goodsImgs: "http://dummyimage.com/200x200/a079f2/FFF.png&text=NKMJ",
                            payTime: null,
                            createTime: 1734681024921
                        },
                        {
                            orderNo: "ON202208030387415977",
                            orderAmount: 250.2,
                            deviceSource: "WXXCX",
                            payAmount: 1617.66,
                            orderStatus: 20,
                            goodsNumber: 2,
                            buyerId: "UR458566245146",
                            buyerName: "韩敏",
                            buyerMobileNumber: "13380611837",
                            receiver: "罗洋",
                            receiverMobileNumber: "13742460182",
                            remark: "花花华华指空素面根完准带温西格众京再因作信外实影他较科温争际山农步何比单克还题县水被产于严光自与前斯心眼了料起金流种实验机已数矿领米放流目七运情素红该便单过圆品引两设斯准合图。",
                            goodsImgs: "http://dummyimage.com/200x200/acf279/FFF.png&text=ZF",
                            payTime: 1735359591446,
                            createTime: 1734480978122
                        },
                        {
                            orderNo: "ON201408051668358418",
                            orderAmount: 7247.23,
                            deviceSource: "iOSApp",
                            payAmount: 9200.1,
                            orderStatus: -7,
                            goodsNumber: 16,
                            buyerId: "UR745824402334",
                            buyerName: "杜平",
                            buyerMobileNumber: "13827804843",
                            receiver: "王洋",
                            receiverMobileNumber: "14173586433",
                            remark: "油东科发分从山门装参处目又面候热京规活题展素九才行热得平之称区边同水受采却而低命深她度三清节育厂使三资路。",
                            goodsImgs:
                                "http://dummyimage.com/200x200/f279b7/FFF.png&text=EKH,http://dummyimage.com/200x200/f27c79/FFF.png&text=QQ,http://dummyimage.com/200x200/d5f279/FFF.png&text=AXCT,http://dummyimage.com/200x200/7998f2/FFF.png&text=CHBW,http://dummyimage.com/200x200/f2798e/FFF.png&text=LISG,http://dummyimage.com/200x200/f279df/FFF.png&text=CI,http://dummyimage.com/200x200/79daf2/FFF.png&text=QZRM,http://dummyimage.com/200x200/79f2e1/FFF.png&text=UUF,http://dummyimage.com/200x200/f2e679/FFF.png&text=JJKX,http://dummyimage.com/200x200/c379f2/FFF.png&text=KHQOE,http://dummyimage.com/200x200/8179f2/FFF.png&text=UVJTP,http://dummyimage.com/200x200/f2be79/FFF.png&text=FOCDL,http://dummyimage.com/200x200/bcf279/FFF.png&text=JPUQF",
                            payTime: 1733610426281,
                            createTime: 1734736275524
                        },
                        {
                            orderNo: "ON197105111612337355",
                            orderAmount: 4308.7,
                            deviceSource: "WXH5",
                            payAmount: 7771.3,
                            orderStatus: -1,
                            goodsNumber: 18,
                            buyerId: "UR158590465444",
                            buyerName: "康芳",
                            buyerMobileNumber: "17777846101",
                            receiver: "高强",
                            receiverMobileNumber: "13544833422",
                            remark: "你六准青界律以各统由使本任写民青步则市确包果两名形几水育说其眼样别高包开共文积构分品知领百下增三义石世列。",
                            goodsImgs:
                                "http://dummyimage.com/200x200/79e9f2/FFF.png&text=PNE,http://dummyimage.com/200x200/b379f2/FFF.png&text=TRDI,http://dummyimage.com/200x200/79a8f2/FFF.png&text=XZ,http://dummyimage.com/200x200/a3f279/FFF.png&text=INV,http://dummyimage.com/200x200/79f2b8/FFF.png&text=XJVZ,http://dummyimage.com/200x200/f2ae79/FFF.png&text=KWIT,http://dummyimage.com/200x200/f279ef/FFF.png&text=GPMS,http://dummyimage.com/200x200/f27985/FFF.png&text=RU,http://dummyimage.com/200x200/f2d779/FFF.png&text=AMYC",
                            payTime: 1734185987351,
                            createTime: 1735088837501
                        },
                        {
                            orderNo: "ON200808240355513241",
                            orderAmount: 8764.9,
                            deviceSource: "WXH5",
                            payAmount: 3090.7,
                            orderStatus: 10,
                            goodsNumber: 19,
                            buyerId: "UR337682842258",
                            buyerName: "赵芳",
                            buyerMobileNumber: "15314325867",
                            receiver: "姚霞",
                            receiverMobileNumber: "15827288353",
                            remark: "民会必反酸空党地号别组计号。",
                            goodsImgs:
                                "http://dummyimage.com/200x200/798ff2/FFF.png&text=HR,http://dummyimage.com/200x200/79f2c2/FFF.png&text=YGMX,http://dummyimage.com/200x200/dbf279/FFF.png&text=OCKO,http://dummyimage.com/200x200/79d0f2/FFF.png&text=GN,http://dummyimage.com/200x200/f279ad/FFF.png&text=RSG,http://dummyimage.com/200x200/a479f2/FFF.png&text=VBRTG,http://dummyimage.com/200x200/f28679/FFF.png&text=DLJ,http://dummyimage.com/200x200/79f281/FFF.png&text=KOFX,http://dummyimage.com/200x200/b2f279/FFF.png&text=LOUP,http://dummyimage.com/200x200/f279d6/FFF.png&text=USD,http://dummyimage.com/200x200/8b79f2/FFF.png&text=XSS,http://dummyimage.com/200x200/f2f079/FFF.png&text=YZKE,http://dummyimage.com/200x200/f2c779/FFF.png&text=XLIK,http://dummyimage.com/200x200/79f2a9/FFF.png&text=SHFD,http://dummyimage.com/200x200/cc79f2/FFF.png&text=FM,http://dummyimage.com/200x200/79f2eb/FFF.png&text=DBT,http://dummyimage.com/200x200/f27994/FFF.png&text=CETW,http://dummyimage.com/200x200/8af279/FFF.png&text=AKWX",
                            payTime: 1735419223250,
                            createTime: 1735028997185
                        },
                        {
                            orderNo: "ON200911300100328158",
                            orderAmount: 5496.7,
                            deviceSource: "H5",
                            payAmount: 5287.74,
                            orderStatus: -7,
                            goodsNumber: 5,
                            buyerId: "UR669549276899",
                            buyerName: "宋敏",
                            buyerMobileNumber: "19585173021",
                            receiver: "陆霞",
                            receiverMobileNumber: "19935727374",
                            remark: "以例年存北照可即白题具入己按使此术次教白会米起称民改约总市及院他据自得流场在明界算儿马我识问斯人派来严界农所规可海保酸技果老至院列花外组王往多回。",
                            goodsImgs:
                                "http://dummyimage.com/200x200/7b79f2/FFF.png&text=NRTI,http://dummyimage.com/200x200/bd79f2/FFF.png&text=ESDS,http://dummyimage.com/200x200/f279bd/FFF.png&text=DUK,http://dummyimage.com/200x200/799ef2/FFF.png&text=UQH",
                            payTime: null,
                            createTime: 1733257775987
                        },
                        {
                            orderNo: "ON200501212316707598",
                            orderAmount: 7862.77,
                            deviceSource: "WXH5",
                            payAmount: 5497.65,
                            orderStatus: -1,
                            goodsNumber: 2,
                            buyerId: "UR202628457185",
                            buyerName: "杨涛",
                            buyerMobileNumber: "19593463533",
                            receiver: "廖秀兰",
                            receiverMobileNumber: "18355721776",
                            remark: "往有花听办部我你线义满前感金传当满口心定信没了论社候手总复铁备王保分八标党观华厂走立较导儿走型记至参育之出识非从强叫温关。",
                            goodsImgs: "http://dummyimage.com/200x200/79aef2/FFF.png&text=WY,http://dummyimage.com/200x200/f2ea79/FFF.png&text=LXCN",
                            payTime: 1733524839635,
                            createTime: 1733560821333
                        },
                        {
                            orderNo: "ON202008020227571555",
                            orderAmount: 4283.3,
                            deviceSource: "androidApp",
                            payAmount: 8915.6,
                            orderStatus: 40,
                            goodsNumber: 14,
                            buyerId: "UR283554365033",
                            buyerName: "许明",
                            buyerMobileNumber: "18581058821",
                            receiver: "孔敏",
                            receiverMobileNumber: "18355323526",
                            remark: "时长设也划光放派写太强。",
                            goodsImgs:
                                "http://dummyimage.com/200x200/79f27b/FFF.png&text=MQD,http://dummyimage.com/200x200/f279c2/FFF.png&text=FCFOE,http://dummyimage.com/200x200/c679f2/FFF.png&text=QM,http://dummyimage.com/200x200/df79f2/FFF.png&text=WKW,http://dummyimage.com/200x200/79bdf2/FFF.png&text=HPDVB",
                            payTime: 1735140233150,
                            createTime: 1734005798368
                        }
                    ],
                    total: 100
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
