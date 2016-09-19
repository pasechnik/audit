import React from 'react'
import { match } from 'react-router'
import { renderToString } from 'react-dom/server'
import { syncHistoryWithStore } from 'react-router-redux'
import createMemoryHistory from 'react-router/lib/createMemoryHistory'
import { getStyles } from 'simple-universal-style-loader'
import Helmet from 'react-helmet'
import { renderHtmlLayout } from 'helmet-webpack-plugin'
import _debug from 'debug'
import createStore from './store/createStore'
import AppContainer from './containers/AppContainer'
import * as Assetic from './modules/Assetic'
import defaultLayout from '../config/layout'
import config from '../config'
import { createRoutes } from './routes/index'

const debug = _debug('app:server:universal:render')

export default getClientInfo => async(ctx) => {
  const initialState = {}
  const memoryHistory = createMemoryHistory(ctx.req.url)
  const store = createStore(initialState, memoryHistory)
  // const routes = require('./routes/index').default(store);
  const routes = createRoutes(store)

  const history = syncHistoryWithStore(memoryHistory, store, {
    selectLocationState: (state) => state.router,
  })

  match({ history, routes, location: ctx.req.url }, async(err, redirect, props) => {
    debug('Handle route', ctx.req.url)

    let head = null
    let content = null
    const { app, vendor } = getClientInfo().assetsByChunkName
    const links = Assetic
      .getStyles(([vendor, app]))
      .map(asset => ({
        rel: 'stylesheet',
        href: `${asset}`,
      }))

    // This will be transferred to the client side in __LAYOUT__ variable
    // when universal is enabled we need to make sure the client to know about the chunk styles
    const layoutWithLinks = {
      ...defaultLayout,
      link: links,
    }

    // React-helmet will overwrite the layout once the client start running so that
    // we don't have to remove our unused styles generated on server side
    const layout = {
      ...layoutWithLinks,
      style: getStyles().map(style => ({
        cssText: style.parts.map(part => `${part.css}\n`).join('\n'),
      })),
      script: [
        ...defaultLayout.script,
        { type: 'text/javascript', innerHTML: `___INITIAL_STATE__ = ${JSON.stringify(store.getState())}` },
        { type: 'text/javascript', innerHTML: `___LAYOUT__ = ${JSON.stringify(layoutWithLinks)}` },
      ],
    }

    // ----------------------------------
    // Internal server error
    // ----------------------------------
    if (err) {
      content = (
        <div>
          <Helmet {...{ ...layout, title: '500 - Internal server error' }} />
          <h3>Error 500</h3>
          <div>An error occurred: {err}</div>
        </div>
      )
      head = Helmet.rewind()
      ctx.status = 500
      ctx.body = renderHtmlLayout(head, content)
      return
    }

    // ----------------------------------
    // No route matched
    // This should never happen if the router has a '*' route defined
    // ----------------------------------
    if (typeof err === 'undefined' && typeof redirect === 'undefined' && typeof props === 'undefined') {
      debug('No route found.')

      // We could call our next middleware maybe
      // await next()
      // return

      // Or display a 404 page
      content = (
        <div>
          <Helmet {...{ ...layout, title: '404 - Page not found' }} />
          <h3>Error 404</h3>
          <div>404 - Page not found</div>
        </div>
      )
      head = Helmet.rewind()
      ctx.status = 404
      ctx.body = renderHtmlLayout(head, content)
      return
    }

    // ----------------------------------
    // Everything went fine so far
    // ----------------------------------
    const scripts = Assetic
      .getScripts(([vendor, app]))
      .map((asset, i) => <script key={i} type='text/javascript' src={`${asset}`} />)
    content = renderToString(
      <AppContainer
        history={history}
        routerKey={Math.random()}
        routes={routes}
        store={store}
        layout={layout}
      />
    )
    head = Helmet.rewind()
    const body = <div key='body' {...config.app_mount_point} dangerouslySetInnerHTML={{ __html: content }} />
    ctx.status = 200
    ctx.body = renderHtmlLayout(head, [body, scripts])
  })
}

