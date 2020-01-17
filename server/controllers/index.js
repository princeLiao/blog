const Router = require('koa-router');
const router = new Router({
    prefix: '/api'
})
const mysql = require('../mysql/index')
const LoginRouter = require("./login")
const ArticleRouter = require("./article")
LoginRouter(router); //将登陆相关路由注册在router上
ArticleRouter(router)
module.exports = router;


