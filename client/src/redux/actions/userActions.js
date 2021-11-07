import axios from 'axios';
import {
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAILURE,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAILURE,
	USER_LOGOUT,
	FORGOT_PASSWORD_REQUEST,
	FORGOT_PASSWORD_SUCCESS,
	FORGOT_PASSWORD_FAILURE,
} from '../constants';

export const register = (values, history) => async (dispatch) => {
	try {
		dispatch({ type: USER_REGISTER_REQUEST });

		const config = {
			headers: {
				// prettier-ignore
				"Content-Type": "application/json",
			},
		};

		const { data } = await axios.post('/register', values, config);

		dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

		dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

		localStorage.setItem('authToken', data.token);

		history.push('/');
	} catch (error) {
		dispatch({
			type: USER_REGISTER_FAILURE,
			payload: error.response.data.error,
		});
	}
};

export const login = (values, history) => async (dispatch) => {
	try {
		dispatch({ type: USER_LOGIN_REQUEST });

		const config = {
			headers: {
				// prettier-ignore
				"Content-Type": "application/json",
			},
		};

		const { data } = await axios.post('/login', values, config);

		dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

		localStorage.setItem('authToken', data.token);

		history.push('/');
	} catch (error) {
		dispatch({
			type: USER_LOGIN_FAILURE,
			payload: error.response.data.error,
			// payload:
			// 	error.response && error.response.data.message
			// 		? error.response.data.message
			// 		: error.message,
		});
	}
};

export const logout = (history) => async (dispatch) => {
	localStorage.removeItem('authToken');
	dispatch({ type: USER_LOGOUT });

	history.push('/');
};

export const forgotPasswordAction = (values, history) => async (dispatch) => {
	try {
		dispatch({ type: FORGOT_PASSWORD_REQUEST });

		const config = {
			headers: {
				// prettier-ignore
				"Content-Type": "application/json",
			},
		};

		const { data } = await axios.post('/forgot', values, config);

		dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data });

		history.push('/');
	} catch (error) {
		dispatch({
			type: FORGOT_PASSWORD_FAILURE,
			payload: error.response.data.error,
		});
	}
};
