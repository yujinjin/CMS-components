/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2023-03-21 15:42:03
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2023-03-21 15:44:07
 * @项目的路径: \CMS-components\docs\examples\test\config.ts
 * @描述: 配置文件
 */
export default function () {
    return {
        searchFormProps: {
            fields: [
                {
                    name: "orderNo",
                    type: "input",
                    label: "订单编号"
                },
                {
                    name: "orderStatus",
                    type: "select",
                    label: "订单状态",
                    data: []
                },
                {
                    name: "daterange",
                    type: "datePicker",
                    label: "订单日期",
                    inputWidth: 200,
                    props: {
                        type: "daterange",
                        style: {
                            width: "200px"
                        }
                    }
                },
                {
                    name: "receiveMan",
                    type: "input",
                    label: "收货人"
                },
                {
                    name: "receiveMobileNumber",
                    type: "input",
                    label: "收货电话"
                }
            ]
        }
    };
}
