/* eslint-disable default-param-last */
import { combineReducers } from 'redux';

import {
  SET_FILTER, SET_MOVIES, SET_USERDATA, SET_USERNAME, SET_PASSWORD, setUsername,
} from '../actions/actions';

function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.payload;
    default:
      return state;
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.payload;
    default:
      return state;
  }
}

function userdata(state = { user: { Username: '', Password: '' } }, action) {
  switch (action.type) {
    case SET_USERDATA:
      return action.payload;
    case SET_USERNAME:
      return {
        ...state, user: { ...state.user, Username: action.payload },
      };
    case SET_PASSWORD:
      return {
        ...state, user: { ...state.user, Password: action.payload },
      };
    default:
      return state;
  }
}

const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  userdata,
});

export default moviesApp;
