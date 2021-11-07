import axios from 'axios';

import { INVEST_REQUEST, INVEST_SUCCESS, INVEST_FAILURE } from '../constants';

export const investAction = (id, values, history) => async (dispatch) => {
	try {
		dispatch({ type: INVEST_REQUEST });

		const authToken = localStorage.getItem('authToken');

		// prettier-ignore
		const config = {
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${authToken}`,
			},
		};

		const { data } = await axios.post(`/invest/${id}`, values, config);

		dispatch({ type: INVEST_SUCCESS, payload: data });

		history.push('/dashboard');
	} catch (error) {
		dispatch({
			type: INVEST_FAILURE,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
