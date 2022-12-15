const SHOW_MODAL = '@redux-modal-manager/SHOW'
const HIDE_MODAL = '@redux-modal-manager/HIDE'
const HIDE_ALL_MODAL = '@redux-modal-manager/HIDE_ALL'

export function show (name, props = {}) {
  return dispatch => {
    dispatch({
      type: SHOW_MODAL,
      name,
      props,
    })
  }
}

export function hide (name) {
  return dispatch => {
    dispatch({
      type: HIDE_MODAL,
      name,
    })
  }
}

export function hideAll () {
  return dispatch => {
    dispatch({
      type: HIDE_ALL_MODAL,
    })
  }
}

const ACTION_HANDLERS = {
  [SHOW_MODAL]: (state, action) => ({
    ...state,
    [action.name]: {
      show: true,
      props: action.props,
    },
  }),
  [HIDE_MODAL]: (state, action) => ({
    ...state,
    [action.name]: {
      show: false,
      props: {},
    },
  }),
  [HIDE_ALL_MODAL]: (state) => {
    const nextState = {}
    Object.keys(state).forEach(name => {
      nextState[name] = {
        show: false,
        props: {},
      }
    })
    return nextState
  },
}

const initialState = {}

export function reducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}