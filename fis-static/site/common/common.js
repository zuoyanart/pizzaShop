var common = (function() {
    var $ = require('jquery');
    require('pizzaui');
    var tools = require('pizzatools');
    var my = {};
    my.init = function() {
            silder();
            sidebarBind();
            userInfo();
            $('#loginout').on('click', function() {
                loginout();
            });
        }
        /**
         * 全选操作
         * @method function
         * @return {[type]} [description]
         */
    my.checkAll = function(obj) {
            $(obj).on('click', function() {
                $('#list').find('input[type=checkbox]').prop("checked", $(this).prop('checked'));
            });
        }
        /**
         * 获取当前列表的id
         * @method function
         * @param  {[type]} obj [description]
         * @return {[type]}     [description]
         */
    my.getCheckId = function(obj) {
            var id = '';
            if (obj.is('i')) {
                id = obj.parent().parent().find('input[type=checkbox]').attr('id').split('_')[1] + ',';
            } else {
                $('#list').find('input:checked').each(function(key, value) {
                    id += $(value).attr('id').split('_')[1] + ',';
                });
            }
            return id + '0';
        }
        /**
         * 获取单条id
         * @method function
         * @param  {[type]} obj [description]
         * @return {[type]}     [description]
         */
    my.getId = function(obj) {
            return obj.parent().parent().find('input[type=checkbox]').attr('id').split('_')[1];
        }
        /**
         * 关键字搜索
         * @method function
         * @param  {[type]}   obj [description]
         * @param  {Function} fn  [description]
         * @return {[type]}       [description]
         */
    my.kwSearch = function(obj, fn) {
            $(obj).keydown(function(event) {
                if (event.keyCode == 13) {
                    fn.call();
                }
            });
        }
        /**
         * 左侧菜单折叠操作
         * @return {[type]} [description]
         */
    function silder() {
        $('#sidebar').on('click', 'a', function() {
            //var url = document.location.href;
            var oa = $(this);
            var sidebar = $('#sidebar');
            if (oa.hasClass('submenu')) {
                var oanext = oa.next();
                if (oanext.hasClass('display')) {
                    oanext.removeClass('display');
                } else {
                    sidebar.find('.display').removeClass('display');
                    oanext.addClass('display');
                }
            } else {
                sidebar.find('.active').removeClass('active');
                oa.addClass('active');
            }
        });
    }
    /**
     * 左侧状态绑定
     * @return {[type]} [description]
     */
    function sidebarBind() {
        var urlarr = document.location.href.split('#')[0].split('/');
        if (urlarr.length == 3) {
            urlarr.push("index");
        }
        var url = 'admin/' + urlarr[4];
        var sidebar = $('#sidebar');
        sidebar.find('.active').removeClass('active');
        var a = sidebar.find('a[href="/' + url + '"]');
        a.addClass('active');
        if (a.parent().parent().parent().attr("id") != 'sidebar') {
            //a.parent().parent().addClass('display').fadeIn();
            a.parent().parent().parent().children('a').addClass('active').click();
        }
    }
    /**
     * 正文区list中li的事件绑定
     * @method contentListEvent
     * @return {[type]}         [description]
     */
    function contentListEvent() {
        //$('#content > ul.list').on('mouseenter', 'span > a')
    }
    /**
     * 显示用户信息
     * @method userInfo
     * @return {[type]} [description]
     */
    function userInfo() {
        var user = tools.getCookie('username');
        $('#userinfo').html(user);
        console.log(user);
    }
    /**
     * 退出登录
     * @method loginout
     * @return {[type]} [description]
     */
    function loginout() {
        $.ajax({
            url: '/admin/login/loginout',
            data: "d=d",
            success: function(msg) {
                document.location.href = '/admin/login'
            }
        })
    }

    return my;
}());

module.exports = common;
