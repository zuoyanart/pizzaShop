'use strict';

import Base from './base.js';
import cheerio from 'cheerio';
export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    async indexAction() {
            let json = {
                "state": true
            };
            let msg = [];
            let jsonItem = {};
            let param = xss(this.post());
            let article = await httpSpider("http://www.jianyezuqiu.cn/jianyeftweb/website/newsList.htm" + "?page=" + param.cp + "&cid=12", "get");
            let $ = cheerio.load(article, {
                normalizeWhitespace: true,
                xmlMode: true
            });
            $(".list").find("li").each(function(index, elem) {
                if (index == param.mp) {
                    return false;
                }
                let o = $(this);
                jsonItem = {};
                jsonItem.id = o.find("a").attr("href").split("id=")[1];
                if (!jsonItem.id) {
                    jsonItem.id = 5684;
                }
                jsonItem.title = o.find("h3").text();
                jsonItem.timg = o.find("img").attr("src");
                jsonItem.brief = o.find(".detailBlock > p").text();
                jsonItem.createtime = o.find(".time").text();
                jsonItem.comment = o.find(".readCount").text();
                msg.push(jsonItem);
            });
            json.msg = msg;
            return this.json(json);
        }
        /**
         * page article
         * @method pageAction
         * @return {[type]}   [description]
         */
    async getAction() {
        let json = {
            "state": true
        };
        let param = xss(this.post());
        let article = await httpSpider("http://www.jianyezuqiu.cn/jianyeftweb/website/newsRead.htm?id=" + param.id, "get");
        let $ = cheerio.load(article, {
            normalizeWhitespace: true,
            xmlMode: true
        });
        let msg = {};
        msg.title = $(".articale").find("header > h3").text();
        msg.content = htmlDecode($(".detail").html()).split('分享到')[0];

        msg.content = msg.content.replace(/<(\/){0,1}div[^<>]*>/ig, '').replace(/<\/span>/ig, "</span><br/><br/>").replace(/<(\/){0,1}span[^<>]*>/ig, '').replace(/&amp;/ig,"&");
        json.msg = msg;
        return this.json(json);
    }
}
