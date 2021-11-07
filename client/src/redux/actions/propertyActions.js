import axios from 'axios';
import {
	PROPERTY_LIST_REQUEST,
	PROPERTY_LIST_SUCCESS,
	PROPERTY_LIST_FAILURE,
	PROPERTY_DETAILS_REQUEST,
	PROPERTY_DETAILS_SUCCESS,
	PROPERTY_DETAILS_FAILURE,
	PROPERTY_ADD_REQUEST,
	PROPERTY_ADD_SUCCESS,
	PROPERTY_ADD_FAILURE,
} from '../constants';

export const listProperty = () => async (dispatch) => {
	try {
		dispatch({ type: PROPERTY_LIST_REQUEST });

		const { data } = await axios.get('/invest');

		dispatch({ type: PROPERTY_LIST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: PROPERTY_LIST_FAILURE,
			payload: error.response.data.error,
			// payload:
			// 	error.response && error.response.data.message
			// 		? error.response.data.message
			// 		: error.message,
		});
	}
};

export const listPropertyDetails = (id) => async (dispatch) => {
	try {
		dispatch({ type: PROPERTY_DETAILS_REQUEST });

		const { data } = await axios.get(`/invest/${id}`);

		dispatch({ type: PROPERTY_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: PROPERTY_DETAILS_FAILURE,
			payload: error.response.data.error,
			// payload:
			// 	error.response && error.response.data.message
			// 		? error.response.data.message
			// 		: error.message,
		});
	}
};

export const addPropertyAction = (values, history) => async (dispatch) => {
	try {
		dispatch({ type: PROPERTY_ADD_REQUEST });

		const authToken = localStorage.getItem('authToken');

		// prettier-ignore
		const config = {
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${authToken}`,
			},
		};

		const { data } = await axios.post('/sell/add', values, config);

		dispatch({ type: PROPERTY_ADD_SUCCESS, payload: data });

		history.push('/dashboard');
	} catch (error) {
		dispatch({
			type: PROPERTY_ADD_FAILURE,
			payload: error.response.data.error,
			// payload:
			// 	error.response && error.response.data.message
			// 		? error.response.data.message
			// 		: error.message,
		});
	}
};
