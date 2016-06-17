'use strict';

import Base from './base.js';
import upload from '../tools/upload.js';
import fs from 'fs';
export default class extends Base {
    /**
     * 上传
     * @method uploadAction
     * @return {[type]}     [description]
     */
    localAction() {
        let f = this.file();
        let self = this;
        upload.localImg(f.imgFile, 'shop', function(err, res) {
            if (!err) {
              console.log(res);
                return self.json({
                    "error": 0,
                    "url": res.key
                });
            } else {
                return self.json({
                    "error": 1,
                    "message":  err
                });
            }
        });

    }
}
