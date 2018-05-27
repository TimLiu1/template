let moment = require('moment');
let dao = require('../../lib/dao');
let util = require('../../lib/util');
let userDao = require('../dao/user-dao');
let userConfirmDao = require('../dao/user_confirm-dao');
let validateUser = require('./validate/validate-user');
let inviteDao = require('../dao/invite_list-dao');
let template = require('../../lib/email/template');
let secure = require('../../lib/secure');
let common = require('../../lib/common');
let baseCode = require('../../lib/baseCode');
const fs = require('fs');
class userService {

    static async userList(condition) {
        logger.info('condition', condition);
        let criteria = {
            condition: condition,
            pageInfo: {
                pageSize: condition.pageSize || 10,
                pageIndex: condition.pageIndex || 1
            }
        };
        return await dao.manageConnection(criteria, userDao.list);
    }

    static async loginByPhone(condition) {
        await validateUser.loginByPhone(condition);
        let result = await dao.manageConnection({ phone: condition.phone }, userDao.getOneUser);
        if (!result) throw 1003;
        if (result.password !== condition.password) throw 1005;
        return result;
    }

    static async loginByEmail(condition) {
        await validateUser.loginByEmail(condition);
        let result = await dao.manageConnection({ email: condition.email }, userDao.getOneUser);
        if (!result) throw 1004;
        if (result.password !== condition.password) throw 1005;
        return result;
    }

    static async register(condition, connection) {
        await validateUser.register(condition);
        let result = await userConfirmDao.getOneUserConfirm(connection, condition);
        if (!result) throw 1006;
        if (moment(result.createdAt).add('10', 'm') < moment()) {
            throw '1011';
        }
        condition.countryCode = result.countryCode;
        result = await userDao.getOneUser(connection, { email: condition.email, phone: condition.phone });
        if (result) {
            switch (condition.sendType) {
            case 1: throw 1008;
            case 2: throw 1009;
            default: throw 'registerType Error';
            }
        }
        let id = await userDao.insertUser(connection, condition);
        // registerReward
        return await userDao.getOneUser(connection, { id: id });
    }


    static async sendCode(condition) {
        let data = await validateUser.sendCode(condition);
        await dao.manageConnection(condition, userConfirmDao.insertUserConfirm);
        return data;
    }

    static async sendEmailCode(condition) {
        let data = await validateUser.sendEmailCode(condition);
        return template.codeEmail(data, (err, result) => {
            logger.info('result...', result.ok);
        });
    }
    static async updateUser(condition) {
        await validateUser.updateUser(condition);
        return await dao.manageConnection(condition, userDao.updateUser);
    }

    static async inviteList(condition) {
        await validateUser.inviteList(condition);
        let criteria = {
            condition: condition,
            pageInfo: {
                pageSize: condition.pageSize || 10,
                pageIndex: condition.pageIndex || 1
            }
        };
        return await dao.manageConnection(criteria, inviteDao.list);
    }


    static async insertInviteList(condition) {
        await validateUser.insertInviteList(condition);
        let inviteCondition = {
            inviteId:condition.inviteId,
            invitedId:condition.invitedId,
            type:1,
            point : baseCode.inviteType(1)
        };
        return await dao.manageConnection(inviteCondition, inviteDao.insertInviteList);
    }






    static async EnCryptoAES256(condition) {
        await validateUser.EnCryptoAES256(condition);
        return secure.EnCryptoAES256(condition.text);
    }

    static async getOneUser(condition) {
        await validateUser.getOneUser(condition);
        return await dao.manageConnection(condition, userDao.getOneUser);
    }

    static async DeCryptoAES256(condition) {
        await validateUser.DeCryptoAES256(condition);
        return secure.DeCryptoAES256(condition.text);
    }

    static async checkCode(connection, condition) {
        let result = await userConfirmDao.getOneUserConfirm(connection, condition);
        if (!result) throw '1006';
        if (moment(result.createdAt).add('10', 'm') < new Date()) {
            throw '1011';
        }
    }




    static async changeEmailOrPhone(condition) {
        await validateUser.changeEmailOrPhone(condition);
        switch (condition.sendType) {
        case 1: condition.type = 3; break;
        case 2: condition.type = 4; break;
        default: throw 'Unexpected Error';
        }
        let fn = async (connection, condition) => {
            await this.checkCode(connection, condition);
            let result = await userDao.getOneUser(connection, { email: condition.email, phone: condition.phone });
            if (result) {
                switch (condition.type) {
                case 3: throw 2003;
                case 4: throw 2004;
                default: throw ' Error';
                }
            }
            const id = await dao.manageConnection(condition, userDao.updateUser);
            return await userDao.getOneUser(connection, { id: id });
        };
        return await dao.manageConnection(condition, fn);
    }

    static async shareInfo(condition) {
        condition.id = secure.EnCryptoAES256(condition.id);
        const shareLink = util.generateLink(condition.id);
        const qrCodeData = await util.generateQrCode(shareLink, condition.id);
        const data = common.handleBinaryData(qrCodeData);
        logger.info('----shareInfo-----', data);
        const qrCodeFolder = `public/user/${condition.id}/${condition.id}.png`;
        const qrCode_link = global.APP.config.hostName + '/' + qrCodeFolder;
        let exist = await fs.exists(qrCodeFolder);
        if (!exist) {
            const dataBuffer = Buffer.from(data, 'base64');
            const uploadFolder = `public/user/${condition.id}`;
            common.createFolder(uploadFolder);
            await fs.writeFileSync(qrCodeFolder, dataBuffer);
        }
        const result = {
            shareUrl: shareLink,
            qrCode: qrCode_link
        };
        return result;
    }

    static async forgotPassword(condition) {
        await validateUser.forgotPassword(condition);
        let fn = async (connection, condition) => {
            await this.checkCode(connection, condition);
            let result = await userDao.getOneUser(connection, condition);
            if (!result) {
                switch (condition.sendType) {
                case 1: throw 2005;
                case 2: throw 2006;
                default: throw ' Error';
                }
            }
            condition.id = result.id;
            condition.password = condition.newPassword;
            const id = await dao.manageConnection(condition, userDao.updateUser);
            return await userDao.getOneUser(connection, { id: id });
        };
        return await dao.manageConnection(condition, fn);

    }



    static async resetPassword(condition) {
        await validateUser.resetPassword(condition);
        condition.oldPassword = await secure.EnCryptoMd5(condition.oldPassword);
        condition.newPassword = await secure.EnCryptoMd5(condition.newPassword);
        let fn = async (connection, condition) => {
            let result = await userDao.getOneUser(connection, condition);
            if (!result) {
                throw '用户不存在';
            }
            if (result.password !== condition.oldPassword) {
                throw '原先密码不正确';
            }
            condition.password = condition.newPassword;
            const id = await dao.manageConnection(condition, userDao.updateUser);
            return await userDao.getOneUser(connection, { id: id });
        };
        return await dao.manageConnection(condition, fn);
    }

}

module.exports = userService;