
let userService = require('../service/user-server');
let pointService = require('../service/point-service');
let util = require('../../lib/util');
let secure = require('../../lib/secure');
let dao = require('../../lib/dao');
let auth = require('../../lib/auth');
let common = require('../../lib/common');

exports.userList = async (ctx) => {
    try {
        let result = await userService.userList({});
        ctx.body.data = result;

    } catch (error) {
        errHandle(ctx, error);
    }
};

exports.login = async (ctx) => {
    let body = ctx.request.body;
    try {
        body.password = await secure.EnCryptoMd5(body.password);
        let sendType = util.sendType(body);
        let data;
        switch (sendType) {
        case 1: data = await userService.loginByPhone(body); break;
        case 2: data = await userService.loginByEmail(body); break;
        default: throw 'registerType Error';
        }
        data.token = await auth.generateToken(data);
        await global.APP.redis.hset('user', data.id, data);
        ctx.body.data = data;
    } catch (error) {
        errHandle(ctx, error);
    }
};

exports.register = async (ctx) => {
    let body = ctx.request.body;
    try {
        let fn = async (connection, condition) => {
            let user = await userService.register(condition,connection);
            await pointService.registerReward({ userId: user.id },connection);
            if(body.uuid){
                body.inviteId = secure.DeCryptoAES256(body.uuid);
                await pointService.inviteProcess({ inviteId: body.inviteId ,invitedId:user.id},connection);
                await userService.insertInviteList({ inviteId: body.inviteId ,invitedId:user.id},connection);
                
            }
            return user;
        };



        body.sendType = util.sendType(body);
        body.registerType = util.registerType(body);
        if (!common.checkPassword(body.password)) throw 1007;
        body.password = await secure.EnCryptoMd5(body.password);
        let data = await dao.manageConnection(body, fn);
        data.token = await auth.generateToken(data);
        await global.APP.redis.hset('user', data.id, data);
        ctx.body.data = data;



       
    } catch (error) {
        errHandle(ctx, error);
    }
};



exports.sendCode = async (ctx) => {
    let body = ctx.request.body;
    try {
        body.code = util.generateCode();
        let sendType = util.sendType(body);
        switch (sendType) {
        case 1: await userService.sendSMSCode(body); break;
        case 2: await userService.sendEmailCode(body); break;
        default: throw 'registerType Error';
        }
        await userService.sendCode(body);
        ctx.body.msg = 'success';
    } catch (error) {
        errHandle(ctx, error);
    }
};

exports.sendSMSCode = async (ctx) => {
    let body = ctx.request.body;
    try {
        body.code = util.generateCode();
        await userService.sendSMSCode(body);
        ctx.body.msg = 'success';
    } catch (error) {
        errHandle(ctx, error);
    }
};

exports.updateUser = async (ctx) => {
    let body = ctx.request.body;
    try {
        await userService.updateUser(body);
        ctx.body.msg = 'success';
    } catch (error) {
        errHandle(ctx, error);
    }
};




exports.changeEmailOrPhone = async (ctx, next) => {
    try {
        await auth.isAuthenticated(ctx, next);
        const { body, user } = ctx.request;
        body.id = user.id;
        body.sendType = util.sendType(body);
        const data = await userService.changeEmailOrPhone(body);
        ctx.body.msg = 'success';
        ctx.body.data = data;
    } catch (error) {
        errHandle(ctx, error);
    }
};

exports.shareInfo = async (ctx, next) => {
    try {
        await auth.isAuthenticated(ctx, next);
        let condition = { id: ctx.request.user.id };
        ctx.body.data = await userService.shareInfo(condition);
    } catch (error) {
        errHandle(ctx, error);
    }
};
exports.EnCryptoAES256 = async (ctx) => {
    try {
        let condition = ctx.request.query;
        ctx.body.data = await userService.EnCryptoAES256(condition);
        // ctx.body.data = await secure.EnCryptoAES256(text);
    } catch (error) {
        errHandle(ctx, error);
    }
};
exports.DeCryptoAES256 = async (ctx) => {
    try {
        let condition = ctx.request.query;
        ctx.body.data = await userService.DeCryptoAES256(condition);
    } catch (error) {
        errHandle(ctx, error);
    }
};

exports.inviteList = async (ctx, next) => {

    try {
        await auth.isAuthenticated(ctx, next);
        let user = ctx.request.user;
        let condition = { inviteId: user.id };
        let data = await userService.inviteList(condition);
        let totalPoints = 0;
        data.data.forEach((e) => {
            if (e.registerType == 1) {
                e.invitedName = e.phone.substr(0, 3) + '******' + e.phone.substr(9);
            }
            if (e.registerType == 2) {
                e.invitedName = e.email.replace(/.{3}(?=@)/, '***');
            }
            e.point = Number(e.point);
            totalPoints += e.point; 
            delete e.phone;
            delete e.email;
            delete e.registerType;
        });
        data.totalPoints = totalPoints;
        ctx.body.data = data;
    } catch (error) {
        errHandle(ctx, error);
    }
};

exports.forgotPassword = async (ctx) => {
    try {
        const { body } = ctx.request;
        body.sendType = util.sendType(body);
        if (!common.checkPassword(body.newPassword)) throw 1007;
        body.newPassword = await secure.EnCryptoMd5(body.newPassword);
        ctx.body.data = await userService.forgotPassword(body);
    } catch (error) {
        errHandle(ctx, error);
    }
};

exports.resetPassword = async (ctx, next) => {
    try {
        await auth.isAuthenticated(ctx, next);
        const { body } = ctx.request;
        body.id = ctx.request.user.id;
        ctx.body.data = await userService.resetPassword(body);
    } catch (error) {
        errHandle(ctx, error);
    }
};

exports.refreshUserPoint = async (ctx, next) => {
    try {
        await auth.isAuthenticated(ctx, next);
        const { body } = ctx.request;
        body.userId = ctx.request.user.id;
        ctx.body.data = await userService.refreshUserPoint(body);
    } catch (error) {
        errHandle(ctx, error);
    }
};



exports.favoriteCoins = async (ctx, next) => {
    try {
        await auth.isAuthenticated(ctx, next);
        const { body } = ctx.request;
        body.id = ctx.request.user.id;
        ctx.body.data = await userService.favoriteCoins(body);
    } catch (error) {
        errHandle(ctx, error);
    }
};


//=======================================
// exports.insertPointTest = async (ctx, next) => {
//     try {
//         const { body } = ctx.request;
//         body.id = ctx.request.user.id;
//         ctx.body.data = await userService.favoriteCoins(body);
//     } catch (error) {
//         errHandle(ctx, error);
//     }
// };

// exports.updatePointTest = async (ctx, next) => {
//     try {
//         const { body } = ctx.request;
//         body.id = ctx.request.user.id;
//         ctx.body.data = await userService.favoriteCoins(body);
//     } catch (error) {
//         errHandle(ctx, error);
//     }
// };
exports.listPointTest = async (ctx) => {
    try {
        const condition = ctx.request.body;
        ctx.body.data = await userService.listPointTest(condition);
    } catch (error) {
        errHandle(ctx, error);
    }
};

// exports.deletePointTest = async (ctx, next) => {
//     try {
//         const { body } = ctx.request;
//         body.id = ctx.request.user.id;
//         ctx.body.data = await userService.favoriteCoins(body);
//     } catch (error) {
//         errHandle(ctx, error);
//     }
// };


let errHandle = (ctx, error) => {
    logger.error('error..', error);
    if (!isNaN(error)) {
        ctx.body.code = error;
    } else {
        ctx.body.code = 500;
        ctx.body.msg = error.toString();
    }
};