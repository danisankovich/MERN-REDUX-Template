import $ from 'jquery';
import { browserHistory } from 'react-router';
import {
  AUTH_USER, AUTH_ERROR, FETCH_USER
} from '../types'

exports.signIn = (dispatch, {email, password}) => {
  $.post(`api/users/signin`, {email, password})
    .done((response) => {
      dispatch({type: AUTH_USER});
      localStorage.setItem('token', response.token);
      browserHistory.push('/');
    })
    .fail(() => {
      dispatch(authError('EMAIL/PASSWORD combo invalid'));
    })
}

exports.signUp = (dispatch, {email, password, username}) => {
  $.ajax({
    url: `api/users/signup`,
    type: "POST",
    data: {email, password, username},
  })
    .done((response) => {
      dispatch({type: AUTH_USER});
      localStorage.setItem('token', response.token);
      browserHistory.push('/')
    })
    .fail((error) => {
      dispatch(authError(error.response.error));
    });
}

exports.getUser = (dispatch) => {
  const token = localStorage.getItem('token');
  $.ajax({
    url: `/api/users`,
    type: 'GET',
    headers: {
      "authorization": token
    }
  }).done((response) => {
    dispatch({
      type: FETCH_USER,
      payload: response
    })
  }).fail((error) => {
    dispatch(authError(error.response.error));
  })
}
export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}
