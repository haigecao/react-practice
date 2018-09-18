import React from 'react';
import { Provider, connect } from 'react-redux';
import ReactDOM from 'react-dom';

import Container from './container';
import store from './store';
import * as mapDispatchToProps from './action_creators';

/**
 * Container 是 UI 组件
 * App 是通过 React-Redux 通过 connect 生成 的容器组件
 *
 *
 */

// 输入逻辑：mapStateToProps 外部的数据（即 state 对象）如何转换为 UI 组件的参数
// 输出逻辑：mapDispatchToProps 用户发出的动作如何变为 Action 对象，从 UI 组件传出去
const mapStateToProps = state => state;
const App = connect(
	mapStateToProps, // 会订阅 Store，每当state更新的时候，就会自动执行，重新计算 UI 组件的参数，从而触发 UI 组件的重新渲染。
	mapDispatchToProps // 得到的参数是 dispatch 和 ownProps
)(Container);

function init() {
	ReactDOM.render(
		<Provider store={store}>
			<App />
		</Provider>,
		document.querySelector('#app')
	);
}

init();
