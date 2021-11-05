import { REDIRECT } from '../constants';

export const redirect = (link) => (dispatch) => {
	dispatch({ type: REDIRECT, payload: link });
};
