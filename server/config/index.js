module.exports={
    port:3000,
    database:{
        DATABASE:'blog',
        USERNAME:'root',
        PASSWORD:'',
        PORT:'3306',
        HOST:'localhost'
    },
    result:(code=0,data=null,message="")=>{
        return {
            code,
            data,
            message
        }
    }
}