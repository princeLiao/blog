import * as React from "react"
import DocumentTitle from "react-document-title";
import "./AddArticle.scss";
import ajax from '@action/ajax'
import action from '@action/interface'
import { Form, Icon, Input, Button, Select } from "antd";
import validate from "@utils/validate"
const { Option } = Select;
interface props {
    [propsName: string]: any
}
/**
 * 表示一个AddArticle。
 * @author durwin
 * @email 792356934@qq.com
 */
class AddArticle extends React.Component<props, {}>{
    constructor(props: props) {
        super(props);
    }
    handleSubmit = () => {
        event.preventDefault();
        debugger
        this.props.form.validateFields((err, values) => {
            if (!err) {
                ajax({
                    url: action.login.in,
                    method: 'post',
                    data: values,
                    success: (res) => {
                        // this.props.history.push("/")
                    }
                })
            }
        });
    }
    handleChange = () => {
        console.log(event)
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <DocumentTitle title="添加文章">
                <div className="x-AddArticle">
                    <div className="mod-container">
                        <h3 className="title">文章发表</h3>
                        <Form onSubmit={this.handleSubmit} className="form" layout="horizontal" labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
                            <Form.Item label="标题" >
                                {
                                    getFieldDecorator("title", {
                                        rules: [
                                            {
                                                required: true,
                                                message: "请输入用户名"
                                            },
                                            {
                                                min: 4,
                                                message: "最少输入4个字符"
                                            },
                                            {
                                                max: 20,
                                                message: "最大输入20个字符"
                                            }]
                                    })(
                                        <Input placeholder="请输入文章标题" allowClear />
                                    )
                                }
                            </Form.Item>
                            <Form.Item label="编辑器类型" >
                                {getFieldDecorator("username", {
                                    initialValue: "md",
                                    rules: [
                                        {
                                            required: true,
                                        }]
                                })(
                                    <Select onChange={this.handleChange}
                                    >
                                        <Option value="md">markdown</Option>
                                        <Option value="word">word</Option>
                                    </Select>
                                )}
                            </Form.Item>
                            <Form.Item label="内容"  wrapperCol={{ span: 18 }}>
                                    <div className="content" id="markdown-content">

                                    </div>
                            </Form.Item>
                            <Form.Item label="摘要" wrapperCol={{ span: 12 }} >
                                {getFieldDecorator("summary", {
                                    rules: [
                                        {
                                            max: 100,
                                            message: "最大输入100个字符"
                                        }]
                                })(
                                    <Input.TextArea allowClear placeholder="请输入摘要" rows="3"></Input.TextArea>
                                )}

                            </Form.Item>
                        </Form>
                    </div>

                </div>
            </DocumentTitle>
        )
    }
    componentDidMount(){
        var editor = editormd("markdown-content", {
            width  : "100%",
            height : 740,
            path   : "/lib/editor/lib/"
        });
    }
}
export default Form.create({})(AddArticle);

