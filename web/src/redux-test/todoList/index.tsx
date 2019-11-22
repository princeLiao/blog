import * as  ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore,applyMiddleware } from 'redux'
import todoApp from "./reducer"
import logger from 'redux-logger'
import App from "./components/app"

let store=createStore(todoApp,applyMiddleware(logger));

const render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById("root"));
}
render();
store.subscribe(()=>{
    const state=store.getState();
    console.log(state);
    // render();
})



