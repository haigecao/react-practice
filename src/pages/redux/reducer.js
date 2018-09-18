import { combineReducers } from 'redux';
import { DECREMENT, INCREMENT } from './action_types';

const reducer = function(state = {}, action) {
	switch (action.type) {
		case INCREMENT:
			console.log(1, state, action);
			return { ...state, ...(action.data + 1) };
		case DECREMENT:
			console.log(-1);
			return { ...state, ...(action.data - 1) };
		default:
			return state;
	}
};

export default combineReducers({
	reducer,
});
