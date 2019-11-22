interface action {
    filter: "SHOW_ALL"|"SHOW_COMPLETE"|"SHOW_UN_COMPLETE";
}
interface todo {
    id: number;
    text: string;
    complete: boolean;
}
const visibleFilter=(state:string="SHOW_ALL", action: action): string=>{
    return action.filter||state
}

export default  visibleFilter ;