// const api=devMode?"api":'';
const api='http://localhost:3000';export default {
    login:{
        in:api+'/signin',  //登录
        out:api+'/signout', //注销
        register:api+'/register', //注册
    }
}