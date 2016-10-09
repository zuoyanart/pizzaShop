'use strict';

import Base from './base.js';


export default class extends Base { //订单相关
    /**
     * 提交订单
     * @return {Promise} []
     */
    async addAction() {
            let cartM = this.model("shop/cart");

            let uid = this.cookie("user_id");
            let param = xss(this.post());
            let money = 0; //金额总数

            let resultA = await cartM.transaction(async() => {
                let addrM = this.model("home/addr").db(cartM.db());
                let goodsM = this.model("shop/goods").db(cartM.db());
                let orderGoodsM = this.model("shop/order_goods").db(cartM.db());
                let orderInfoM = this.model("shop/order_info").db(cartM.db());

                let carts = await cartM.page(uid, 1, 50);
                let request = [];
                let data = carts.msg;
                let cartsNum = {}; //goosid:no
                for (let i = 0, ll = data.length; i < ll; i++) {
                    request.push(goodsM.get(data[i].goods_id));
                    cartsNum["goods" + data[i].goods_id] = data[i].goods_number;
                }

                let result = await Promise.all(request);

                for (let i = 0, ll = data.length; i < ll; i++) { //更新购买数量
                    result[i].msg.no = cartsNum["goods" + result[i].msg.goods_id];
                    money += result[i].msg.shop_price * result[i].msg.no;
                }

                let addr = await addrM.get(param.addrid, uid);
                addr = addr.msg;

                let orderinfo = { //订单信息
                    user_id: uid,
                    order_status: 0, //订单状态，0未确认
                    shipping_statue: 0, //商品配送情况，0未发货
                    pay_status: 0, //支付状态，0未支付
                    consignee: addr.consignee, //收货人
                    country: "中国",
                    province: addr.province,
                    city: addr.city,
                    district: addr.district,
                    address: addr.address,
                    zipcode: addr.zipcode,
                    tel: addr.tel,
                    postscript: param.postscript, //客户留言
                    goods_amount: money, //总金额
                    add_time: getUnixTime(),
                };
                let orderInfoR = await orderInfoM.create(orderinfo); //创建订单

                let requestOrderGoods = [];
                let goods;
                for (let i = 0, ll = result.length; i < ll; i++) { //创建订单商品列表
                    goods = result[i].msg;
                    goods.order_id = orderInfoR.msg;
                    requestOrderGoods.push(orderGoodsM.create(goods));
                }
                await Promise.all(requestOrderGoods);
                return {
                    state: true,
                    msg: {
                        orderid: orderInfoR.msg
                    }
                };
            });

            return this.json(resultA);
        }
        /**
         * 创建或者更新购物车表
         * @method createActon
         * @return {[type]}    [description]
         */
    async createActon() {
        let param = xss(this.post());
    }
}
