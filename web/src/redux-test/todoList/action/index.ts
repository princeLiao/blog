let nextTodoId=0;
export const addTodo=(text:string)=>{
    return {
        id:nextTodoId++,
        text:text,
        type:"ADD"
    }
}

export const toggleTodo=(id:number)=>{
    return {
        id,
        type:"TOGGLE"
    }
}