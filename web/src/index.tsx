import *  as React from 'react'
import * as  ReactDOM from 'react-dom'
import './css/index.scss'
import './css/main.scss'
import AppRouter from "./router"
ReactDOM.render(<AppRouter />,document.getElementById("root"));
if (module.hot) {
    module.hot.accept()
}

