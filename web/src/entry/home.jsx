import React, { Component } from 'react'
import DocumentTitle from "react-document-title";
import { Link } from 'react-router-dom'
import action from "action/interface.js"
import ajax from 'action/ajax.js'
import '../css/home.scss';
import util from "../js/common/util";
import { version, Button,DatePicker  } from "antd";


/**
 * 表示一个home。
 * @internal
 */
export default class Home extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        ajax({
            url:'http://localhost:3000',
            method: 'post',
            success: (res) => {

            }
        })
    }
    render() {
        return (
            <DocumentTitle title="Hello World" >
                <div className="x-home">
                    <h1>Please fork this codesandbox to reproduce your issue.</h1>
                    <div>Current antd version: {version}</div>
                    <div style={{ marginTop: "16px" }}>
                        <Button type="primary">Example button</Button>
                    </div>
                    <DatePicker />
                </div>
            </DocumentTitle>
        );
    }
}
