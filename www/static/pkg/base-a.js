;define('globle/globle', function(require, exports, module) {

  /**
   * 网站全局配置
   * @method function
   * @return {[type]} [description]
   */
  var globleConfig = (function() {
    var my = {};
    var $ = require('jquery');
    var tools = require('pizzatools');
    require('layer');
    var pizzalayer = require('pizzalayer');
  
  /**
   * 初始化函数
   * @method function
   * @return {[type]} [description]
   */
    my.init = function() {
      lowerBrower(); // 如果小于 ie8，跳转到 ie.html
      ajaxGloble();
    }
  
    /**
     * 全局ajax函数
     * @return {[type]} [description]
     */
    function ajaxGloble() {
        $.ajaxSetup({
          global: true,
          type: "POST",
          dataType: 'json',
          timeout: 2000,
          beforeSend: function(req, opt) { //发送之前
            if (opt.type === 'POST') {
              /*if(opt.data === undefined) {
              	opt.data = tools.getCsrf();
              }*/
              if (opt.data && opt.data.indexOf('_csrf') === -1) {
                //opt.data += tools.getCsrf();
              }
            }
            layer.load(1);
          },
          complete: function() {
            layer.closeAll('loading');
          },
          error: function() {
            layer.closeAll('loading');
            layer.msg('网络错误，请稍后重试', {
              time: 1000
            });
          }
        });
      }
      // ie8 以下禁止访问本站
    function lowerBrower() {
      if (document.location.href.indexOf('ie.html') === -1) {
        var ie8 = /msie\s*8\.0/g.test(navigator.userAgent.toLowerCase());
        if (!$.support.leadingWhitespace && !ie8) {
          document.location.href = '/site/stop/ie.html?t=' + new Date().getTime();
          return;
        }
      }
    }
  
    return my;
  }());
  
  module.exports = globleConfig;
  

});

;define("pizzaui",function(t,e,a){var n=t("jquery");!function(t){t.fn.wordsTip=function(e){var a=this,n=t("#"+a[0].id+"-tip");a.attr("validate","false");var i={min:1,max:128,English:!0};e=t.extend(i,e);var r='字数：<span style="color:red;">'+e.min+" - "+e.max+"</span> 个字";n.html(r),a.on("keydown keyup blur focus",function(i){function s(t){return e.English?Math.ceil(t.replace(/[^\x00-\xff]/g,"rr").length/2):t.length}var l=t.trim(a.val()),o=s(l),c=e.max-o;c>=0?(r='目前您还可以输入<span style="color:green;"> '+c+" </span>个字",a.attr("validate","true"),n.html(r)):(r='您已超出<span style="color:red;"> '+-1*c+" </span>个字",a.attr("validate","false"),n.html(r)),"blur"!=i.type||o||n.html('字数：<span style="color:red;">'+e.min+"-"+e.max+" </span>个字")})}}(n),function(e){var a=t("pizzatools");e.fn.pizzaValidate=function(t){function n(){var t=0;for(var a in o){var n=o[a],r=e(a);n.focusMsg&&n.errMsg&&(r.data("validate",n),r.focus(function(){e(this).attr("class")&&e(this).attr("class").indexOf("validate-err")>-1?e.fn.pizzaValidate.addTips(e(this),"errMsg"):e.fn.pizzaValidate.addTips(e(this),"focusMsg")}),r.blur(function(){i(e(this))})),t++}}function i(t){var n=t.data("validate"),i="true"==n.must||1==n.must,r=!0,l=e.trim(t.val());if(i||!i&&""!==l){if(""==l)return r=!1,void e.fn.pizzaValidate.addTips(t,"errMsg");if(n.comp&&l!==e.trim(e(n.comp).val()))return r=!1,void e.fn.pizzaValidate.addTips(t,"compMsg");if(n.minLength||n.maxLength){n.minLength=void 0==n.minLength?1:n.minLength,n.maxLength=void 0==n.maxLength?1e5:n.maxLength;var o=l.replace(/[^\x00-\xff]/g,"rr").length;if(!(o>=n.minLength&&o<=n.maxLength))return r=!1,void e.fn.pizzaValidate.addTips(t,"errMsg")}if(n.reg)if("string"==typeof n.reg){if(!s[n.reg].test(l))return r=!1,void e.fn.pizzaValidate.addTips(t,"errMsg")}else if(!n.reg.test(l))return r=!1,void e.fn.pizzaValidate.addTips(t,"errMsg");n.url&&(t.removeClass("pizzaajax").addClass("pizzaajax"),e.ajax({type:"POST",url:n.url,data:t.attr("name")+"="+l+a.getCsrf(),dataType:"json",success:function(a){"true"!=a.state&&e.fn.pizzaValidate.addTips(t,"errMsg"),r&&e.fn.pizzaValidate.removeTips(t),t.removeClass("pizzaajax")},error:function(){e.fn.pizzaValidate.addTips(t,"errMsg")}}))}return r&&e.fn.pizzaValidate.removeTips(t),r}var r={ajaxFunc:void 0},s={mail:/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,china:/^[\u0391-\uFFE5]+$/,"int":/^\d+$/,qq:/^[1-9]*[1-9][0-9]*$/,phone:/^[1]([3]|[4]|[5]|[8])[0-9]{9}$/,user:/^[a-zA-Z][a-zA-Z0-9_]{4,15}$/,post:/[1-9]d{5}(?!d)/,url:/^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^\"\"])*$/,idcard:/^\d{15}(\d{2}[A-Za-z0-9])?$/,ip:/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/g},t=e.extend(r,t),l=this,o=t.fields;n();var c=l.find(":submit");c.bind("click",function(){return!1}),c.click(function(){var a=!0,n="";for(var r in o){var s=o[r],u=e(r);n+=u.attr("name")+"="+u.val()+"&",s.focusMsg&&s.errMsg&&(i(u)||(a=!1))}if(n=n.substring(0,n.length-1),a)var d=setInterval(function(){0===l.find(".pizzaajax").length&&(clearInterval(d),"function"==typeof t.ajaxFun?t.ajaxFun(n):"object"==typeof t.ajaxFun?e.ajax({type:"POST",url:t.ajaxFun.url,data:n,success:t.ajaxFun.success,error:t.ajaxFun.error}):(c.unbind("click"),c.bind("click",function(){return!0}),c.click()))},50)})},e.fn.pizzaValidate.addTips=function(e,a){var n=t("pizzalayer"),i=null;i="hidden"==e.attr("type")?e.parent():e;var r="";"errMsg"==a&&(r="layer-pizza-tip-danger",i.addClass("validate-err")),n.tips(i,{msg:e.data("validate")[a],skin:r,time:5e3})},e.fn.pizzaValidate.removeTips=function(t){var e=null;e="hidden"==t.attr("type")?t.parent():t,layer.closeAll("tips"),e.removeClass("validate-err")}}(n),function(t){t.fn.tip4detail=function(){t("#tip-36526349")[0]||t("body").append('<div style="position:absolute;"><div class="tip-36526349"><i></i></div></div>');var e=t(this),a=t(".tip-36526349");e.hover(function(){var e=t(this).attr("data-explain")+"<i></i>";a.empty().append(e).css({display:"block"});var n=t(this).offset().left+"px",i=t(this).offset().top-parseInt(a.css("height"))-15+"px";a.parent().css({top:i,left:n})},function(){a.css({display:"none"})})}}(n),function(t,e){return t.store={},e?(store.get=function(t){var a=e.getItem(t);try{a=JSON.parse(a)}catch(n){a=void 0!==a?a:null}return a},store.set=function(t,a){null!==this.get(t)&&this.remove(t),"object"==typeof a?e.setItem(t,JSON.stringify(a)):e.setItem(t,a)},store.remove=function(t){e.removeItem(t)},store.clear=function(){e.clear()},store.length=e.length,void(store.getSize=function(){for(var t="",a=0;a<e.length;a++)t+=e[a];return t.replace(/[^\x00-\xff]/gi,"aa"),Math.ceil(t.length/1024)+"K"})):null}(window,window.localStorage),function(t){t.fn.pizzaSelect=function(e){function a(a){var n=t(a),l=parseInt(n.width()),o=parseInt(n.css("height")),c=n.attr("id"),u=(n.attr("class"),n.find('option[selected="selected"]')),d="",f="";void 0!=e.option.selected?(d=e.option.selected.value,f=e.option.selected.name):n.attr("val")?(d=n.attr("val"),f=n.find('option[value="'+d+'"]').text()):u.length>0?(d=u.val(),f=u.text()):(d=n.find("option").first().attr("value"),f=n.find("option").first().text());var p='<div  id="'+c+'p" class="btn-select" style="width:'+l+"px;height:"+o+'px" tabindex="0">';if(p+='<input type="hidden" value="'+d+'" name="'+n.attr("name")+'" id="'+c+'"/>',p+='<i class="select-down icon-caret-down"></i>',p+='<label class="select-button"  style="height:'+(o-2)+"px;line-height:"+(o-2)+'px;">'+f+"</label>",p+='<div class="select-list" >',p+="<ul>",e.option.selected)for(var v in e.option)"selected"!=v&&(p+='<li data="'+e.option[v]+'" >'+v+"</li>");else{var h="";n.find("option").each(function(){var e=t(this);h=void 0!=e.attr("value")?e.attr("value"):t.trim(e.text()),p+='<li data="'+h+'" >'+t(this).text()+"</li>"})}p+="</ul></div>",p+="</div>",n.after(p),i(n),r(n),s(n),n.remove()}function n(){var e;t(l).each(function(){e=a(t(this))})}function i(e){e.next().find(".select-button").click(function(){t(this).next().toggle()}),e.next().find(".select-down").click(function(){t(this).next().next().toggle()})}function r(a){a.next().find(".select-list").on("click","li",function(){var a=t(this).parent().parent().parent();t(this).attr("data")!=a.find('input[type="hidden"]').val()&&(a.find(".select-button").html(t.trim(t(this).html())),a.find('input[type="hidden"]').val(t(this).attr("data")),t.isFunction(e.onChange)&&e.onChange(t(this),a.find('input[type="hidden"]')),""!=t(this).attr("data")&&a.removeClass("validate-border")),a.find(".select-list").toggle()})}function s(){t("body").off("click.btn-select").on("click.btn-select",function(e){var a=t(e.target),n=a.parents(".btn-select"),i=n.attr("id");t(".select-list:visible").each(function(){t(this).parents(".btn-select").attr("id")!==i&&t(this).css("display","none")})})}defaults={showMaxHeight:null,optionHeight:24,triangleSize:6,triangleColor:"#fff",topPosition:!1,speed:100,option:{},onChange:null};var e=t.extend(defaults,e),l=this;n()}}(n),function(t){"use strict";function e(){}function a(){try{return document.activeElement}catch(t){}}function n(t,e){for(var a=0,n=t.length;n>a;a++)if(t[a]===e)return!0;return!1}function i(t,e,a){return t.addEventListener?t.addEventListener(e,a,!1):t.attachEvent?t.attachEvent("on"+e,a):void 0}function r(t,e){var a;t.createTextRange?(a=t.createTextRange(),a.move("character",e),a.select()):t.selectionStart&&(t.focus(),t.setSelectionRange(e,e))}function s(t,e){try{return t.type=e,!0}catch(a){return!1}}function l(t,e){if(t&&t.getAttribute(T))e(t);else for(var a,n=t?t.getElementsByTagName("input"):B,i=t?t.getElementsByTagName("textarea"):P,r=n?n.length:0,s=i?i.length:0,l=r+s,o=0;l>o;o++)a=r>o?n[o]:i[o-r],e(a)}function o(t){l(t,u)}function c(t){l(t,d)}function u(t,e){var a=!!e&&t.value!==e,n=t.value===t.getAttribute(T);if((a||n)&&"true"===t.getAttribute(M)){t.removeAttribute(M),t.value=t.value.replace(t.getAttribute(T),""),t.className=t.className.replace(j,"");var i=t.getAttribute(O);parseInt(i,10)>=0&&(t.setAttribute("maxLength",i),t.removeAttribute(O));var r=t.getAttribute(E);return r&&(t.type=r),!0}return!1}function d(t){var e=t.getAttribute(T);if(""===t.value&&e){t.setAttribute(M,"true"),t.value=e,t.className+=" "+w;var a=t.getAttribute(O);a||(t.setAttribute(O,t.maxLength),t.removeAttribute("maxLength"));var n=t.getAttribute(E);return n?t.type="text":"password"===t.type&&s(t,"text")&&t.setAttribute(E,"password"),!0}return!1}function f(t){return function(){U&&t.value===t.getAttribute(T)&&"true"===t.getAttribute(M)?r(t,0):u(t)}}function p(t){return function(){d(t)}}function v(t){return function(){o(t)}}function h(t){return function(e){return z=t.value,"true"===t.getAttribute(M)&&z===t.getAttribute(T)&&n(A,e.keyCode)?(e.preventDefault&&e.preventDefault(),!1):void 0}}function m(t){return function(){u(t,z),""===t.value&&(t.blur(),r(t,0))}}function g(t){return function(){t===a()&&t.value===t.getAttribute(T)&&"true"===t.getAttribute(M)&&r(t,0)}}function b(t){var e=t.form;e&&"string"==typeof e&&(e=document.getElementById(e),e.getAttribute(I)||(i(e,"submit",v(e)),e.setAttribute(I,"true"))),i(t,"focus",f(t)),i(t,"blur",p(t)),U&&(i(t,"keydown",h(t)),i(t,"keyup",m(t)),i(t,"click",g(t))),t.setAttribute(V,"true"),t.setAttribute(T,D),(U||t!==a())&&d(t)}var y=document.createElement("input"),x=void 0!==y.placeholder;if(t.Placeholders={nativeSupport:x,disable:x?e:o,enable:x?e:c},!x){var z,C=["text","search","url","tel","email","password","number","textarea"],A=[27,33,34,35,36,37,38,39,40,8,46],k="#ccc",w="placeholder",j=new RegExp("(?:^|\\s)"+w+"(?!\\S)"),T="data-placeholder-value",M="data-placeholder-active",E="data-placeholder-type",I="data-placeholder-submit",V="data-placeholder-bound",L="data-placeholder-focus",S="data-placeholder-live",O="data-placeholder-maxlength",N=100,F=document.getElementsByTagName("head")[0],$=document.documentElement,q=t.Placeholders,B=document.getElementsByTagName("input"),P=document.getElementsByTagName("textarea"),U="false"===$.getAttribute(L),Z="false"!==$.getAttribute(S),_=document.createElement("style");_.type="text/css";var R=document.createTextNode("."+w+" {color:"+k+";}");_.styleSheet?_.styleSheet.cssText=R.nodeValue:_.appendChild(R),F.insertBefore(_,F.firstChild);for(var D,H,J=0,K=B.length+P.length;K>J;J++)H=J<B.length?B[J]:P[J-B.length],D=H.attributes.placeholder,D&&(D=D.nodeValue,D&&n(C,H.type)&&b(H));var G=setInterval(function(){for(var t=0,e=B.length+P.length;e>t;t++)H=t<B.length?B[t]:P[t-B.length],D=H.attributes.placeholder,D?(D=D.nodeValue,D&&n(C,H.type)&&(H.getAttribute(V)||b(H),(D!==H.getAttribute(T)||"password"===H.type&&!H.getAttribute(E))&&("password"===H.type&&!H.getAttribute(E)&&s(H,"text")&&H.setAttribute(E,"password"),H.value===H.getAttribute(T)&&(H.value=D),H.setAttribute(T,D)))):H.getAttribute(M)&&(u(H),H.removeAttribute(T));Z||clearInterval(G)},N);i(t,"beforeunload",function(){q.disable()})}}(this),function(t){t.fn.memberInfo=function(e){function a(a){var n=t(".member-143000181").parent(),d=t(document).scrollTop(),p=Math.floor(a.offset().top);s=Math.floor(a.offset().left),c=a.data("dbMember"),l=t(window).width()-s,300>=l?(p-d>150?(o=p-120+"px",r='<i class="arrow-5678"></i>'):(o=p+parseInt(a.css("height"))+15+"px",r='<i class="arrow-8765"></i>'),s-=220):p-d>150?(o=p-120+"px",r='<i class="arrow-1234"></i>'):(o=p+parseInt(a.css("height"))+15+"px",r='<i class="arrow-4321"></i>'),l+="px",s+="px";var v="id="+a.attr("id")+"&nid="+a.attr("nid");if(c){var h=a.data("dbMember"),m=r+u({data:h});f.empty().append(m).css({display:"block"}),n.css({left:s,top:o})}else{if("true"==a.attr("dbMemberError"))return;t.ajax({url:e.url,data:v+i.getCsrf(),success:function(t){a.data("dbMember",t.data);var e=r+u(t);f.empty().append(e).css({display:"block"}),n.css({left:s,top:o}),a.attr("dbMemberError","false")},error:function(t){a.attr("dbMemberError","true")}})}}function n(){f.css({display:"none"})}t(".member-143000181")[0]||t("body").append('<div style="position:absolute;"><div class="member-143000181"></div></div>');var r,s,l,o,c,u='<ul>\r\n  <li class="style-1">\r\n    <span><%= data.nickName %></span>\r\n    <% if(data.duty != undefined) { %>\r\n      <em class="mcicon-circle"></em>\r\n      <%= data.duty %>\r\n    <% } %>\r\n      <br>\r\n      <% if(data.company != undefined) { %>\r\n        <%= data.company %>\r\n      <% } %>\r\n      <br>河南-郑州\r\n      <% if(data.company != undefined) { %>\r\n        <em class="mcicon-circle"></em>\r\n        <%= tools.siteData.data.know[data.know] %>\r\n      <% } %>\r\n      <% if(data.company != undefined) { %>\r\n        <em class="mcicon-circle"></em>\r\n        <%= data.phone %>\r\n      <% } %>\r\n  </li>\r\n  <li class="style-2"><i class="icon-tags"></i>\r\n    <%= data.tag.join(\'，\') %>\r\n  </li>\r\n</ul>\r\n<div class="pingjia">\r\n  <p>\r\n    <span>个人资料</span><i class="star-huang icon-star"></i><i class="star-huang icon-star"></i><i class="star-huang icon-star"></i></p>\r\n  <p>\r\n    <span>人脉质量</span><i class="star-hong icon-star"></i><i class="star-hong icon-star-half"></i></p>\r\n  <p>\r\n    <span>综合能力</span><i class="star-gray icon-star"></i></p>\r\n</div>\r\n',d=t(this),f=t(".member-143000181"),p={url:"/user/user/getdoc",on:""};e=t.extend(p,e);var v=0;d.on("mouseenter",e.on,function(){function e(t){return function(){a(t)}}var n=t(this);v=setTimeout(e(n),300)}).on("mouseleave",e.on,function(){clearInterval(v),n()})}}(n);var i=t("pizzatools");!function(t){t.fn.pizzaArea=function(e){function a(){c(),d(),p()}function n(){b.wrap('<div class="area-wrap-1234"></div>').after('<ul class="area-list" area="'+x+'"></ul>').attr("area",x),h=b.siblings("ul"),a()}function r(a){t.ajax({url:e.ajaxUrl,data:"data="+C,success:function(e){var a="";if(t.isEmptyObject(e))h.empty().append('<span style="line-height: 3em;">未找到这个城市！</span>');else{for(var n in e)a+='<li area="'+n+'">'+e[n]+"</li>";h.empty().append(a).children("li").css({width:"100%"}),o(1)}}})}function s(t){for(var e in t){var a=e.split("-");a[1]?g[a[0]].sub[e]=t[e]:(g[e]={},g[e].name=t[e],g[e].sub={})}store.set("local_area",g)}function l(a){var n=store.get("local_area"),i="";if(e.type&&(i+='<li area="unlimited">不限</li>'),-1==a)for(var r in n)i+='<li area="'+r+'">'+n[r].name+"</li>";else{var o=t.isEmptyObject(n[a].sub);if(o)t.ajax({url:e.ajaxUrl,data:"data="+a+C,success:function(t){s(t),l(a)}});else{var c=n[a].sub;for(var u in c)i+='<li area="'+u+'">'+c[u]+"</li>"}}h.empty().append(i)}function o(t){t?h.fadeIn(200):h.fadeOut(200)}function c(){var a=" ";b.on("keyup focus",function(n){var i=t.trim(t(this).val()),c=-1==i.indexOf("-"),u=i!=a;if(c){var d=/[^\u4E00-\u9FA5]/g;if(d.exec(i))return}if("focus"==n.type&&(t(".area-list").css({display:"none"}),g=store.get("local_area"),g?(l(-1),o(1)):(g={},t.ajax({url:e.ajaxUrl,data:"data=9999"+C,success:function(t){s(t),l(-1),o(1)}}))),"keyup"==n.type){if(37==n.keyCode||39==n.keyCode||i.indexOf("不")>-1)return;u&&(y=[0,0]),i.length||38==n.keyCode||40==n.keyCode||13==n.keyCode||(l(-1),o(1)),i.length&&c&&u&&38!=n.keyCode&&40!=n.keyCode&&r(i)}a=i,f(n.keyCode)})}function u(){null!==e.onChange&&e.onChange()}function d(){h.on("click","li",function(){var e=t(this),a=e.attr("area"),n=e.text();return"unlimited"==a?(m?b.val(m):b.val(n),o(0),m=null,y=[1,1],void u()):0==a.indexOf("c")?(b.val(n),o(0),y=[1,1],void u()):void(-1==a.indexOf("-")?(l(a),m=n,b.val(n),y=[1,0]):(b.val(m+"-"+n),o(0),m=null,y=[1,1],u()))})}function f(t){var e="choice",a=h.children("."+e),n=a.index(),i=h.children("li"),r=i.length;40==t?-1==n?i.eq(0).addClass(e):n==r-1?(a.removeClass(e),i.eq(0).addClass(e)):a.removeClass(e).next().addClass(e):38==t?-1==n?i.eq(-1).addClass(e):0==n?(a.removeClass(e),i.eq(-1).addClass(e)):a.removeClass(e).prev().addClass(e):13==t&&a.click()}function p(){b.on("blur",function(){v()})}function v(){var e="click.chengshixuanze";t("body").off(e).on(e,function(e){var a=t("#area").attr("defvalue");if(t(e.target).attr("area")){var n=e.target.nodeName.toLowerCase();return void("input"==n&&y[0]+y[1]!=2&&(a?b.val(a):b.val("")))}t(".area-list").css("display","none"),y[0]+y[1]!=2&&(a?b.val(a):b.val(""))})}var h,m,g,b=t(this),y=[0,0],x=Math.ceil(1e10*Math.random()),z={ajaxUrl:"/area/index",type:!0,onChange:null},C="";C=-1===document.location.href.indexOf("/pop/")?i.getCsrf():i.getCsrf({isparent:!0}),e=t.extend(z,e),n()}}(n),function(t){t.fn.pizzaTab=function(e){function a(a,n){""==t.trim(n.html())&&t.ajax({type:"POST",url:e.url,data:a.attr("param"),success:function(t){n.html(t)}})}var n={activeCla:"active",itemCla:"item",url:void 0},e=t.extend(n,e),i=this.find("ul:first");if(i.on("click","li",function(){var n=t(this),i=n.index();if(!n.hasClass(e.activeClass)){var r=n.parent().find("."+e.activeCla),s=r.index();r.removeClass(e.activeCla),n.addClass(e.activeCla);var l=n.parent().parent().children("."+e.itemCla);t(l[s]).removeAttr("style"),t(l[i]).css("display","block"),e.ajaxUrl&&a(lic,div)}}),e.url){var r=this.find("ul:first").find("."+e.activeCla),s=t("."+e.itemCla).first().css("display","block");a(r,s)}else t(this).children("."+e.itemCla).first().css("display","block")}}(n)});
;define('common/common', function(require, exports, module) {

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
  				if(event.keyCode == 13) {
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
  			if(oa.hasClass('submenu')) {
  				var oanext = oa.next();
  				if(oanext.hasClass('display')) {
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
  		var url = document.location.href.replace('http://' + location.host,'').split('#')[0];
  		console.log(url);
  		var sidebar = $('#sidebar');
  		sidebar.find('.active').removeClass('active');
  		var a = sidebar.find('a[href="'+url+'"]');
  		a.addClass('active');
  		if(a.parent().parent().parent().attr("id") != 'sidebar') {
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
  			url:'/login/index/loginout',
  			data: "d=d",
  			success: function(msg) {
  				document.location.href = '/login'
  			}
  		})
  	}
  
  	return my;
  }());
  
  module.exports = common;
  

});
