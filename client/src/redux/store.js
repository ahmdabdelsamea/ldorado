import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import {
	userRegisterReducer,
	userLoginReducer,
	forgotPasswordReducer,
	propertyListReducer,
	propertyDetailsReducer,
	addPropertyReducer,
	investReducer,
	addFundsReducer,
	dashboardDetailsReducer,
} from './reducers';

const reducer = combineReducers({
	userRegister: userRegisterReducer,
	userLogin: userLoginReducer,
	forgotPassword: forgotPasswordReducer,
	propertyList: propertyListReducer,
	propertyDetails: propertyDetailsReducer,
	addProperty: addPropertyReducer,
	invest: investReducer,
	addFunds: addFundsReducer,
	dashboardDetails: dashboardDetailsReducer,
});

const authTokenFromStorage = localStorage.getItem('authToken')
	? localStorage.getItem('authToken')
	: null;

const initialState = {
	userLogin: { authToken: authTokenFromStorage },
};

const middleware = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
