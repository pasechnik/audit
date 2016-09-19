import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'tab1',
  /*  Async getComponent is only invoked when route matches   */
  getComponent(nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Tab1 = require('./containers/Tab1Container').default
      const reducer = require('./modules/Tab1').default

      /*  Add the reducer to the store on key 'tab1'  */
      injectReducer(store, { key: 'tab1', reducer })

      /*  Return getComponent   */
      cb(null, Tab1)

    /* Webpack named bundle   */
    }, 'tab1')
  },
})
