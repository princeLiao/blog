const mysql = require('../mysql/index')
const config = require('../config/index')
const marked = require('marked')
/**
 * 文章相关路由
 *
 * @param {*} router
 */
module.exports = function articleRouter(router) {
    const prefix = '/article';
    router.post(`${prefix}/add`, async (ctx, next) => {
        //添加文章
        try {
            const request_data = ctx.request.body;
            const sql_array = await mysql.query("SELECT title FROM article WHERE title=? limit 1", [request_data.title])
            console.log(JSON.stringify(sql_array))
            if (sql_array.length > 0) {
                throw new Error("文章标题已存在")
            }
            const data = await mysql.query("INSERT INTO article  VALUES (null,?,?,?,?,?,0,0)",[request_data.title,request_data.author,request_data.summary,request_data.content,new Date()])
            ctx.response.body =config.result(0,null,"文章已发布") 
        } catch (err) {
            if (err.sql) {
                console.log(JSON.stringify(err))
                ctx.response.body = config.result(500, null, '数据库异常')
            } else {
                ctx.response.body = config.result(500, null, err.message)
            }
        }
    })
    router.get(`${prefix}/query`, async (ctx,next)=>{
         //查询文章
         try {
            const params = ctx.query
            let sql_array= []
            if(params.id) {
                // 查询单篇文章
                sql_array = await mysql.query("SELECT * FROM article WHERE id=? limit 1",[params.id])
            }else{
                sql_array = await mysql.query("SELECT * FROM article")
            }
            const data=sql_array.map(item=>{
                item.content=marked(item.content)
                return item
            })
            ctx.response.body =config.result(0,data,"") 
        } catch (err) {
            if (err.sql) {
                console.log(JSON.stringify(err))
                ctx.response.body = config.result(500, null, '数据库异常')
            } else {
                ctx.response.body = config.result(500, null, err.message)
            }
        }
    })
}