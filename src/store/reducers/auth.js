import * as actions from "../actions/actionTypes"

const initialState = {
  isAnonymous: false,
}

const signinAnonymously = (state) => {
  return {
    ...state,
    isAnonymous: true,
  }
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.SIGN_IN_ANON:
      return signinAnonymously(state)

    default:
      return state
  }
}
