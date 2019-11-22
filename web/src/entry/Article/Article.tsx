import * as React from "react"
import DocumentTitle from "react-document-title";
import "./Article.scss";
import ajax from '@action/ajax'
import action from '@action/interface'
interface props {
    [propsName: string]: any
}
/**
 * 表示一个Article。
 * @author durwin
 * @email 792356934@qq.com
 */
export default class Article extends React.Component<props, {}>{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <DocumentTitle title="">
                <div className="x-Article">
                </div>
            </DocumentTitle>
        )
    }
}

