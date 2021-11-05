import axios from 'axios';
import {
	DASHBOARD_DETAILS_REQUEST,
	DASHBOARD_DETAILS_SUCCESS,
	DASHBOARD_DETAILS_FAILURE,
} from '../constants';

export const getDashboard = () => async (dispatch, getState) => {
	try {
		dispatch({ type: DASHBOARD_DETAILS_REQUEST });

		const {
			userLogin: { authToken },
		} = getState();

		// prettier-ignore
		const config = {
			headers: {
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
