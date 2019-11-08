const config=require('../config/index')
const mysql=require('mysql')

const pool=mysql.createPool({
    host:config.database.HOST,
    user:config.database.USERNAME,
    password:config.database.PASSWORD,
    database:config.database.DATABASE
})

module.exports={
    query:(sql,params)=>{
        return new Promise((resolve,reject)=>{
            pool.query(sql,params,(err,results,fields)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(results,fields)
                }
            })
        })
    },
    insert:sql=>{

    },
    update:sql=>{

    }
}