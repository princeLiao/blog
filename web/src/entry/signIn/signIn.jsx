import React, { Component } from "react";
import DocumentTitle from "react-document-title";
import "./signIn.scss";
import { Form, Icon, Input, Button, Checkbox , notification } from "antd";
import ajax from 'action/ajax.js'
import action from 'action/interface'

import {
  Link,
} from 'react-router-dom'
/**
 * 表示一个Login。
 * @internal
 */
class LoginForm extends React.Component {
  constructor(props) {
    super(props);
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        ajax({
          url: action.login.register,
          method: 'post',
          data: values,
          success: (res) => {
            notification.success({
              message:"注册成功"
            });
            // this.props.history.push("/")
          }
        })
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <DocumentTitle title="用户注册">
        <div className="x-signIn">
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              <h3 className="title">用户注册</h3>
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("username", {
                rules: [
                  {
                    required: true,
                    message: "请输入邮箱/手机号"
                  },
                  {
                    min: 8,
                    message: "最少输入8个字符"
                  },
                  {
                    max: 20,
                    message: "最大输入20个字符"
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="邮箱/手机号"
                ></Input>
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [
                  {
                    required: true,
                    message: "请输入密码"
                  },
                  {
                    min: 6,
                    message: "最少输入6个字符"
                  },
                  {
                    max: 12,
                    message: "最大输入12个字符"
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon
                      type="lock"
                      style={{ color: "rgba(0,0,0,.25)" }}
                    />
                  }
                  type="password"
                  placeholder="请输入密码"
                ></Input>
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("remember", {
                valuePropName: "checked",
                initialValue: true
              })(<Checkbox>记住密码</Checkbox>)}
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                size="large"
              >
                立即注册
              </Button>
              <Link to="/login">
                  前往登录
              </Link>
            </Form.Item>
          </Form>
        </div>
      </DocumentTitle>
    );
  }
}

export default Form.create({})(LoginForm);
