import { createHashHistory } from 'history'; // 如果是hash路由
import * as React from 'react'

const emptyTemp = ()=>{
    return (
      <div>
        <p>暂时没有可阅读的文章</p>
        <p onClick={()=>{
           createHashHistory().replace('/addArticle') 
        }}>点我去发布文章</p>
      </div>
    )
}
export default emptyTemp