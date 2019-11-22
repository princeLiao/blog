import { connect } from 'react-redux'
import { toggleTodo,addTodo } from '../action/index'
import TodoList from '../components/TodoList'
import {state_IF} from "../interface"
const getVisible = (state:state_IF) => {
    const todoList=state.todoList,filter=state.filter;
    switch (filter) {
        case "SHOW_COMPLETE":
            return todoList.filter(todo => todo.complete)
        case "SHOW_UN_COMPLETE":
            return todoList.filter(todo => !todo.complete)
        default:
            return todoList;
    }
}
const mapStateToProps = (state:state_IF) => {
    return {
        todoList:getVisible(state)
    }
}
const mapDispatchToProps=(dispatch:any)=>{
    return {
        onTodoCLick:(id:number)=>{
            dispatch(addTodo("测距"));
            setTimeout(()=>{
                dispatch(toggleTodo(id));
            },2000)
        }
    }
}

const visibleTodoList = connect(mapStateToProps,mapDispatchToProps)(TodoList);
export default visibleTodoList;
