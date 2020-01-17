import * as React from 'react';
import * as Loadable from 'react-loadable';
import { Spin } from 'antd';
//通用的过场组件
const loadingComponent =()=>{
    return (
        <div className="router-loading">
            <Spin size="large" />
        </div>
    ) 
}

//过场组件默认采用通用的，若传入了loading，则采用传入的过场组件
export default (loader:any,loading = loadingComponent)=>{
    return Loadable({
        loader,
        loading
    });
}
