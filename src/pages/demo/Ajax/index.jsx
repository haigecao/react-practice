import React, { Component } from 'react';
import classnames from 'classnames';

import './index.scss';

export default class Ajax extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.ajax();
		// .then(() => {
		// 	console.log('OK');
		// })
		// .catch(() => {
		// 	console.log('error');
		// });
	}

	render() {
		const { text } = this.props;
		console.log(this.props);
		return <div>{text}</div>;
	}
}
