import React, { Component } from "react";
import DocumentTitle from "react-document-title";
import "./login.scss";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import { Link } from "react-router-dom";
import validate from "common/validate"
import ajax from 'action/ajax'
import action from 'action/interface'
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
          url:action.login.in,
          method: 'post',
          data:values,
          success: (res) => {
            // this.props.history.push("/")
          }
      })
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <DocumentTitle title="用户登录">
        <div className="x-login">
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              <h3 className="title">用户登录</h3>
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("username", {
                rules: [
                  {
                    required: true,
                    message: "请输入用户名"
                  },
                  {
                    min: 8,
                    message: "最少输入8个字符"
                  },
                  {
                    max: 20,
                    message: "最大输入20个字符"
                  },
                  {
                    validator: async (rule, value) => {
                        if(value&&value.length>=8&&value.length<=20){
                            if(!validate.mobile(value)&&!validate.email(value)){
                                throw new Error('请输入正确的邮箱/手机号!');
                            }
                        }
                      }
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="邮箱/手机号码"
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
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
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
              <Link className="login-form-forgot" to="/signIn">
                忘记密码
              </Link>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                size="large"
              >
                登录
              </Button>
              没有账户，{" "}
              <Link to="/signIn">
                立即注册!
              </Link>
            </Form.Item>
          </Form>
        </div>
      </DocumentTitle>
    );
  }
}

export default Form.create({})(LoginForm);
