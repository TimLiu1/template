let env = process.env.NODE_ENV || 'development';
let baseConfig = require('../config/config');
global.APP = {}; global.APP.config = require('../config/' + env);
global.APP.config = Object.assign(baseConfig, global.APP.config);
const InitPlugin = require('./middleware/pluginInit');
const email = require('./email/email');
let errMsg = require('../public/err-msg.json');
require('./cron');
(async () => {
    try {
        InitPlugin();
        email.config(global.APP.config.emailConfig);
        await global.APP.redis.set('errMsg', errMsg);
    } catch (error) {
        /*eslint no-console: */
        console.log('...', error.stack);
    }

})();


// let quick-redis = require('quick-redis')

