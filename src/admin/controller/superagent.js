'use strict';

import Base from './base.js';
import tools from '../tools/tools.js';
import superagent from 'superagent';
import superagentProxy from 'superagent-proxy';
export default class extends Base {

    /**
     * index action
     * @return {Promise} []
     */
    indexAction() {
        let self = this;
        superagentProxy(superagent);
        var proxy = 'https://112.101.80.171:9797';
        superagent.get("https://www.jigoon.com/static/js/custom_20160629.js")
            .proxy(proxy)
            .end(function(err, res) {
                if (err) {
                    return self.write(err, "utf8");
                }
                return self.write(res.text, "utf8");
            });
    }


}
