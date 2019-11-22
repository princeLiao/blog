import * as React from "react"
import "./NavBar.scss"
import {NavLink} from "react-router-dom"
export default class NavBar extends React.Component{
    render(){
        return(
            <div className="navLink">
            <NavLink exact to="/">网站首页</NavLink>
            <NavLink to="/webTechnology">前端技术</NavLink>
            <NavLink to="/notes">随笔杂记</NavLink>
            <NavLink to="/about">关于我</NavLink>
        </div>
        )
    }
}

