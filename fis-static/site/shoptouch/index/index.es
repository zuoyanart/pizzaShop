let index = (function() {
    let self = {};
    let $, jQuery;
    $ = jQuery = require('jquery');
    require('layer');
    require('pizzaui');

    self.Item = function() {
            let top = getTop();
            $("#rotator > .lz").animate({
                top: top
            }, 500, function() {
              $(".num >li.on").removeClass('on');
                $(".num >li:eq(" + (-parseInt(top) / 413 - 1) + ")").addClass('on');
                $(this).stop();
                setTimeout(function() {
                    self.Item();
                }, 4000);
            });
        }
        /**
         * 计算top值
         * @method getTop
         * @return {[type]} [description]
         */
    function getTop() {
        let top = parseInt($("#rotator > .lz").css("top"));
        if (top == -413 * 5) {
            return '0px';
        }
        return (top - 413 + 'px');
    }

    return self;
}());

module.exports = index;
