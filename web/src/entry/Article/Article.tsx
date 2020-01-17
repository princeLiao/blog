import * as React from "react"
import DocumentTitle from "react-document-title";
import "./Article.scss";
import ajax from '@action/ajax'
import action from '@action/interface'
interface props {
    [propsName: string]: any
}
interface IState {
    title: string;
    author: string;
    time: string;
    pageViews: number;
    commentNumber: number;
    summary: string;//摘要
    content: string
}
/**
 * 表示一个Article。
 * @author durwin
 * @email 792356934@qq.com
 */
export default class Article extends React.Component<props, IState>{
    constructor(props: props) {
        super(props);
        this.state = {
            title: '',
            author: '',
            time: '',
            pageViews: 0,
            commentNumber: 0,
            summary: '',//摘要
            content: ''
        }
    }
    render() {
        const { title, author, time, pageViews, commentNumber, summary, content } = this.state;
        return (
            <DocumentTitle title="">
                <div className="x-Article">
                    <div className="container">
                        <article>
                            <h1 className="title">{title}</h1>
                            <div className="info">
                                <span className="author">{author}</span>
                                <span className="time">{time}</span>
                                <span className="pageViews">{pageViews} 浏览</span>
                                <span className="time">{commentNumber} 评论</span>
                            </div>
                            <div className="summary">{summary}</div>
                            <div className="content" dangerouslySetInnerHTML={{__html:content}}>
                            </div>
                        </article>
                    </div>
                </div>
            </DocumentTitle>
        )
    }
    componentDidMount() {
        const {params} = this.props.match
        ajax({
            url: action.article.query,
            method: 'get',
            data:{
                id:params.id
            },
            success: (data) => {
                if(data.length > 0) {
                    data = data[0]
                    this.setState(
                        {
                            title: data.title,
                            author: data.author,
                            time: data.publish_time,
                            pageViews: data.page_views,
                            commentNumber: data.comment_number,
                            summary: data.summary,//摘要
                            content: data.content
                        }
                    )
                } 
            }
        })
    }
}

