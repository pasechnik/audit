import { normalize } from 'normalizr'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

import * as api from '../../../modules/api'
import * as schema from './schema'
import * as itemsReducers from './reducers'

// ------------------------------------
// Constants
// ------------------------------------

// ------------------------------------
// Actions
// ------------------------------------
export const fetchItems = (filter) => (dispatch, getState) => {
  // console.log(getState(), filter);

  // if (itemsReducers.getIsFetching(getState(), filter)) {
  //   return Promise.resolve()
  // }
  dispatch(showLoading())
  dispatch({
    type: 'FETCH_ITEMS2_REQUEST',
    filter,
  })

  return api.fetchItems(filter).then(
    payload => {
      dispatch(hideLoading())
      dispatch({
        type: 'FETCH_ITEMS2_SUCCESS',
        filter,
        payload,
      })
    },
    error => {
      dispatch(hideLoading())
      dispatch({
        type: 'FETCH_ITEMS2_FAILURE',
        filter,
        message: error.message || 'Something went wrong.',
      })
    }
  )
}

export const saveItem = (item) => (dispatch, state) => {
  dispatch(showLoading())
  return api.saveItem(item).then(payload => {
    dispatch(hideLoading())
    dispatch({
      type: 'SAVE_ACTIVE_ITEM2_SUCCESS',
      payload,
    })
    return payload
    // return fetchItems(state.filter)
  })
}

export const deleteItem = (id) => (dispatch) => {
  dispatch(showLoading())
  return api.deleteItem(id).then(response => {
    dispatch(hideLoading())
    dispatch({
      type: 'DELETE_ITEM2_SUCCESS',
      response,
    })
  })
}

export const newActiveItem = (itm = {}) => (dispatch) => {
  dispatch({ type: 'NEW_ACTIVE_ITEM2', active: '0', item: itm })
  return new Promise(resolver => resolver)
}

export const setActive = (id) => (dispatch, getState) => {
  dispatch({ type: 'SET_ACTIVE_ITEM2', active: id })
  return new Promise(resolver => resolver)
}

export const clearActive = () => (dispatch, getState) => {
  dispatch({ type: 'CLEAR_ACTIVE_ITEM2' })
  // this.setState({ active: item.id })
  return new Promise(resolver => resolver)
}

export const actions = {
  fetchItems,
  setActive,
  clearActive,
  saveItem,
  deleteItem,
  newActiveItem,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  FETCH_ITEMS2_SUCCESS: (state, action) => {
    const result = Object.assign({}, state)
    if (action.payload) {
      result.items = action.payload.filter(t => t.id !== '0')
      // if (state.active === '0') result.active = null
      if (state.active === '0') result.items.push(state.items.find(t => t.id === '0'))
    }
    return result
  },
  SET_ACTIVE_ITEM2: (state, action) => Object.assign({}, state, {
    active: action.active,
  }),
  NEW_ACTIVE_ITEM2: (state, action) => Object.assign({}, state, {
    active: action.active,
    items: [...state.items, { id: action.active, type: '', name: '', otchet: '', summa: 0, otkl: 0, ...action.item }],
  }),
  CLEAR_ACTIVE_ITEM2: (state) => Object.assign({}, state, {
    active: null,
    items: state.items.filter(t => t.id !== '0'),
  }),
  SAVE_ACTIVE_ITEM2_SUCCESS: (state, action) => {
    let result = state
    if (action.payload) {
      result = Object.assign({}, state, {
        active: null,
        items: state.items.map(t => ((t.id === action.payload.id || t.id === '0') ? action.payload : t)),
      })
    }
    return result
  },
  DELETE_ITEM2_SUCCESS: (state, action) => {
    let result = state
    if (action.response) {
      result = {
        ...state,
        items: state.items.filter(t => t.id !== action.response),
      }
    }
    return result
  },
}

// ------------------------------------
// Reducer
// ------------------------------------
export const initialState = {
  active: null,
  items: [],
}
// export default itemsReducers.default

export default function itemReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
