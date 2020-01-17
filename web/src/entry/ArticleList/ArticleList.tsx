import * as React from 'react'
import DocumentTitle from 'react-document-title'
import './ArticleList.scss'
import ajax from '@action/ajax'
import action from '@action/interface'
import { Icon, Input, Button } from 'antd'
import emptyTemp from '@components/articleEmpty'
interface IProps {
  [propsName: string]: any
}
/**
 * 表示一个ArticleList。
 * @author durwin
 * @email 792356934@qq.com
 */
export default class ArticleList extends React.Component<IProps, {}> {
  state = {
    curTag: 'new',
    lists:[]
  }
  constructor(props: IProps) {
    super(props)
  }
  render() {
    const { curTag, lists } = this.state
    return (
      <DocumentTitle title="文章列表">
        <div className="x-ArticleList">
          <div className="container">
            <div className="header">
              <Button
                onClick={this.handleTag.bind(this, 'new')}
                type={curTag === 'new' ? 'primary' : 'default'}
              >
                最新文章
              </Button>
              <Button
                onClick={this.handleTag.bind(this, 'hot')}
                type={curTag === 'hot' ? 'primary' : 'default'}
              >
                最热文章
              </Button>
              <Button
                onClick={this.handleTag.bind(this, 'master')}
                type={curTag === 'master' ? 'primary' : 'default'}
              >
                精选文章
              </Button>
              <Input.Search
                onSearch={this.handleSearch}
                placeholder="请输入文章标题、关键词、作者"
              ></Input.Search>
            </div>
            <div className="article-list">
              {
                lists.length === 0 ? emptyTemp() : (
                  lists.map(item => <div className="article-item" key={item.id} onClick={this.openArticle.bind(this,item.id)}>
                      <h2>{item.title}</h2>
                      <div>
                         {item.summary}
                      </div>
                  </div>)
                )
              }
            </div>
            
          </div>
        </div>
      </DocumentTitle>
    )
  }
  componentDidMount() {
    console.log(this.props)
    ajax({
      url: action.article.query,
      method: 'get',
      success: (data, res) => {
        this.setState({
          lists:[...data]
        })
      }
    })
  }
  handleSearch = (value: String) => {}
  handleTag = (tag: string) => {
    if (this.state.curTag !== tag) {
      this.setState({
        curTag: tag
      })
    }
  }
  openArticle(id:Number) {
    this.props.history.push(`/article/${id}`)
  }
}
