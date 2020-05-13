import * as actions from "../actions/actionTypes"

// const initialState = {
//   isAnonymous: false,
// }

// const signinAnonymously = (state) => {
//   return {
//     ...state,
//     isAnonymous: true,
//   }
// }

// export default (state = initialState, { type, payload }) => {
//   switch (type) {
//     case actions.SIGN_IN_ANON:
//       return signinAnonymously(state)

//     default:
//       return state
//   }
// }

const initialState = {
  error: null,
  loading: false,
  verifyEmail: {
    error: null,
    loading: false,
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

    default:
      return state
  }
}
