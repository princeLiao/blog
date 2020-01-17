const host = "http://localhost:4000"
const api = "/api";
const prefix = host + api;
export default {
    login: {
        in: prefix + '/signin',  //登录
        out: prefix + '/signout', //注销
        register: prefix + '/register', //注册
    },
    article: {
        add: prefix + '/article/add',
        query: prefix + '/article/query'
    }
}