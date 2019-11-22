import * as React from 'react'
import {
    Router,
    BrowserRouter,
    HashRouter,
    Route,
    Switch,
} from 'react-router-dom'
import Loadable from "@utils/Loadable"
import NavBar from "@entry/NavBar"
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import 'antd/dist/antd.css';
interface routerItem {
    path: string;
    exact:boolean;
    component: string;
}
const routerConfig = routerTemp;
const AppRouter = () => (
    <ConfigProvider locale={zhCN}>
        <HashRouter  >
            <NavBar />
            <Switch>
                {
                      routerConfig
                }
            </Switch>
        </HashRouter>
    </ConfigProvider>
)

export default AppRouter;