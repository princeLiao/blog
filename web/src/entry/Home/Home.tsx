import * as React from "react"
import MouseTracker from "./renderProps"
function Example() {
    // 声明一个叫 “count” 的 state 变量。
    const [count, setCount] = React.useState(0);
    // 相当于 componentDidMount 和 componentDidUpdate:
    React.useEffect(() => {
        // 使用浏览器的 API 更新页面标题
        document.title = `You clicked ${count} times`;
      });
    
    return (
      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>
          Click me
        </button>
      </div>
    );
  }
export default class Home extends React.Component{
    state={
        name:'廖伟'
    }
    render(){
        return(
            <div onClick={this.handleClick.bind(this)}>
                 <p>这是首页123</p>  
               <MouseTracker ></MouseTracker>
            </div>
        )
    }
    handleClick=()=>{
        this.setState({
            name:Math.random()+"俩威威"
        })
    }
}



  
