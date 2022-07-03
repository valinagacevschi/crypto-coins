import { call, put } from 'redux-saga/effects';
import CoinsActions from '../Redux/CoinsRedux';
import { formatCoins } from '../Transforms';

export function* getCoins(api, action) {
  // make the call to the api
  const response = yield call(api.getAllCoins);
  // success?
  if (response.ok) {
    yield put(CoinsActions.coinsSuccess(formatCoins(response.data)));
  } else {
    yield put(CoinsActions.coinsFailure());
  }
}
