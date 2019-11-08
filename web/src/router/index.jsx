import React, { Componnte } from 'react'
import {
  BrowserRouter as Router,
  HashRouter,
  Route,
  Link,
  Switch,
  Redirect,
} from 'react-router-dom'
import getComponent from 'component/getComponent';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

const RoutesUrl = {
  home: '/',
  uCenter: '/uCenter',
  login: '/login',
  signIn:'/signIn'

};
const supportsHistory = 'pushState' in window.history
const WechatReact = () => (
  <ConfigProvider locale={zhCN}>
    <HashRouter forceRefresh={!supportsHistory} >
      <Switch>

        {
          routers.map((item, index) => {
            return <Route exact={item.exact} path={item.path} component={item.component} key={index} />
          })
        }
      </Switch>
    </HashRouter>
  </ConfigProvider>
)
const routers = [];
for (let i in RoutesUrl) {
  routers.push({
    path: RoutesUrl[i],
    exact: RoutesUrl[i] == "\/" ? true : false,
    component: RoutesUrl[i] == "\/" ? (props) => getComponent(props, () => import('entry/' + i)) : (props) => getComponent(props, () => import(`entry/${i}/${i}`))
  })
}
export default WechatReact