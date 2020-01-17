import * as React from "react"
interface props{
    history:any,
    location:any,
    [propsName:string]:any
}
import {Redirect} from "react-router-dom"
import * as ReactDOM from "react-dom";



export default class About extends React.Component<props,{}>{
    constructor(props:props){
        super(props)
        this.state={
            count:0
        }
    }
    componentWillMount(){
  
    
    }
    componentDidMount(){
        setTimeout(()=>{
            this.setState({
                count:1
            },()=>{
        console.log(2);

            })
        },1000)
    }
    render(){
        const {history}=this.props;
        const {count}=this.state;
        return(
            <div>
                <p>my name is durwin</p>
                <p onClick={this.handleLClick.bind(this)}>点我登录</p>
                <p>
                    {count}
                </p>
            </div>
        )
    }
    handleLClick(){
        this.props.history.replace('/')
    }
}

