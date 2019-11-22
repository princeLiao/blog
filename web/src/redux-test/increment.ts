import { createStore } from "redux"

interface action {
    type: string;
}
/**
 *
 *
 * @param {number} [state=0]
 * @param {action} action
 */
const counter = (state: number = 0, action: action) => {
    switch (action.type) {
        case "INCREMENT":
            return state + 1
        case "DECREMENT":
            return state - 1
        default:
            return state
    }
}
//store
const store=createStore(counter);
//订阅
store.subscribe(()=>{
    console.log(store.getState())
});
export default  store ;