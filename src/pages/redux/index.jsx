import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';

import Counter from './Counter';
import './index.scss';
import store from './store';
import action from './action_creators';

console.log('-store-', store);
class App extends Component {
	render() {
		return (
			<div>
				<Counter action={action} store={store} />
			</div>
		);
	}
}

ReactDOM.render(<App />, document.querySelector('#app'));
