import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'tab2',
  /*  Async getComponent is only invoked when route matches   */
  getComponent(nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Tab2 = require('./containers/Tab2Container').default
      const reducer = require('./modules/Tab2').default

      /*  Add the reducer to the store on key 'tab2'  */
      injectReducer(store, { key: 'tab2', reducer })

      /*  Return getComponent   */
      cb(null, Tab2)

    /* Webpack named bundle   */
    }, 'tab2')
  },
})
