import { call, put, all, select } from 'redux-saga/effects';
import ProductsActions from '../Redux/ProductsRedux';
import PricesActions from '../Redux/PricesRedux';
import SettingsActions from '../Redux/SettingsRedux';
import { formatProducts } from '../Transforms';

export const selectAutoStream = state => state.settings.autoStream;

export function* getProducts(api, action) {
  const { data } = action;
  // make the call to the api
  const response = yield call(api.getProducts, data);
  // success?
  if (response.ok) {
    yield all([
      put(ProductsActions.productsSuccess(formatProducts(response.data))),
      put(PricesActions.setProducts(response.data))
    ]);
    const autoStream = yield select(selectAutoStream);
    if (autoStream) {
      yield put(SettingsActions.startBackgroundTask());
    }
  } else {
    yield put(ProductsActions.productsFailure());
  }
}
