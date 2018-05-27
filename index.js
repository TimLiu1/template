const Koa = require('koa');
const app = new Koa();
const json = require('koa-json');
const path = require('path');
const onerror = require('koa-onerror');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const cors = require('@koa/cors');

const koaStaticPlus =require('koa-static-plus');
app.use(koaStaticPlus(path.join(__dirname, './public'), {
    pathPrefix: '/public'
}));

const index = require('./app/routes/index');
const users = require('./app/routes/users');
const coins = require('./app/routes/charts');
const point = require('./app/routes/point');
require('./lib/spec');
const responseJSON = require('./lib/middleware/responseJSON');

// error handler
onerror(app);
app.use(cors());

app.use(bodyParser({
    enableTypes: ['json', 'form', 'text']
}));
app.use(cors());
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

// logger
app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    /*eslint no-console: */
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});
app.use(responseJSON());


// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());
app.use(coins.routes(), coins.allowedMethods());
app.use(point.routes(), point.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx);
});

module.exports = app;
