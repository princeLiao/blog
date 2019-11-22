import * as React from "react"
import AddTod from "./addTodo"
import VisibleTodoList from "../container/todoList"
export default class App extends React.Component{
    render(){
        console.log(this.props)
        return(
            <div>
                <AddTod />
                <VisibleTodoList />
            </div>
        )
    }
}