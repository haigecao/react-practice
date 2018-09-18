/* eslint-disable
   react/sort-comp,
   global-require
 */
import React, { Component } from 'react';
import classnames from 'classnames';
import Items from './Items';

import './index.scss';

export default class InfiniteLoadList extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<Items />
			</div>
		);
	}
}
