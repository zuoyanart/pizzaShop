'use strict';

import Base from './base.js';
import pingpp from 'pingpp';
export default class extends Base {

    /**
     * index action
     * @return {Promise} []
     */
    async indexAction() {
            let orderid = this.get("id");
            let uid = this.cookie("user_id");
            let orderInfoM = this.model("shop/order_info");
            let orderinfo = await orderInfoM.get(orderid, uid);

            this.assign({
                order_sn: orderinfo.msg.order_sn,
                goods_amount: orderinfo.msg.goods_amount
            });
            return this.display();
        }
        /**
         * 调去支付参数
         * @method payAction
         * @return {[type]}  [description]
         */
    async payAction() {
            let param = xss(this.post());
            let self = this;

            let orderid = parseInt(param.orderid);
            let uid = self.cookie("user_id");
            let orderInfoM = self.model("shop/order_info");
            let orderinfo = await orderInfoM.get(orderid, uid);

            let extra = {};
            switch (param.channel) {
                case "alipay_pc_direct":
                    extra = {
                        success_url: "http://192.168.1.21:8361/user/pay/success?id=" + orderinfo.msg.order_id
                    };
                    break;
                case "wx_pub_qr":
                    extra = {
                        product_id: orderinfo.msg.order_ids
                    };
                    break;
                case "alipay_qr":
                    extra = {

                    };
                    break;
                case "upacp_pc":
                    extra = {
                        result_url: "http://192.168.1.21:8361/user/pay/success?result=success&out_trade_no=" + orderinfo.msg.order_sn + "&id=" + orderinfo.msg.order_id
                    };
                    break;
            }

            let ping = pingpp("sk_test_C8irv1zzbjjLT0SKyTqjbDiL");
            ping.charges.create({
                subject: "订单编号" + orderinfo.msg.order_sn,
                body: "body",
                amount: orderinfo.msg.goods_amount * 100,
                order_no: orderinfo.msg.order_sn,
                channel: param.channel,
                currency: "cny",
                client_ip: self.ip(),
                extra: extra,
                app: {
                    id: "app_D4CWrPjrLGKS5Wvz"
                }
            }, function(err, charge) {
                if (err) {
                    console.log(err);
                    return self.json({
                        state: false,
                        msg: err
                    });
                }
                orderInfoM.editByid(orderid, uid, { //支付渠道
                    pay_name: param.channel
                });
                return self.json(charge);
            });
        }
        /**
         * 支付成功
         * @method successAction
         * @return {[type]}      [description]
         */
    async successAction() {
        let ordersn = this.get("out_trade_no");
        let result = this.get("result");
        let orderid = this.get("id");
        let userid = this.cookie("user_id");

        if (result == "success") { //支付成功
            let orderInfoM = this.model("shop/order_info");
            await orderInfoM.editByid(orderid, userid, {
                pay_time: getUnixTime(),
                pay_status: 2,
            });
            return this.display();

        } else { //支付失败
            return this.display("fail");
        }
    }
}
