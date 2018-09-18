/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
import { createStore, applyMiddleware } from 'redux';
// import thunkMiddleware from 'redux-thunk';
import reducer from './reducer';

// const middleware = applyMiddleware(thunkMiddleware);

if (process.env.NODE_ENV !== 'production') {
	// dev 模式
	// let createLogger = require('redux-logger');
	// let reduxDevTool = require('redux-devtools-extension'); // redux工具
	// let eruda = require('eruda'); // 手机内嵌控制台
	// let Perf = require('react-addons-perf'); // react性能测试
	// const { whyDidYouUpdate } = require('why-did-you-update');
	// whyDidYouUpdate(React);
	// middleware = applyMiddleware(thunkMiddleware, createLogger());
	// middleware = reduxDevTool.composeWithDevTools(middleware);
	// eruda.init();
	// window.Perf = Perf;
}

const { __initialState } = window;
const store = createStore(reducer, __initialState);
export default store;
