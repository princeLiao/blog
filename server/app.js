const Koa = require('koa')
const config = require('./config/index')
const cors = require('koa2-cors')
const koaBody = require('koa-body')
const logger = require('koa-logger')
const router = require('./controllers/index')
const session = require('koa-session')
const static = require('koa-static')
const favicon = require('koa-favicon')
const path = require('path')
const app = new Koa()
const port = process.env.npm_package_port
const session_config = {
  key: 'koa:sess',
  /**  cookie的key。 (默认是 koa:sess) */
  maxAge: 600000,
  /**  session 过期时间，以毫秒ms为单位计算 。*/
  autoCommit: true,
  /** 自动提交到响应头。(默认是 true) */
  overwrite: true,
  /** 是否允许重写 。(默认是 true) */
  httpOnly: false,
  /** 是否设置HttpOnly，如果在Cookie中设置了"HttpOnly"属性，那么通过程序(JS脚本、Applet等)将无法读取到Cookie信息，这样能有效的防止XSS攻击。  (默认 true) */
  signed: true,
  /** 是否签名。(默认是 true) */
  rolling: false,
  /** 是否每次响应时刷新Session的有效期。(默认是 false) */
  renew: false
  /** 是否在Session快过期时刷新Session的有效期。(默认是 false) */
}
//配合session的signed属性的签名key
app.keys = ['sign secret by lww']
//中间件
// app.use(cors())
app.use(logger())
app.use(koaBody())
app.use(session(session_config, app))
app.use(favicon(__dirname + '/static/image/alarm.png'))
app.use(async (ctx, next) => {
  if (!/^\/api/.test(ctx.path)) {
    return
  }
  ctx.response.append('Access-Control-Allow-Origin', ctx.request.header.origin)
  ctx.response.append('Access-Control-Allow-Credentials', true)
  ctx.response.append(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  ctx.response.type = 'json'
  if (!ctx.session.logged) {
    //登录标志不存在
    if (ctx.path !== '/api/signin' && ctx.path !== '/api/register') {
      ctx.response.body = config.unSign()
      return
    }
  }
  await next()
})
app.use(router.routes())
app.listen(port, function() {
  console.info('service start at  port %d', port)
})
