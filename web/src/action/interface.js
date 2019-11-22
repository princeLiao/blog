const api="/api";
export default {
    login:{
        in:api+'/signin',  //登录
        out:api+'/signout', //注销
        register:api+'/register', //注册
    }
}