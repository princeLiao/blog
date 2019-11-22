import * as React from 'react'
import {
    Router,
    BrowserRouter,
    HashRouter,
    Route,
    Switch,
} from 'react-router-dom'
import Loadable from "@utils/Loadable"
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import 'antd/dist/antd.css';
interface routerItem {
    path: string;
    exact: boolean;
    component: string;
}
const AppRouter = () => (
    <ConfigProvider locale={zhCN}>
        <HashRouter  >
            <Switch>
                <Route path="/" exact={true} component={Loadable(() => import('@entry/Home'))} />
                <Route path="/login" exact={true} component={Loadable(() => import('@entry/Login'))} />
                <Route path="/register" exact={true} component={Loadable(() => import('@entry/Register'))} />
                <Route path="/about" exact={true} component={Loadable(() => import('@entry/About'))} />
                <Route path="/addArticle" exact={true} component={Loadable(() => import('@entry/AddArticle'))} />
                <Route path="/article" exact={true} component={Loadable(() => import('@entry/Article'))} />
            </Switch>
        </HashRouter>
    </ConfigProvider>
)

export default AppRouter;