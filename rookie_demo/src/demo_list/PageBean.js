import React, { PropTypes, Component } from 'react'

class PB extends Component {
	constructor(props) {
		super(props);
	}

	prevPage() {
		this.props.onChange("prev");
	}

	nextPage() {
		this.props.onChange("next");
	}

	render() {
		let {total, current, size, count} = this.props;

		return (
			<div>
				共 {total} 页 &nbsp; 当前第 {current} 页 &nbsp;
				<a onClick={this.prevPage.bind(this)}>上一页</a> &nbsp;
				<a onClick={this.nextPage.bind(this)}>下一页</a> &nbsp;
				共 {count} 条记录
			</div>
		);
	}
}

export default PB;