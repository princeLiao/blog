const Koa=require('koa');
const config=require('./config/index')
const cors = require('koa2-cors');
const koaBody=require('koa-body');
const logger=require('koa-logger');
const router=require('./controllers/index')
const app=new Koa();
const session=require('koa-session');
const session_config={
    key: 'koa:sess', /**  cookie的key。 (默认是 koa:sess) */
    maxAge: 40000,   /**  session 过期时间，以毫秒ms为单位计算 。*/
    autoCommit: true, /** 自动提交到响应头。(默认是 true) */
    overwrite: true, /** 是否允许重写 。(默认是 true) */
    httpOnly: true, /** 是否设置HttpOnly，如果在Cookie中设置了"HttpOnly"属性，那么通过程序(JS脚本、Applet等)将无法读取到Cookie信息，这样能有效的防止XSS攻击。  (默认 true) */
    signed: true, /** 是否签名。(默认是 true) */
    rolling: true, /** 是否每次响应时刷新Session的有效期。(默认是 false) */
    renew: false, /** 是否在Session快过期时刷新Session的有效期。(默认是 false) */
}
//配合session的signed属性的签名key
app.keys=["sign secret by lww"]

//中间件
// app.use(cors())
app.use(logger())
app.use(koaBody())
app.use(session(session_config,app))


app.use(async (ctx,next)=>{
    console.log(ctx.request.header)
    ctx.response.append("Access-Control-Allow-Origin",ctx.request.header.origin)
    ctx.response.append("Access-Control-Allow-Credentials",true)
    ctx.response.append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    ctx.response.type='json'
    console.log(ctx.session)
    if (!ctx.session.logged){
        if(ctx.path!=="/signin"&&ctx.path!=="/register"){
            ctx.response.body =config.result(1001,null,"未登录") 
            return ;
        }
       
    }
    await next();
    if(ctx.path=="/"){
    ctx.response.body =config.result(0,null,"未登录") 




    }
})
app.use(router.routes());
app.listen('3000',function(){
    console.log('service start at port 3000')
})