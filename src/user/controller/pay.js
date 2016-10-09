'use strict';

import Base from './base.js';
import pingpp from 'pingpp';
export default class extends Base {

    /**
     * index action
     * @return {Promise} []
     */
    async indexAction() {
        return this.display();
    }

    async payAction() {
      let payChannel = xss(this.post());
      let self = this;

        let ping = pingpp("sk_test_C8irv1zzbjjLT0SKyTqjbDiL");
        ping.charges.create({
            subject: "Your Subject",
            body: "Your Body",
            amount: 100,
            order_no: "123456789",
            channel: "upacp_pc",
            currency: "cny",
            client_ip: self.ip(),
            extra:{
               result_url:"http://www.baidu.com"
            },
            app: {
                id: "app_D4CWrPjrLGKS5Wvz"
            }
        }, function(err, charge) {
          console.log(err);
            return self.json(charge);
        });
    }
}
