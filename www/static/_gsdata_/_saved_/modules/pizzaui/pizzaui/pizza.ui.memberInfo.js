/**
 * 显示会员信息
 * @param  {[type]} function($ [description]
 * @return {[type]}            [description]
 */
;
(function($) {
	$.fn.memberInfo = function(options) {
		if (!$('.member-143000181')[0]) {
			$('body').append('<div style="position:absolute;"><div class="member-143000181"></div></div>');
		}
		var tpl = "<ul>\r\n  <li class=\"style-1\">\r\n    <span><%= data.nickName %></span>\r\n    <% if(data.duty != undefined) { %>\r\n      <em class=\"mcicon-circle\"></em>\r\n      <%= data.duty %>\r\n    <% } %>\r\n      <br>\r\n      <% if(data.company != undefined) { %>\r\n        <%= data.company %>\r\n      <% } %>\r\n      <br>河南-郑州\r\n      <% if(data.company != undefined) { %>\r\n        <em class=\"mcicon-circle\"></em>\r\n        <%= tools.siteData.data.know[data.know] %>\r\n      <% } %>\r\n      <% if(data.company != undefined) { %>\r\n        <em class=\"mcicon-circle\"></em>\r\n        <%= data.phone %>\r\n      <% } %>\r\n  </li>\r\n  <li class=\"style-2\"><i class=\"icon-tags\"></i>\r\n    <% data.tag.replace(/,/g, '，') %>\r\n  </li>\r\n</ul>\r\n<div class=\"pingjia\">\r\n  <p>\r\n    <span>个人资料</span><i class=\"star-huang icon-star\"></i><i class=\"star-huang icon-star\"></i><i class=\"star-huang icon-star\"></i></p>\r\n  <p>\r\n    <span>人脉质量</span><i class=\"star-hong icon-star\"></i><i class=\"star-hong icon-star-half\"></i></p>\r\n  <p>\r\n    <span>综合能力</span><i class=\"star-gray icon-star\"></i></p>\r\n</div>\r\n";
		var
		oAvatar = $(this), //触发事件的DOM对象
		obj = $('.member-143000181'), //信息卡片所在的DOM
		arrow, //卡片箭头的方向
		left, right, top, //定位用到的 left 与 top
		cache, //缓存获取到的会员信息
		str; //内部使用的字符串

		var defaults = {
			url: '/user/user/getdoc', //数据请求地址
			on: '' //继承绑定
		};

		options = $.extend(defaults, options);

		/**
		 * 显示会员信息窗口
		 * @return {Boolean} [description]
		 */
		function disMemberInfo(thisObj) {
			var _parent = $('.member-143000181').parent();
			//用于判断信息卡片是在上方还是在下方显示
			var scrollTop = $(document).scrollTop();
			var flag = Math.floor(thisObj.offset().top);
			left = Math.floor(thisObj.offset().left);
			cache = thisObj.data('dbMember');

			right = $(window).width() - left;

			if(right <= 300) {
				if (flag - scrollTop > 150) {
					top = flag - 120 + 'px';
					arrow = '<i class="arrow-5678"></i>';
				} else {
					top = flag + parseInt(thisObj.css('height')) + 15 + 'px';
					arrow = '<i class="arrow-8765"></i>';
				}
				left -= 220;
			} else {
				if (flag - scrollTop > 150) {
					top = flag - 120 + 'px';
					arrow = '<i class="arrow-1234"></i>';
				} else {
					top = flag + parseInt(thisObj.css('height')) + 15 + 'px';
					arrow = '<i class="arrow-4321"></i>';
				}
			}
			right += 'px'; left += 'px';

			// ajax 数据
			var data = 'id=' + thisObj.attr('id') + '&nid=' + thisObj.attr('nid');

			if (cache) {
				var inf = thisObj.data('dbMember');
				var str = arrow + tpl({data:inf});
				obj.empty().append(str).css({
					'display': 'block'
				});
				_parent.css({
					'left': left,
					'top': top
				});
			} else if(thisObj.attr('dbMemberError') == 'true'){//如果有错误，则停止请求
				return;
			} else {
				$.ajax({
					url: options.url,
					data: data + tools.getCsrf(),
					success: function(msg) {
						thisObj.data('dbMember', msg.data);
						var str = arrow + tpl(msg);
						obj.empty().append(str).css({
							'display': 'block'
						});
						_parent.css({
							'left': left,
							'top': top
						});
						thisObj.attr('dbMemberError','false');
					},
					error: function(msg) {
						thisObj.attr('dbMemberError','true');
					}
				});
			}
		}

		/**
		 * 隐藏会员信息窗口
		 * @return {[type]} [description]
		 */
		function hideMemberInfo() {
			obj.css({
				'display': 'none'
			});
		}

		var timeout = 0;
		oAvatar.on('mouseenter', options.on, function() {
			var _this = $(this);
			function mid(obj) {
				return function() {
					disMemberInfo(obj);
				}
			}
			timeout = setTimeout(mid(_this), 300);
		}).on('mouseleave', options.on, function() {
			clearInterval(timeout);
			hideMemberInfo();
		});
	}
})(jQuery);
