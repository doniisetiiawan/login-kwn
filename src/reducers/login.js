/* eslint-disable no-case-declarations,prefer-const,no-nested-ternary */
import { combineReducers } from 'redux';
import { LOGIN_USER } from '../actions/login';

function user(
  state = {
    message: '',
    userData: {},
  },
  action,
) {
  switch (action.type) {
    case LOGIN_USER:
      let message;
      message = action.loginResponse.message
        ? action.loginResponse.message
        : action.loginResponse.length
          ? `Welcome ${action.loginResponse
            .map((item) => item.name)
            .reduce((name) => name)}`
          : 'Invalid login';
      return {
        message,
        timestamp: action.timestamp,
      };

    default:
      return state;
  }
}

const rootReducer = combineReducers({ user });

export default rootReducer;
