import * as actions from "../actions/actionTypes"

const initialState = {
  error: null,
  loading: false,
  verifyEmail: {
    error: null,
    loading: false,
  },
  isPermanent: false,
}

// HELPER FUNCTIONS
const authStart = state => {
  return {
    ...state,
    loading: true,
  }
}

const authEnd = state => {
  return { ...state, loading: false }
}

const authSuccess = state => {
  return { ...state, error: false }
}

const authFail = (state, payload) => {
  return { ...state, error: payload }
}

const convertToPerm = (state) => {
  return { ...state, isPermanent: true }
}

// INITIAL STATE CHANGE MECHANISM
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.AUTH_START:
      return authStart(state)

    case actions.AUTH_END:
      return authEnd(state)

    case actions.AUTH_SUCCESS:
      return authSuccess(state)

    case actions.AUTH_FAIL:
      return authFail(state, payload)

    case actions.CONVERT_TO_PERM:
      return convertToPerm(state)
      
    default:
      return state
  }
}
