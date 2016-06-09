let goods = (function() {
    let self = {};
    let $, jQuery;
    $ = jQuery = require('jquery');
    require('layer');
    require('pizzaui');
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
    return self;
}());

module.exports = goods;
