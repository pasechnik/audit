import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { loadingBarReducer } from 'react-redux-loading-bar'

import { initialState as tab1initialState } from '../routes/Tab1/modules/Tab1'
import { initialState as tab2initialState } from '../routes/Tab2/modules/Tab2'

// Fix: "React-Redux: Combining reducers: Unexpected Keys"
// http://stackoverflow.com/a/33678198/789076
const initialReducers = {
  counter: (state = 0) => state, // default value should be imported from the module/reducer
  tab1: (state = tab1initialState) => state,
  tab2: (state = tab2initialState) => state,
}

export const makeRootReducer = (asyncReducers) => combineReducers({
  // Add sync reducers here
  router,
  // app reducers
  loadingBar: loadingBarReducer,
  ...initialReducers,
  ...asyncReducers,
})

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
