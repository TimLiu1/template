const common = require('../../../lib/common');
class validateUser {
    static async loginByPhone(condition) {
        if (!condition.phone) {
            throw 1001;
        }
        if (!condition.password) {
            throw 1003;
        }
    }

    static async loginByEmail(condition) {
        if (!condition.email) {
            throw 1002;
        }
        if (!condition.password) {
            throw 1003;
        }
    }


    static async register(condition) {
        if (!condition.password) {
            throw '密码必须输入';
        }
        if (!condition.code) {
            throw 'code必须输入';
        }
    }



    static async sendCode(condition) {
        if (!condition.phone && !condition.email) {
            throw 1011;
        }
        if (!condition.code) {
            throw 'code miss';
        }
        if (!condition.type) {
            throw 'type miss';
        }
        return condition;
    }
    static async inviteProcess(condition) {
        if (!condition.uuid) {
            throw 'uuid miss';
        }
        if (!condition.invitedId) {
            throw 'invitedId miss';
        }
        return condition;
    }
    static async EnCryptoAES256(condition) {
        if (!condition.text) {
            throw 'text miss';
        }
        return condition;
    }
    static async DeCryptoAES256(condition) {
        if (!condition.text) {
            throw 'text miss';
        }
        return condition;
    }
    

    




    static async sendSMSCode(condition) {
        if (!condition.phone) {
            throw 1001;
        }
        if (!condition.countryCode) {
            throw 'countryCode Miss';
        }
        if (!condition.code) {
            throw 'code miss';
        }

        return condition;
    }

    static async sendEmailCode(condition) {
        if (!condition.email) {
            throw 1002;
        }
        if (!condition.code) {
            throw 'code miss';
        }

        return condition;
    }
    static async updateUser(condition) {
        if (!condition.id) {
            throw 'id miss';
        }
        return condition;
    }

    static async inviteList(condition) {
        if (!condition.inviteId) {
            throw 'inviteId miss';
        }
        return condition;
    }

    static async getOneUser(condition) {
        if (!condition.id) {
            throw 'id miss';
        }
        return condition;
    }
    static async insertInviteList(condition) {
        if (!condition.invitedId) {
            throw 'invitedId miss';
        }
        if (!condition.inviteId) {
            throw 'inviteId miss';
        }
        return condition;
    }


    

    
    



    static async changeEmailOrPhone(condition) {
        if (!condition.email && !condition.phone) {
            throw '更新的信息必须输入';
        }
        if (!condition.code) {
            throw 'code miss';
        }
        if (!condition.type) {
            throw 'type miss';
        }
        return condition;
    }

    static async forgotPassword(condition) {
        if (!condition.email && !condition.phone) {
            throw 'email or phone miss';
        }
        if (!condition.code) {
            throw 'code miss';
        }
    }

    static async resetPassword(condition) {
        if (!condition.oldPassword) {
            throw '请输入原先的密码';
        }
        if (!condition.newPassword) {
            throw '请输入新的密码';
        }
        if (!common.checkPassword(condition.newPassword)) throw 1007;
    }
}

module.exports = validateUser;