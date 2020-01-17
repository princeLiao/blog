const config = {
  port: 3000,
  database: {
    DATABASE: 'blog',
    USERNAME: 'root',
    PASSWORD: 'lyy6851592',
    PORT: '3306',
    HOST: 'localhost'
  },
  result: (code = 0, data = null, message = '') => {
    return {
      code,
      data,
      message
    }
  },
  unSign: () => {
    return config.result(1001, null, '未登录或者登录已失效')
  }
}
module.exports = config
