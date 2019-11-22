import * as React from "react"
import { toggleTodo } from '../action/index'
interface props {
    todoList:Array<any>;
    onTodoCLick:any;
}
export default class TodoList extends React.Component<props, {}>{
    render() {
        const {todoList,onTodoCLick}=this.props;
        return (
            <ul>
                {todoList.map(todo => (
                    <li key={todo.id} style={{
                        textDecoration:todo.complete?"line-through":"normal"
                    }} onClick={()=>{
                        onTodoCLick(todo.id)

                    }}>
                        {todo.text}
                        {todo.complete?"已完成":"未完成"}
                    </li>
                ))}
            </ul>
        )
    }
}
