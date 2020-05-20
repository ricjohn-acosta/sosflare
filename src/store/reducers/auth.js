import * as actions from "../actions/actionTypes"

const initialState = {
  error: null,
  loading: false,
  verifyEmail: {
    error: null,
    loading: false,
  },
  isPermanent: false,
  user: {
    username: null,
    email: null,
  },
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

const convertToPerm = state => {
  return { ...state, isPermanent: true }
}

const changeUsername = (state, payload) => {
  return { ...state, user: { ...state.user, username: payload } }
}
const changeEmail = (state, payload) => {
  return { ...state, user: { ...state.user, email: payload } }
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

    case actions.CHANGE_USERNAME:
      return changeUsername(state, payload)

    case actions.CHANGE_EMAIL:
      return changeEmail(state, payload)

    default:
      return state
  }
}
