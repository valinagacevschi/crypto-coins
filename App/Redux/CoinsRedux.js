import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  coinsRequest: null,
  coinsSuccess: ['payload'],
  coinsFailure: null
});

export const CoinsTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: false,
  payload: null,
  error: null
});

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) =>
  state.merge({ fetching: true, payload: null });

// successful api lookup
export const success = (state, { payload }) => 
  state.merge({ fetching: false, error: null, payload });

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.COINS_REQUEST]: request,
  [Types.COINS_SUCCESS]: success,
  [Types.COINS_FAILURE]: failure
});
