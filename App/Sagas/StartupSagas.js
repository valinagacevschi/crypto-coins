import { put, all } from 'redux-saga/effects';
import ProductsActions from '../Redux/ProductsRedux';
import CoinsActions from '../Redux/CoinsRedux';

// process STARTUP actions
export function* startup() {
  if (__DEV__ && console.tron) {
    // fully customized!
    const subObject = { a: 1, b: [1, 2, 3], c: true };
    subObject.circularDependency = subObject; // osnap!
    console.tron.display({
      name: '🔥 IGNITE 🔥',
      preview: 'You should totally expand this',
      value: {
        '💃': 'Welcome to the future!',
        subObject,
        someInlineFunction: () => true,
        someGeneratorFunction: startup,
      }
    });
  }
  yield all([
    put(CoinsActions.coinsRequest()),
    put(ProductsActions.productsRequest())
  ]);
}
