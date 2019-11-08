const router = require('koa-router')();
const mysql = require('../mysql/index')
const LoginRouter = require("./login")
LoginRouter(router);
module.exports = router;


