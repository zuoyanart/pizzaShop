'use strict';

import Base from './base.js';
import mail from '../tools/mail.js';
import cheerio from 'cheerio';
export default class extends Base {

    /**
     * index action
     * @return {Promise} []
     */
    async indexAction() {
        let _self = this;
        var webObj = this.get("object");
        var article = await readFile("/data/host/pizzaManage/app/mochawesome-reports/mochawesome.html");
        let $ = cheerio.load(article, {
            normalizeWhitespace: true,
            xmlMode: true
        });
        if ($(".summary-failures > h1").text() != 0) {
            var ml = new mail();
            ml.sendMail("490526801@qq.com", webObj + "mocha单元测试失败", webObj + "mocha单元测试失败").then(function(msg) {
                console.log("msg=" + msg);
                _self.end(msg);
            });
        } else {
            return this.json({
                "state": "true"
            });
        }
    }

    async goAction() {
        let _self = this;
        var webObj = this.get("object");
        var hosts = this.get("hosts");
        let article = await httpSpider("http://192.168.1.134:8080", "get");
        console.log(article);
        let $ = cheerio.load(article, {
            normalizeWhitespace: true,
            xmlMode: true
        });
        if ($(".summary-failures > h1").text() != 0) {
            var ml = new mail();
            ml.sendMail("490526801@qq.com", webObj + "golang单元测试失败", webObj + "golang单元测试失败").then(function(msg) {
                console.log("msg=" + msg);
                _self.end(msg);
            });
        } else {
            return this.json({
                "state": "true"
            });
        }
    }

    async nightwatchAction() {
        let _self = this;
        var webObj = this.get("obj");
        var ml = new mail();

        let article = await readFile("/data/host/nightwatch/reports/report.txt");
        if (article.toString().indexOf("FAILED") > -1) {
            article = article.toString().replace(/\n/g, "<br/>").replace(/\[0m/g, "&nbsp;");
            article = article.replace(/\[0;32m/g, "&nbsp;");
            article = article.replace(/\[0;31m/g, "&nbsp;");
            article = article.replace(/\[0;36m/g, "&nbsp;");
            article = article.replace(/\[40m/g, "&nbsp;");
            article = article.replace(/\[0;35m/g, "&nbsp;");
            article = article.replace(/\[1;37m/g, "&nbsp;");
            article = article.replace(/\[0;37m/g, "<br/>&nbsp;");
            console.log(article);
            ml.sendMail("490526801@qq.com", "验收测试失败", article).then(function(msg) {
                console.log("msg=" + msg);
                _self.end(msg);
            });
        } else {
            return this.json({
                "state": "true"
            });
        }
    }

}
