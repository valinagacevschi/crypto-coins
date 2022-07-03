import { combineReducers } from 'redux';
import configureStore from './CreateStore';
import rootSaga from '../Sagas/';
import { reducer as nav } from './NavigationRedux';
import { reducer as coins } from './CoinsRedux';
import { reducer as products } from './ProductsRedux';
import { reducer as prices } from './PricesRedux';
import { reducer as settings } from './SettingsRedux';

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  nav,
  coins,
  products,
  prices,
  settings,
});

export default () => {
  let { store, sagasManager, sagaMiddleware } = configureStore(reducers, rootSaga);
  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers;
      store.replaceReducer(nextRootReducer);

      const newYieldedSagas = require('../Sagas').default;
      sagasManager.cancel();
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware.run(newYieldedSagas);
      });
    });
  }

  return store;
};
