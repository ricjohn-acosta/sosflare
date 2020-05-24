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
    changedUsername: false,
    email: null,
    changedEmail: false,
    password: false,
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

const reauthenticated = (state, payload) => {
  return { ...state, user: { ...state.user, reauthenticated: payload } }
}

const resetReauth = state => {
  return {
    ...state,
    user: { ...state.user, reauthenticated: null, changedPassword: false },
  }
}

const convertToPerm = state => {
  return { ...state, isPermanent: true }
}

const changeUsername = (state, payload) => {
  return {
    ...state,
    user: { ...state.user, username: payload, changedUsername: true },
  }
}

const changeUsernameSuccess = state => {
  return { ...state, user: { ...state.user, changedUsername: false } }
}

const changeEmail = (state, payload) => {
  return {
    ...state,
    user: { ...state.user, email: payload, changedEmail: true },
  }
}

const changeEmailSuccess = state => {
  return { ...state, user: { ...state.user, changedEmail: false } }
}

const changePassword = (state, payload) => {
  return { ...state, user: { ...state.user, changedPassword: true, password: true } }
}

const changePasswordSuccess = (state) => {
  return { ...state, user: { ...state.user, password: false } }
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
      return reauthenticated(state, payload)

    case actions.RESET_REAUTHENTICATED:
      return resetReauth(state)

    case actions.CONVERT_TO_PERM:
      return convertToPerm(state)

    case actions.CHANGE_USERNAME:
      return changeUsername(state, payload)

    case actions.CHANGE_USERNAME_SUCCESS:
      return changeUsernameSuccess(state)

    case actions.CHANGE_EMAIL:
      return changeEmail(state, payload)

    case actions.CHANGE_EMAIL_SUCCESS:
      return changeEmailSuccess(state)

    case actions.CHANGE_PASSWORD:
      return changePassword(state, payload)

    case actions.CHANGE_PASSWORD_SUCCESS:
      return changePasswordSuccess(state)

    case actions.HANDLE_EMAIL_MODAL:
      return handleEmailModal(state, payload)

    default:
      return state
  }
}
