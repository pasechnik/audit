// ------------------------------------
// Constants
// ------------------------------------
export const HELP_ABOUT = 'HELP_ABOUT'

// ------------------------------------
// Actions
// ------------------------------------
export function about(value = 1) {
  return {
    type: HELP_ABOUT,
    payload: value
  }
}

/*  This is a thunk, meaning it is a function that immediately
 returns a function for lazy evaluation. It is incredibly useful for
 creating async actions, especially when combined with redux-thunk!

 NOTE: This is solely for demonstration purposes. In a real application,
 you'd probably want to dispatch an action of COUNTER_DOUBLE and let the
 reducer take care of this logic.  */

export const aboutAsync = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch(about(getState().counter))
        resolve()
      }, 200)
    })
  }
}

export const actions = {
  about,
  aboutAsync
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [HELP_ABOUT]: (state, action) => state + action.payload
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}
export default function helpReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
