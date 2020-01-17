import * as React from 'react'
import DocumentTitle from 'react-document-title'
import './AddArticle.scss'
import ajax from '@action/ajax'
import action from '@action/interface'
import { Form, Icon, Input, Button, Select, PageHeader, Modal } from 'antd'
import validate from '@utils/validate'
const { Option } = Select
interface props {
  [propsName: string]: any
}
/**
 * 表示一个AddArticle。
 * @author durwin
 * @email 792356934@qq.com
 */
class AddArticle extends React.Component<props, {}> {
  markdownHtml: HTMLTextAreaElement | null
  constructor(props: props) {
    super(props)
  }
  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    this.props.form.validateFields((err: Error, values: any) => {
      if (!err) {
        values.content = this.markdownHtml ? this.markdownHtml.innerHTML : {}
        ajax({
          url: action.article.add,
          method: 'post',
          data: values,
          success: (data, res) => {
            Modal.success({
              content: res.message
            })
          }
        })
      }
    })
  }
  handleChange = () => {
    console.log(event)
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <DocumentTitle title="添加文章">
        <div className="x-AddArticle">
          <div className="">
            <PageHeader
              style={{
                border: '1px solid rgb(235, 237, 240)'
              }}
              title="文章发表"
              subTitle="优秀的作者，在这里编辑你想要发表的文章吧！"
            />
            <Form
              onSubmit={this.handleSubmit}
              className="form"
              layout="horizontal"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 8 }}
            >
              <Form.Item label="标题">
                {getFieldDecorator('title', {
                  rules: [
                    {
                      required: true,
                      message: '请输入用户名'
                    },
                    {
                      min: 4,
                      message: '最少输入4个字符'
                    },
                    {
                      max: 20,
                      message: '最大输入20个字符'
                    }
                  ]
                })(<Input placeholder="请输入文章标题" allowClear />)}
              </Form.Item>
              <Form.Item label="编辑器类型">
                {getFieldDecorator('username', {
                  initialValue: 'md',
                  rules: [
                    {
                      required: true
                    }
                  ]
                })(
                  <Select onChange={this.handleChange}>
                    <Option value="md">markdown</Option>
                    <Option value="word">word</Option>
                  </Select>
                )}
              </Form.Item>
              <Form.Item label="内容" wrapperCol={{ span: 18 }}>
                <div className="content" id="markdown-content">
                  <textarea ref={ref => (this.markdownHtml = ref)}></textarea>
                </div>
              </Form.Item>
              <Form.Item label="摘要" wrapperCol={{ span: 12 }}>
                {getFieldDecorator('summary', {
                  rules: [
                    {
                      max: 100,
                      message: '最大输入100个字符'
                    }
                  ]
                })(
                  <Input.TextArea
                    allowClear
                    placeholder="请输入摘要"
                    rows={3}
                  ></Input.TextArea>
                )}
              </Form.Item>
              <Form.Item label="操作">
                <Button type="default" className="mr-10">
                  保存草稿
                </Button>
                <Button type="primary" htmlType="submit">
                  立即发布
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </DocumentTitle>
    )
  }
  componentDidMount() {
    this.markdownEditor()
  }
  markdownEditor() {
    var editor = editormd('markdown-content', {
      placeholder: '本编辑器支持Markdown编辑，左边编写，右边预览', //默认显示的文字，这里就不解释了
      width: '100%',
      height: 640,
      syncScrolling: 'single',
      path: '/lib/editor/lib/', //你的path路径（原资源文件中lib包在我们项目中所放的位置）
      saveHTMLToTextarea: false, // 开启后会生成一个textarea 保存markdown转化的html
      emoji: true,
      taskList: true,
      tocm: true, // Using [TOCM]
      tex: true, // 开启科学公式TeX语言支持，默认关闭
      flowChart: true, // 开启流程图支持，默认关闭
      sequenceDiagram: true, // 开启时序/序列图支持，默认关闭,
      toolbarIcons: function() {
        //自定义工具栏，后面有详细介绍
        return editormd.toolbarModes['full'] // full, simple, mini
      }
    })
  }
}
export default Form.create({})(AddArticle)
