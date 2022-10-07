const SHOW_MODAL = 'modal/showModal'
const HIDE_MODAL = 'modal/hideModal'

export function show (name, props) {
  return dispatch => {
    dispatch({
      type: SHOW_MODAL,
      name,
      props
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

const ACTION_HANDLERS = {
  [SHOW_MODAL]: (state, action) => ({
    ...state,
    [action.name]: {
      show: true,
      props: action.props
    }
  }),
  [HIDE_MODAL]: (state, action) => ({
    ...state,
    [action.name]: {
      show: false,
    }
  })
}

const initialState = {}

export function reducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}