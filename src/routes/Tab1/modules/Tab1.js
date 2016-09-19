import { normalize } from 'normalizr'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

import * as api from '../../../modules/api'
import * as schema from './schema'
import * as itemsReducers from './reducers'

// import firebase from 'firebase'
// firebase.initializeApp({
//   serviceAccount: {
//     projectId: 'audit',
//     clientEmail: '',
//     privateKey: '-----BEGIN PRIVATE KEY-----\n\n-----END PRIVATE KEY-----\n'
//   },
//   databaseURL: 'https://audit.firebaseio.com/items',
// })
// const AuditItems = new Firebase('https://audit.firebaseio.com')
// export const fetchItems_fb = () => (dispatch) => {
//   AuditItems.on('value', snapshot => {
//     dispatch({
//       type: 'FETCH_ITEMS1_SUCCESS',
//       payload: snapshot.val(),
//     })
//   })
// }

// ------------------------------------
// Constants
// ------------------------------------

// ------------------------------------
// Actions
// ------------------------------------
export const fetchItems = (filter) => (dispatch, getState) => {
  // if (itemsReducers.getIsFetching(getState(), filter)) {
  //   return Promise.resolve()
  // }

  dispatch(showLoading())
  dispatch({
    type: 'FETCH_ITEMS1_REQUEST',
    filter,
  })

  return api.fetchItems(filter).then(
    payload => {
      dispatch(hideLoading())
      dispatch({
        type: 'FETCH_ITEMS1_SUCCESS',
        filter,
        payload,
      })
    },
    error => {
      dispatch(hideLoading())
      dispatch({
        type: 'FETCH_ITEMS1_FAILURE',
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
      type: 'SAVE_ACTIVE_ITEM1_SUCCESS',
      payload,
    })
    return payload
  })
}

export const deleteItem = (id) => (dispatch) => {
  dispatch(showLoading())
  return api.deleteItem(id).then(response => {
    dispatch(hideLoading())
    dispatch({
      type: 'DELETE_ITEM1_SUCCESS',
      response,
    })
  })
}

export const newActiveItem = (itm = {}) => (dispatch) => {
  dispatch({ type: 'NEW_ACTIVE_ITEM1', active: '0', item: itm })
  return new Promise(resolver => resolver)
}

export const setActive = (id) => (dispatch) => {
  dispatch({ type: 'SET_ACTIVE_ITEM1', active: id })
  return new Promise(resolver => resolver)
}

export const clearActive = () => (dispatch) => {
  dispatch({ type: 'CLEAR_ACTIVE_ITEM1' })
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
  FETCH_ITEMS1_SUCCESS: (state, action) => {
    const result = Object.assign({}, state)
    if (action.payload) {
      result.items = action.payload.filter(t => t.id !== '0')
      // if (state.active === '0') result.active = null
      if (state.active === '0') result.items.push(state.items.find(t => t.id === '0'))
    }
    return result
  },
  SET_ACTIVE_ITEM1: (state, action) => Object.assign({}, state, {
    active: action.active,
  }),
  NEW_ACTIVE_ITEM1: (state, action) => Object.assign({}, state, {
    active: action.active,
    items: [...state.items, { id: action.active, type: '', name: '', otchet: '', summa: 0, otkl: 0, ...action.item }],
  }),
  CLEAR_ACTIVE_ITEM1: (state) => Object.assign({}, state, {
    active: null,
    items: state.items.filter(t => t.id !== '0'),
  }),
  SAVE_ACTIVE_ITEM1_SUCCESS: (state, action) => {
    let result = state
    if (action.payload) {
      result = Object.assign({}, state, {
        active: null,
        items: state.items.map(t => ((t.id === action.payload.id || t.id === '0') ? action.payload : t)),
      })
    }
    return result
  },
  DELETE_ITEM1_SUCCESS: (state, action) => {
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
