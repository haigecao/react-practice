import { DECREMENT, INCREMENT } from './action_types';

const add = function(store) {
	console.log('+1', store);
	store.dispatch({
		type: INCREMENT,
		data: 1,
	});
};

const dec = function(store) {
	console.log('-1');
	store.dispatch({
		type: DECREMENT,
		data: -1,
	});
};

export default {
	add,
	dec,
};
