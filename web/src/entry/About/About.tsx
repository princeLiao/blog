import * as React from "react"
interface props{
    history:any,
    location:any,
    [propsName:string]:any
}
import {Redirect} from "react-router-dom"
import * as ReactDOM from "react-dom";



export default class About extends React.Component<props,{}>{
    render(){
        const {history}=this.props;
        return(
            <div>
                <p>my name is durwin</p>
                <p onClick={this.handleLClick.bind(this)}>点我登录</p>
            </div>
        )
    }
    handleLClick(){
        this.props.history.replace('/')
    }
}

