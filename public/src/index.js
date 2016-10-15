import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory} from 'react-router';
import reduxThunk from 'redux-thunk';

import App from './components/app';

import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import Signout from './components/auth/signout';

import Welcome_Container from './components/welcome_container';

import RequireAuth from './components/auth/require_auth';

import reducers from './reducers';
import { AUTH_USER } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');

if (token) {
  store.dispatch({type: AUTH_USER});
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <indexRoute component={Welcome_Container} />
        <Route path='signin' component={Signin}></Route>
        <Route path='signup' component={Signup}></Route>
        <Route path='signout' component={Signout}></Route>
      </Route>
    </Router>
  </Provider>, document.querySelector('.breakRoot')
);
