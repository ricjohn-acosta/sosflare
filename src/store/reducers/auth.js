import * as actions from "../actions/actionTypes"

const initialState = {
  error: null,
  loading: false,
  verifyEmail: {
    error: null,
    loading: false,
  },
  isPermanent: false,
  emailModal: false,
  user: {
    username: null,
    email: null,
    changedPassword: false,
    reauthenticated: null,
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

const reauthenticated = state => {
  return { ...state, user: { ...state.user, reauthenticated: true } }
}

const resetReauth = state => {
  return { ...state, user: { ...state.user, reauthenticated: null, changedPassword: false } }
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

const changePassword = (state, payload) => {
  return { ...state, user: { ...state.user, changedPassword: true } }
}

const handleEmailModal = (state, payload) => {
  return { ...state, emailModal: payload }
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

    case actions.AUTH_REAUTHENTICATED:
      return reauthenticated(state)

    case actions.RESET_REAUTHENTICATED:
      return resetReauth(state)

    case actions.CONVERT_TO_PERM:
      return convertToPerm(state)

    case actions.CHANGE_USERNAME:
      return changeUsername(state, payload)

    case actions.CHANGE_EMAIL:
      return changeEmail(state, payload)

    case actions.CHANGE_PASSWORD:
      return changePassword(state, payload)

    case actions.HANDLE_EMAIL_MODAL:
      return handleEmailModal(state, payload)

    default:
      return state
  }
}
