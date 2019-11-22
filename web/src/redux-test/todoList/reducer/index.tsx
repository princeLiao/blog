import { combineReducers } from "redux"
import todoList from "./todoList"
import visibleFilter from "./visibleFilter"

const todoApp = combineReducers({
    todoList,
    visibleFilter
})
export default todoApp;