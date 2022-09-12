// Action Types
export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_USER = 'SET_USER';

// Action Creators
export function setMovies(payload) {
  return { type: SET_MOVIES, payload };
}

export function setFilter(payload) {
  return { type: SET_FILTER, payload };
}

export function setUserdata(payload) {
  return { type: SET_USER, payload };
}
