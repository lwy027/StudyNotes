const Koa = require("koa");
const app = new Koa();
const bodyParser = require("koa-bodyparser");

const register = require("../router/index");
app.use(bodyParser());

register(app);

module.exports = app;
