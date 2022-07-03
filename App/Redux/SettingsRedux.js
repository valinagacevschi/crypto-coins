import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setAutoStream: ['autoStream'],
  setBaseCoin: ['baseCoin'],
  startBackgroundTask: null,
  stopBackgroundTask: null,
});

export const SettingsTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  baseCoin: 'USD',
  autoStream: true,
  running: false,
});

/* ------------- Reducers ------------- */

export const _autoStream = (state, { autoStream }) => state.merge({ autoStream });
export const _baseCoin = (state, { baseCoin }) => state.merge({ baseCoin });
export const _start = (state,) => state.merge({ running: true });
export const _stop = (state,) => state.merge({ running: false });
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_AUTO_STREAM]: _autoStream,
  [Types.SET_BASE_COIN]: _baseCoin,
  [Types.START_BACKGROUND_TASK]: _start,
  [Types.STOP_BACKGROUND_TASK]: _stop,
});
