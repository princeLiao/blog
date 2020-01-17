/**
 * 登录路由模块
 * @param {*} router  路由实例
 */
const mysql = require('../mysql/index')
const config = require('../config/index')

module.exports = function LoginRouter(router) {
  router.post('/signin', async (ctx, next) => {
    try {
      const request_data = ctx.request.body
      const name_array = await mysql.query('SELECT name,password FROM users WHERE name=? limit 1', [request_data.username])
      if (name_array.length == 0) {
        throw new Error('用户名不存在')
      } else if (name_array[0].password !== request_data.password) {
        throw new Error('密码错误')
      }
      ctx.session.logged = true
      ctx.response.body = config.result(0, null, '登录成功')
    } catch (err) {
      if (err.sql) {
        console.log(JSON.stringify(err))
        ctx.response.body = config.result(500, null, '数据库异常')
      } else {
        ctx.response.body = config.result(500, null, err.message)
      }
    }
  })
  router.post('/register', async (ctx, next) => {
    try {
      const request_data = ctx.request.body
      if (request_data.username && request_data.password) {
        const name_array = await mysql.query('SELECT name FROM users WHERE name=? limit 1 ', [request_data.username])
        if (name_array.length > 0) {
          throw new Error('用户名已存在,请直接登录')
        }
        const data = await mysql.query('INSERT INTO users  VALUES (null,?,?)', [request_data.username, request_data.password])
        ctx.response.body = config.result(0, null, '注册成功')
      } else {
        throw new Error('用户名或密码不能为空')
      }
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
