const router = require('koa-router')();
let userCtrl = require('../controllers/user-ctrl');
router.prefix('/users');

// router.use('/', async (ctx, next) => {
//   next();
// })

router.post('/sendCode', userCtrl.sendCode);
module.exports = router;
