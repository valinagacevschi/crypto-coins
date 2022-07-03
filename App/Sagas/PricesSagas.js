import { call, put, take, select, fork, cancel, cancelled } from 'redux-saga/effects';
import { SettingsTypes } from '../Redux/SettingsRedux';
import { websocketInitChannel } from '../Services/WebSocketApi';

export const selectProducts = state => state.products.payload;
export const selectAutoStream = state => state.settings.autoStream;

export function* websocketSagas() {
  const products = yield select(selectProducts);
  const prods = products.map(p => p.id);
  while (yield take(SettingsTypes.START_BACKGROUND_TASK)) {
    // starts the task in the background
    const bgSyncTask = yield fork(bgSync, prods);
    // wait for the user stop action
    yield take(SettingsTypes.STOP_BACKGROUND_TASK);
    // user clicked stop. cancel the background task
    // this will cause the forked bgSync task to jump into its finally block
    yield cancel(bgSyncTask);
    // wait for the start
  } 
}

function* bgSync(prods) {
  const channel = yield call(websocketInitChannel, prods);
  try {
    while (true) {
      const action = yield take(channel);
      yield put(action);
    }
  } finally {
    if (yield cancelled()) {
      channel.close();
    }
  }
}
