import axios from 'axios';
import {
	DASHBOARD_DETAILS_REQUEST,
	DASHBOARD_DETAILS_SUCCESS,
	DASHBOARD_DETAILS_FAILURE,
} from '../constants';

export const getDashboard = () => async (dispatch) => {
	try {
		dispatch({ type: DASHBOARD_DETAILS_REQUEST });

		const authToken = localStorage.getItem('authToken');

		// prettier-ignore
		const config = {
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${authToken}`,
		},
	};
		const { data } = await axios.get(`/dashboard`, config);

		dispatch({ type: DASHBOARD_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: DASHBOARD_DETAILS_FAILURE,
			payload: error.response.data.error,
			// payload:
			// 	error.response && error.response.data.message
			// 		? error.response.data.message
			// 		: error.message,
		});
	}
};
