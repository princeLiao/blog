import * as React from "react"
interface props{
    [propsName:string]:any
}
export default class Admin extends React.Component<props, {}>{
    render(){
        return(
            <div>
                这是首页
            </div>
        )
    }
}

