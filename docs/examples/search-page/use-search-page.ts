import { ref, type Ref } from "vue";
import { type ActionBarProps, type DataTableProps, type SearchFormProps } from "@yujinjin/cms-components/index";

export default function ({ showDialogHandle, excelExportHandle, cancelOrderHandle, orertReportData }) {
    // 下单设备来源枚举值
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

    const searchFormProps = ref<SearchFormProps>({
        labelWidth: 120,
        fields: [
            {
                name: "orderNo",
                type: "input",
                label: "订单编号"
            },
            {
                name: "deviceSources",
                type: "checkSelect",
                label: "下单设备",
                data: DEVICE_SOURCE_ENUM.map(({ label, value }) => ({ label, value, disabled: value === "WXXCX" }))
            },
            {
                name: "buyer",
                type: "input",
                label: "用户ID/名称"
            },
            {
                name: "receiver",
                type: "input",
                label: "收货人姓名"
            },
            {
                name: "receiverMobileNumber",
                type: "input",
                label: "收货人手机号"
            },
            {
                name: "dateRange",
                type: "datePicker",
                label: "订单日期",
                props: {
                    type: "daterange"
                }
            }
        ]
    });

    const actionBarProps = ref<ActionBarProps>({
        align: "right",
        buttons: [
            {
                contents: "新增订单",
                handleCode: "CREATE",
                click: showDialogHandle,

                type: "primary"
            },
            {
                contents: "批量取消订单",
                handleCode: "BATCHCANCEL",
                click: cancelOrderHandle,
                disabled: true
            },
            {
                contents: "自定义列",
                handleCode: "CUSTOMCOLUMN",
                click: showDialogHandle
            },
            {
                contents: "导出Excel",
                handleCode: "EXPORT",
                click: excelExportHandle
            }
        ]
    });

    //TODO: “const dataTableProps = ref<DataTableProps>({”这种写法会提示ts(4058)错误
    const dataTableProps: Ref<DataTableProps> = ref({
        filters: {
            orderStatus: ""
        },
        query: async function (params: any) {
            console.log("查询参数:", params);
            await new Promise(resolve => setTimeout(resolve, 500));
            return {
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
                    }
                ],
                allCount: 120,
                pendingCount: 16,
                paidCount: 62,
                deliveredCount: 12,
                completedCount: 14,
                cancelledCount: 75,
                refundedCount: 5,
                total: 100
            };
        },
        // 查询参数处理
        queryParametersProcess(parameters: any) {
            if (parameters.dateRange && parameters.dateRange.length > 0) {
                parameters.startDate = parameters.dateRange[0];
                parameters.endDate = parameters.dateRange[1];
            }
            delete parameters.dateRange;
            if (parameters.deviceSources && parameters.deviceSources.length > 0) {
                parameters.deviceSources = parameters.deviceSources.join(",");
            }
            return parameters;
        },
        queryResponseProcess(queryResult: Record<string, any>) {
            orertReportData.allCount = queryResult.allCount || 0;
            orertReportData.pendingCount = queryResult.pendingCount || 0;
            orertReportData.paidCount = queryResult.paidCount || 0;
            orertReportData.deliveredCount = queryResult.deliveredCount || 0;
            orertReportData.completedCount = queryResult.completedCount || 0;
            orertReportData.cancelledCount = queryResult.cancelledCount || 0;
            orertReportData.refundedCount = queryResult.refundedCount || 0;
            return { total: queryResult.total, rows: queryResult.rows };
        },
        columns: [
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
                width: 200
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
                minWidth: 140
            },
            {
                label: "收货人",
                prop: "receiver",
                minWidth: 100
            },
            {
                label: "收货人电话",
                prop: "receiverMobileNumber",
                minWidth: 120
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
                        handleCode: "SEARCH",
                        click: showDialogHandle
                    },
                    {
                        contents: "取消订单",
                        handleCode: "CANCEL",
                        display: function (row) {
                            return row.orderStatus === 10;
                        },
                        click: cancelOrderHandle
                    }
                ]
            }
        ]
    });

    return {
        searchFormProps,
        actionBarProps,
        dataTableProps
    };
}
