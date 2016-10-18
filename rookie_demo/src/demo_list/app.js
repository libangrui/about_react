import { bindActionCreators } from 'redux'
import React, { findDOMNode, Component } from 'react'
import { connect } from 'react-redux'
import PageBean from './PageBean'
import * as Actions from './actions'

class App extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		console.log("渲染完毕");

		this.props.dispatch( Actions.list_xhr_get() );

	}

	componentWillReceiveProps(newProps) {
		console.warn("newProps:", newProps);

		if( newProps.list.step === "send" ){
			this.props.dispatch( Actions.list_xhr_get( {current: newProps.list.pageBean.current} ) );
		}

		if( newProps.list.step === "add" ){
			this.props.dispatch( Actions.list_item_add_xhr( {name: newProps.list.add.name} ) );
		}

		if( newProps.list.step === "del" ){
			this.props.dispatch( Actions.list_item_del_xhr( {id: newProps.list.del.id} ) );
		}

	}

	list_item_add() {
		let val = this.refs.input_add.value;
		console.log("列表项新增值:", val);

		if(val){
			this.props.as.list_item_add(val);
		}
	}

	list_item_del(id) {
		console.log("id:", id);
		this.props.as.list_item_del(id);
	}

	changePage(op) {
		console.log("翻页:", op);
		this.props.dispatch( Actions.pageBean_go(op) );
	}

	render() {
		return (
			<div>
				<input type="text" ref="input_add" /><button onClick={ this.list_item_add.bind(this) }>新增</button>
				<ul>
					{this.props.list.items.map( it => 
						<li key={it.id}>
							{it.name}  {it.job} &nbsp;&nbsp;
							<a onClick={ () => this.list_item_del(it.id) }>删除</a>
						</li>
					)}
				</ul>
				<PageBean {...this.props.list.pageBean} onChange={this.changePage.bind(this)} />
			</div>
		);
	}
}

//将reducers的return值注册到react的props上
function mapStateToProps(state){
	console.log("reducers 的值注册到 props ->", state);
	return state;
}

//将action的所有方法绑定到props上
function mapDispatchToProps(dispatch){
	console.log(dispatch);
	let _action = bindActionCreators(Actions, dispatch);
	console.log("将action的所有方法绑定到props上 ->", _action);

	return {
		as: _action,
		dispatch
	};
}

//将state的 "指定值" 映射在props上，将 action的 "所有方法" 映射在props上
export default connect(mapStateToProps, mapDispatchToProps)(App)
