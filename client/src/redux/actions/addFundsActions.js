import axios from 'axios';
import {
	ADD_FUNDS_REQUEST,
	ADD_FUNDS_SUCCESS,
	ADD_FUNDS_FAILURE,
} from '../constants';

export const addFundsAction = (values) => async (dispatch, getState) => {
	try {
		dispatch({ type: ADD_FUNDS_REQUEST });

		const {
			userLogin: { authToken },
		} = getState();

		// prettier-ignore
		const config = {
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${authToken}`,
			},
		};

		const { data } = await axios.post(
			'/create-checkout-session',
			values,
			config
		);

		dispatch({ type: ADD_FUNDS_SUCCESS, payload: data });
		window.location.href = data.sessionUrl;
	} catch (error) {
		dispatch({
			type: ADD_FUNDS_FAILURE,
			payload: error.response.data.error,
			// payload:
			// 	error.response && error.response.data.message
			// 		? error.response.data.message
			// 		: error.message,
		});
	}
};
