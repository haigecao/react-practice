/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import { GET_INFO_SUCC, GET_INFO_FAIL, AJAX_GET_INFO_FAIL, AJAX_GET_INFO_SUCC } from './action_types';

/**
 *
 * @param {*}
 * @param {*}
 */
const getStudentEvaluate = function(start = 0, count = 10) {
	return dispatch => {
		return axios
			.post('/cgi-bin/ajax', {
				start,
				count,
			})
			.then(json => {
				dispatch({
					type: GET_INFO_SUCC,
					data: json.data.result,
				});
				return Promise.resolve();
			})
			.catch(json => {
				console.log('2 json', json);
				dispatch({
					type: GET_INFO_FAIL,
					data: json.data,
				});
				return Promise.reject();
			});
	};
};

const Ajax = function(a = 1, b = 2) {
	return dispatch => {
		return axios
			.post('/cgi-bin/ajax1', {
				a,
				b,
			})
			.then(json => {
				dispatch({
					type: AJAX_GET_INFO_SUCC,
					data: json.data,
				});
				return Promise.resolve();
			})
			.catch(err => {
				console.log('err 1', err);

				dispatch({
					type: AJAX_GET_INFO_FAIL,
					data: {},
				});
				return Promise.reject();
			});
	};
};

const test = () => {
	console.log('test reducer');
};

export { getStudentEvaluate, Ajax, test }; // eslint-disable-line import/prefer-default-export
