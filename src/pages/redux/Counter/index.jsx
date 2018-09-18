/**
 * @desc 临时方案，后续替换为 mui 的方案
 */

import React, { Component } from 'react';
import Button from 'components/Button';
import './index.scss';

class Counter extends Component {
	static count = 0;
	constructor(props) {
		super(props);
		const { num = 0 } = props;
		this.num = num;
	}

	add = () => {
		this.num++;
		this.props.action.add(this.props.store);
		// this.props.store.dispatch('INCREMENT');
	};

	dec = () => {
		this.num--;
		// this.props.store.dispatch('DECREMENT');
		this.props.action.dec(this.props.store);
	};

	render() {
		const {
			num = 0,
			action: { add, dec },
		} = this.props;
		console.log('render', this.props);
		return (
			<div>
				<div className="count"> {num} </div>
				<Button onclick={this.add}>加 + </Button>
				<Button onclick={this.dec}>减 - </Button>
			</div>
		);
	}
}

export default Counter;
