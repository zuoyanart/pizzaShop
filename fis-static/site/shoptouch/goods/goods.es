let goods = (function() {
    let self = {};
    let $, jQuery;
    $ = jQuery = require('jquery');
    let tools = require("pizzatools");
    let flow = require("shop/flow/flow");

    require('layer');
    require('pizzaui');

    self.init = (cartobj = '.cart') => {

            $(cartobj).click(function() {
                self.addCart(cartobj);
            });
        }
        /**
         * 图片放大镜效果
         * @return {[type]} [description]
         */
    self.imgzoom = function() {
            $(function() {
                $(".jqzoom").imagezoom();
                $("#thumblist li a").click(function() {
                    $(this).parents("li").addClass("tb-selected").siblings().removeClass("tb-selected");
                    $(".jqzoom").attr('src', $(this).find("img").attr("mid"));
                    $(".jqzoom").attr('rel', $(this).find("img").attr("big"));
                });
            });
        }
        /**
         * 添加到购物车
         * @method function
         * @return {[type]} [description]
         */
    self.addCart = (obj = '.cart') => {
        let number = parseInt($(".number").val());
        if (isNaN(number) || number < 1) { //如果为非数字，或者<1
            number = 1;
        }
        // let cart = store.get("pz_cart");
        // if (!cart) {
        //     cart = {};
        // }
        // let goodsnum = $("#goodsnum").text();
        // if (!cart[goodsnum]) { //如果已经添加到购物车，则不做修改
        //     let item = {
        //         name: $("#goodsname").text(), //商品名称
        //         number: number, //购买数量
        //         id: tools.getPara("id"), //商品id
        //         market: $("#price > span").text(), //市场价
        //         shop: $("#price > strong").text(), //本店售价
        //         img: $(".jqzoom").attr("src")
        //     }
        //     cart[goodsnum] = item;
        //     store.set("pz_cart", cart);
        // }

        let data = {
            name: $("#goodsname").text(), //商品名称
            number: number, //购买数量
            id: tools.getPara("id"), //商品id
            // market: $("#price > span").text(), //市场价
            // shop: $("#price > strong").text(), //本店售价
            img: $(".jqzoom").attr("src")
        }
        flow.addCartToServer(data, function() {
            document.location.href = "/shop/flow";
        });
    }

    return self;
}());

module.exports = goods;
