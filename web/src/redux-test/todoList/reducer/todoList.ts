interface action {
    type: string;
    id: number;
    text: string;
}
interface todo {
    id: number;
    text: string;
    complete: boolean;
}
const todoList = (state: Array<todo> = [], action: action): Array<todo> => {
    switch (action.type) {
        case "ADD":
            //增加一条todo
            return [
                ...state,
                {
                    id: action.id,
                    text: action.text,
                    complete: false
                }
            ]
        case "TOGGLE":
            return state.map(todo =>
                todo.id === action.id ? {
                    ...todo, complete: !todo.complete
                } : todo
            )
        default:
            return state;
    }
}

export default  todoList ;
