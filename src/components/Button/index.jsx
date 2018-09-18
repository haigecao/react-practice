/**
 * @desc 临时方案，后续替换为 mui 的方案
 */

import React, { Component } from 'react';

import './index.scss';

class Button extends Component {
	render() {
		return <button {...this.props}>{this.props.children}</button>;
	}
}

export default Button;
