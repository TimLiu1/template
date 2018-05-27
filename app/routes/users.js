const router = require('koa-router')();
let userCtrl = require('../controllers/user-ctrl');
router.prefix('/users');

// router.use('/', async (ctx, next) => {
//   next();
// })

router.post('/sendCode', userCtrl.sendCode);
router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);
router.post('/inviteList', userCtrl.inviteList);
router.get('/shareInfo', userCtrl.shareInfo);
router.post('/changeEmailOrPhone', userCtrl.changeEmailOrPhone);
router.post('/forgotPassword', userCtrl.forgotPassword);
router.post('/resetPassword', userCtrl.resetPassword);
router.get('/favoriteCoins', userCtrl.favoriteCoins);
router.post('/refreshUserPoint', userCtrl.refreshUserPoint);



//test func api,just inner use

router.post('/test/list', userCtrl.userList);
router.post('/test/sendSMSCode', userCtrl.sendSMSCode);
router.post('/test/update', userCtrl.updateUser);
router.post('/test/inviteList',  userCtrl.inviteList);
router.get('/test/EnCryptoAES256', userCtrl.EnCryptoAES256);
router.get('/test/DeCryptoAES256', userCtrl.DeCryptoAES256);

router.post('/test/getPoint', userCtrl.listPointTest);

module.exports = router;
