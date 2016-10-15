import {signIn, signUp, getUser} from './funcs/user';
import {
  AUTH_USER,
  UNAUTH_USER,
} from './types';

export function signinUser({email, password}) {
  return function(dispatch) {
    signIn(dispatch, {email, password});
  }
}
export function signupUser({email, password, username}) {
  return function(dispatch) {
    signUp(dispatch, {email, password, username});
  }
}

export function signoutUser() {
  localStorage.removeItem('token');
  return { type: UNAUTH_USER };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function fetchUser() {
  return function(dispatch) {
    getUser(dispatch);
  }
}
