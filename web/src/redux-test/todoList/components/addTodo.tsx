import * as React from "react"
import {
    connect
} from "react-redux"
import { addTodo } from "../action/index"
interface props {
    dispatch: any;
}
class AddTodo extends React.Component<props, {}> {
    public input: HTMLInputElement;
    render() {
        const { dispatch } = this.props;
        return (
            <div>
                <form
                    onSubmit={e => {
                        e.preventDefault()
                        if (!this.input.value.trim()) {
                            return
                        }
                        dispatch(addTodo(this.input.value))
                        this.input.value = ''
                    }}
                >
                    <input
                        ref={node => {
                            this.input = node
                        }}
                    />
                    <button type="submit">Add Todo</button>
                    <hr />
                </form>
            </div>
        )
    }
}

export default connect()(AddTodo);

// 函数柯里化   支持多参数传递
function Currying(fn, args) {
    var _this = this
    var len = fn.length;
    var args = args || [];
    return function() {
        var _args = Array.prototype.slice.call(arguments);
        Array.prototype.push.apply(args,args);
        // 如果参数个数小于最初的fn.length，则递归调用，继续收集参数
        if (_args.length < len) {
            return Currying.call(_this, fn, _args);
        }

        // 参数收集完毕，则执行fn
        return fn.apply(this, _args);
    }
}


