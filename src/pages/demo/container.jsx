import React, { Component } from 'react';
import InfiniteLoadList from './InfiniteLoadList';
import Ajax from './Ajax';

import './index.scss';

class Container extends Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			loadStatus: 'loading',
		};
	}

	componentDidMount() {
		this.props
			.getStudentEvaluate()
			.then(() => {
				this.setState({ loadStatus: 'done' });
			})
			.catch(() => {
				this.setState({ loadStatus: 'err' });
			});
	}

	componentWillReceiveProps(nextProps) {
		console.log('nextProps ', nextProps);
	}

	render() {
		if (this.state.loadStatus === 'loading') {
			return (
				<div>
					<h2>FetchingLoading...</h2>
				</div>
			);
		} else if (this.state.loadStatus === 'err') {
			return (
				<div>
					<h2>PageFail...</h2>
				</div>
			);
		}

		const { evaluateInfo = [], total = 0 } = this.props.evaluateReport;
		if (evaluateInfo && evaluateInfo.length === 0) {
			return (
				<div className="empty">
					<h2>Empty ...</h2>
				</div>
			);
		}

		const { ajaxData: { ajax } = {} } = this.props;
		console.log('---- this.props -------- ', this.props);
		return (
			<div className="container">
				{evaluateInfo &&
					evaluateInfo.length >= 1 && (
						<InfiniteLoadList evaluates={evaluateInfo} getStudentEvaluate={this.props.getStudentEvaluate} />
					)}
				<Ajax ajax={this.props.Ajax} text={ajax} />
			</div>
		);
	}
}

export default Container;
