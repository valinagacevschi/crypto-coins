import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import _ from 'lodash';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setProducts: ['products'],
  addValue: ['payload'],
});

export const PricesTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({ });

/* ------------- Reducers ------------- */

// request the data from an api
const setProducts = (state, { products }) => 
  state.merge({ 
    ..._.fromPairs(
      products.map(({ id, base_currency, display_name }) => [
        id,
        {
          id,
          display_name,
          base_currency,
          values: []
        }
      ]
    )
  )
});

// successful api lookup
const addValue = (state, { payload }) => {
  const { product, value } = payload;
  const prod = state[product].asMutable();
  let values = prod.values.concat(value);
  if (values.length > 50) {
    values = _.takeRight(values, 50);
  }
  return state.merge({ [product]: { ...prod, values } });
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_PRODUCTS]: setProducts,
  [Types.ADD_VALUE]: addValue,
});
