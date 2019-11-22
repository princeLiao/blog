
interface todo {
    id: number;
    text: string;
    complete: boolean;
}

interface state_IF{
    todoList:Array<todo>;
    filter: "SHOW_ALL"|"SHOW_COMPLETE"|"SHOW_UN_COMPLETE";
}
export {state_IF}