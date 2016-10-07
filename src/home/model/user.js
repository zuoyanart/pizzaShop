'use strict';
/**
 * model
 */
export default class extends think.model.base {
    init(...args) {
        super.init(...args);
        this.pk = 'id';
    }

    async page(kw, cp, mp) {
            let data = await this.where({
                    username: ["like", "%" + kw + "%"]
                })
                .limit((cp - 1) * mp, mp)
                .select();
            return {
                state: true,
                msg: data
            }
        }
        /**
         * 获取文章by id
         * @method get
         * @param  {[type]} nodeid [description]
         * @return {[type]}        [description]
         */
    async get(id) {
            let row = await this.where({
                    id: id
                })
                .fieldReverse("password,salt")
                .find();
            return {
                state: true,
                msg: row
            }
        }
        /**
         * 更新节点
         * @method update
         * @param  {[type]} node [description]
         * @return {[type]}      [description]
         */
    async userUpdate(user) {
            let row;
            if (user.password == '') {
                delete user.password;
                row = await this.update(user);
            } else {
                let salt = randomChar(10, "sp");
                user.password = think.md5(user.password + salt);
                user.salt = salt;
                row = await this.update(user);
            }
            return {
                state: true
            }
        }
        /**
         * 创建节点
         * @method create
         * @param  {[type]} node [description]
         * @return {[type]}      [description]
         */
    async create(user) {
            let salt = randomChar(10, "sp");
            user.password = think.md5(user.password + salt);
            user.salt = salt;
            let id = await this.add(user);
            return {
                state: true,
                msg: id
            }
        }
        /**
         * 更新审核状态
         * @method pass
         * @param  {[type]} id     [description]
         * @param  {[type]} ispass [description]
         * @return {[type]}        [description]
         */
    async pass(id, ispass) {
            let row = await this.where({
                id: ["IN", id.split(',')]
            }).update({
                pass: ispass
            });
            return {
                state: true
            }
        }
        /**
         * 删除文章
         * @method del
         * @param  {[type]} id [description]
         * @return {[type]}    [description]
         */
    async del(id) {
            let row = await this.where({
                id: ["IN", id.split(',')]
            }).delete();
            return {
                state: true
            }
        }
        /**
         * 校验用户是否注册
         * @param  {[type]} username [description]
         * @return {[type]}          [description]
         */
    async checkUserIsReg(username) {
            let row = await this.where({
                "username": username
            }).find();
            return {
                state: true,
                msg: row
            }
        }
        /**
         * 判断用户名和密码是否正确
         * @method checkUserLogin
         * @param  {[type]}       username [description]
         * @param  {[type]}       password [description]
         * @return {[type]}                [description]
         */
    async checkUserLogin(username, password) {
            let row = await this.field("password,id,salt").where({
                "username": username
            }).find();

            if (think.isEmpty(row)) {
                return {
                    "state": false
                };
            } else {
                if (row.password === think.md5(password + row.salt)) {
                    return {
                        "state": true,
                        "msg": row
                    };
                } else {
                    return {
                        "state": false
                    };
                }
            }
        }
        /**
         * 删除用户
         * @method dele
         * @param  {[type]} ids [description]
         * @return {[type]}     [description]
         */
    async dele(ids) {
        let rows = await this.where({
            id: ["IN", ids]
        }).delete();
        return {
            state: true
        }
    }

}
