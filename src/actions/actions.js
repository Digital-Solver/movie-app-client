// Action Types
export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_USERDATA = 'SET_USERDATA';
export const SET_USERNAME = 'SET_USERNAME';
export const SET_PASSWORD = 'SET_PASSWORD';


// Action Creators
export function setMovies(payload) {
  return { type: SET_MOVIES, payload };
}

export function setFilter(payload) {
  return { type: SET_FILTER, payload };
}

export function setUserdata(payload) {
  return { type: SET_USERDATA, payload };
}

export function setUsername(payload) {
  return { type: SET_USERNAME, payload };
}

export function setPassword(payload) {
  return { type: SET_PASSWORD, payload };
}
