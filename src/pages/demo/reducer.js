import { combineReducers } from 'redux';
import { GET_INFO_FAIL, GET_INFO_SUCC, AJAX_GET_INFO_SUCC, AJAX_GET_INFO_FAIL } from './action_types';

const evaluateReport = function(state = {}, action) {
	console.log('evaluateReport reducer action = ', action.type);

	switch (action.type) {
		case GET_INFO_SUCC:
			return Object.assign({}, state, {
				evaluateInfo:
					(state.evaluateInfo && state.evaluateInfo.concat(action.data.evaluateInfo)) || action.data.evaluateInfo,
			});

		case GET_INFO_FAIL:
		default:
			return state;
	}
};

const ajaxData = function(state = {}, action) {
	console.log('ajaxData reducer action = ', action.type);

	switch (action.type) {
		case AJAX_GET_INFO_SUCC:
			const { data: { ajax = 'text ajax' } = {} } = action;
			console.log('ajax reducer ', ajax);
			return Object.assign({}, state, {
				ajax,
			});

		case AJAX_GET_INFO_FAIL:
			return Object.assign({}, state, {
				ajax: { msg: 'no message' },
			});
		default:
			return state;
	}
};

const test = function(state = {}, action) {
	console.log('test reducer action = ', action.type);
	return state;
};

export default combineReducers({
	evaluateReport,
	ajaxData,
	test,
});
