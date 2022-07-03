import { takeLatest, all } from 'redux-saga/effects';
import API from '../Services/Api';
import FixtureAPI from '../Services/FixtureApi';
import DebugConfig from '../Config/DebugConfig';

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux';
import { ProductsTypes } from '../Redux/ProductsRedux';
import { PricesTypes } from '../Redux/PricesRedux';
import { CoinsTypes } from '../Redux/CoinsRedux';

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas';
import { getProducts } from './ProductsSagas';
import { websocketSagas } from './PricesSagas';
import { getCoins } from './CoinsSagas';

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create();

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),
    // some sagas receive extra parameters in addition to an action
    takeLatest(ProductsTypes.PRODUCTS_REQUEST, getProducts, api),
    takeLatest(CoinsTypes.COINS_REQUEST, getCoins, api),

    takeLatest(PricesTypes.SET_PRODUCTS, websocketSagas),
  ]);
}
